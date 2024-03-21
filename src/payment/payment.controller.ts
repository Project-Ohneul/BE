// payments.controller.ts
import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {PaymentService} from "./payment.service";

@Controller("payments")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("confirm")
  async confirmPayment(@Body() body: any) {
    const confirmResponse = await this.paymentService.confirmPayment(body);
    return {data: confirmResponse};
  }
}
