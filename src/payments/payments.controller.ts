// payments.controller.ts
import {Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import {PaymentService} from "./payments.service";
import {Payment} from "./payments.entity";

@Controller("payments")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("/confirm")
  async confirmPayment(@Body() paymentInfo: {paymentKey: string; orderId: string; amount: number; userId: string; coin: number}) {
    return this.paymentService.confirmPayment(paymentInfo);
    // return {status: 200, message: "결제가 완료되었습니다."};
  }

  @Get()
  async getAllHistory() {
    return this.paymentService.getAllHistory();
  }

  @Get("/:user_id")
  async getOneUserHistory(@Param("user_id") user_id: string): Promise<Payment[]> {
    return this.paymentService.getOneUserHistory(user_id);
  }
}
