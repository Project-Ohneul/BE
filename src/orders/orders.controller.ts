import {Body, Controller, Delete, Get, NotFoundException, Param, Post} from "@nestjs/common";
import {OrderService} from "./orders.service";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() body: {order_id: number; amount: number; coin: number}) {
    try {
      const {amount, coin} = body;
      const order = await this.orderService.createOrder(amount, coin);
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
        throw new NotFoundException(`해당 주문 정보를 찾을 수 없습니다.`);
      }
      return order;
    } catch (error) {
      throw new NotFoundException(`주문 정보 불러오기에 실패하였습니다.`);
    }
  }

  @Get()
  async getAllOrder() {
    return await this.orderService.getAllOrder();
  }

  @Delete("/:order_id")
  async deleteOrder(@Param("order_id") order_id: number): Promise<{status: number; message: string}> {
    await this.orderService.deleteOrder(order_id);
    return {status: 200, message: "해당 주문 정보를 삭제하였습니다."};
  }
}
