import {Injectable, NotFoundException} from "@nestjs/common";
import fetch from "node-fetch";
import {Payment} from "./payments.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "src/users/entities/user.entity";
import {Order} from "src/orders/orders.entity";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  private readonly secretKey = process.env.TOSS_SECRET_KEY;

  async confirmPayment(paymentInfo: {paymentKey: string; orderId: string; amount: number; user_id: string}) {
    const {paymentKey, orderId, amount, user_id} = paymentInfo;

    const encryptedSecretKey = "Basic " + Buffer.from(this.secretKey + ":").toString("base64");

    const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      body: JSON.stringify({orderId, amount, paymentKey}),
      headers: {
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    // 결제가 성공적으로 이루어졌다면 결제 정보를 저장하고 사용자 엔터티의 결제 내역에 추가
    if (data.success) {
      const payment = new Payment();
      payment.paymentKey = paymentKey;

      const order = await this.orderRepository.findOne({where: {order_id: orderId}});
      payment.order_id = order;

      payment.amount = amount;

      await this.paymentRepository.save(payment);

      // 사용자를 식별하여 해당 사용자의 결제 내역에 추가
      const user = await this.userRepository.findOne({where: {user_id}});
      if (user) {
        user.payments.push(payment);
        await this.userRepository.save(user);
      }
      console.log(payment);
      return payment;
    } else {
      throw new NotFoundException("결제에 실패하였습니다.");
    }
  }
}
