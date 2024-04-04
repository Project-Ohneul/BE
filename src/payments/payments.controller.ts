// payments.controller.ts
import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {PaymentService} from "./payments.service";

@Controller("payments")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("/confirm")
  async confirmPayment(@Body() paymentInfo: {paymentKey: string; orderId: string; amount: number; userId: string}): Promise<{status: number; message: string}> {
    await this.paymentService.confirmPayment(paymentInfo);
    return {status: 200, message: "결제가 완료되었습니다."};
  }
}
