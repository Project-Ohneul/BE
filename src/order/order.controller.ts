import {Body, Controller, Get, NotFoundException, Param, Post} from "@nestjs/common";
import {OrderService} from "./order.service";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() body: {amount: number}) {
    try {
      const {amount} = body;
      const order = await this.orderService.createOrder(amount);
      return {order};
    } catch (error) {
      throw new NotFoundException(`주문 생성에 실패하였습니다.`);
    }
  }

  @Get("/:order_id")
  async getOneOrder(@Param("order_id") order_id: number) {
    try {
      const order = await this.orderService.getOneOrder(order_id);
      if (!order) {
        throw new NotFoundException(`해당 주문 내역을 찾을 수 없습니다.`);
      }
    } catch (error) {
      throw new NotFoundException(`주문 내역 불러오기에 실패하였습니다.`);
    }
  }
}
