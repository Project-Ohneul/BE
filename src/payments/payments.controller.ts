// payments.controller.ts
import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {PaymentService} from "./payments.service";

@Controller("payments")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("/confirm")
  async confirmPayment(@Body() paymentInfo: {paymentKey: string; orderId: string; amount: number; user_id: string}) {
    return this.paymentService.confirmPayment(paymentInfo);
  }
}
