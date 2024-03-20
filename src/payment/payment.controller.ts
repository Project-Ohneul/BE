// payments.controller.ts
import {Controller, Get, Post, Query} from "@nestjs/common";
import {PaymentService} from "./payment.service";

@Controller("payments")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("confirm")
  async confirmPayment(@Query() query: any) {
    const confirmResponse = await this.paymentService.confirmPayment(query);
    return {data: confirmResponse};
  }
}
