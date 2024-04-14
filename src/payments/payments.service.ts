import { Injectable, NotFoundException } from "@nestjs/common";
import fetch from "node-fetch";
import { Payment } from "./payments.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/entities/user.entity";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>
  ) {}

  private readonly secretKey = process.env.TOSS_SECRET_KEY;

  async confirmPayment(paymentInfo: {
    paymentKey: string;
    orderId: string;
    amount: number;
    userId: string;
    coin: number;
  }) {
    const { paymentKey, orderId, amount, userId, coin } = paymentInfo;

    const encryptedSecretKey =
      "Basic " + Buffer.from(this.secretKey + ":").toString("base64");

    const response = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        body: JSON.stringify({ orderId, amount, paymentKey, userId, coin }),
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data, userId);

    if (data.status === "DONE") {
      const payment = new Payment();
      payment.amount = amount;
      payment.coin = coin;
      payment.paymentKey = paymentKey;

      const user = await this.userRepository.findOne({
        where: { user_id: userId },
      });
      if (!user) {
        throw new NotFoundException("사용자를 찾을 수 없습니다.");
      }

      user.coin += coin;
      payment.user_id = user.user_id;

      const queryRunner =
        this.userRepository.manager.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const savedPayment = await this.paymentRepository.save(payment);
        await queryRunner.manager.save(Users, user);
        await queryRunner.commitTransaction();

        console.log(savedPayment);
        return savedPayment;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    } else {
      throw new NotFoundException("결제에 실패하였습니다.");
    }
  }

  async getAllHistory(): Promise<Payment[]> {
    return await this.paymentRepository.find({ relations: ["user_id"] });
  }

  async getOneUserHistory(user_id: string): Promise<Payment[]> {
    console.log(user_id);
    const userHistroy = await this.paymentRepository.find({
      where: { user_id },
    });

    if (!userHistroy || userHistroy.length === 0) {
      throw new NotFoundException(
        `해당 사용자의 주문 내역을 찾을 수 없습니다.`
      );
    }

    return userHistroy;
  }
}
