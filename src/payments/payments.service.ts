import {Injectable} from "@nestjs/common";
import fetch from "node-fetch";

@Injectable()
export class PaymentService {
  private readonly secretKey = process.env.TOSS_SECRET_KEY;

  async confirmPayment(paymentInfo: {paymentKey: string; orderId: string; amount: number}) {
    const {paymentKey, orderId, amount} = paymentInfo;

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

    return data;
  }
}
