import {Injectable, NotFoundException} from "@nestjs/common";
import fetch from "node-fetch";
import {Payment} from "./payments.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "src/users/entities/user.entity";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>
  ) {}

  private readonly secretKey = process.env.TOSS_SECRET_KEY;

  async confirmPayment(paymentInfo: {paymentKey: string; orderId: string; amount: number; userId: string; coin: number}) {
    const {paymentKey, orderId, amount, userId, coin} = paymentInfo;

    const encryptedSecretKey = "Basic " + Buffer.from(this.secretKey + ":").toString("base64");

    const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      body: JSON.stringify({orderId, amount, paymentKey, userId, coin}),
      headers: {
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data, userId);

    // 결제가 성공적으로 이루어졌다면 결제 정보를 저장하고 사용자 엔터티의 결제 내역에 추가
    if (data.status === "DONE") {
      // 결제 정보 생성
      const payment = new Payment();
      payment.amount = amount;
      payment.coin = coin;
      payment.paymentKey = paymentKey;

      // 사용자 ID를 통해 사용자 엔터티를 찾음
      const user = await this.userRepository.findOne({where: {user_id: userId}});
      if (!user) {
        throw new NotFoundException("사용자를 찾을 수 없습니다.");
      }

      // 결제 정보에 사용자를 설정
      payment.user_id = user;

      // 결제 정보를 저장
      const savedPayment = await this.paymentRepository.save(payment);

      console.log(savedPayment);
      return savedPayment;
    } else {
      throw new NotFoundException("결제에 실패하였습니다.");
    }
  }

  async getAllHistory(): Promise<Payment[]> {
    return await this.paymentRepository.find({relations: ["user_id"]});
  }

  async getOneUserHistory(user_id: string): Promise<Payment[]> {
    const userHistroy = await this.paymentRepository.find({where: {user_id: {user_id: user_id}}});

    if (!userHistroy || userHistroy.length === 0) {
      throw new NotFoundException(`해당 사용자의 주문 내역을 찾을 수 없습니다.`);
    }

    return userHistroy;
  }
}
