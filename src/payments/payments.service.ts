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

  async confirmPayment(paymentInfo: {paymentKey: string; orderId: string; amount: number; userId: string}) {
    const {paymentKey, orderId, amount, userId} = paymentInfo;

    const encryptedSecretKey = "Basic " + Buffer.from(this.secretKey + ":").toString("base64");

    const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      body: JSON.stringify({orderId, amount, paymentKey, userId}),
      headers: {
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data, userId);

    // 결제가 성공적으로 이루어졌다면 결제 정보를 저장하고 사용자 엔터티의 결제 내역에 추가
    if (data.status === "DONE") {
      const payment = new Payment();
      payment.paymentKey = paymentKey;

      // 사용자 ID를 통해 사용자 엔터티를 찾음
      const user = await this.userRepository.findOne({where: {user_id: userId}});
      if (!user) {
        throw new NotFoundException("사용자를 찾을 수 없습니다.");
      }

      // 사용자의 결제 내역에 추가
      user.payments.push(payment);
      await this.userRepository.save(user);

      console.log(payment);
      return payment;
    } else {
      throw new NotFoundException("결제에 실패하였습니다.");
    }
  }
}
