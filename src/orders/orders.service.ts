import {Injectable} from "@nestjs/common";
import {Order} from "./orders.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async createOrder(amount: number, coin: number): Promise<Order> {
    const order = new Order();
    order.amount = amount;
    order.coin = coin;
    return this.orderRepository.save(order);
  }

  async getOneOrder(order_id: number): Promise<Order> {
    return this.orderRepository.findOne({where: {order_id}});
  }

  async getAllOrder(): Promise<Order[]> {
    return this.orderRepository.find({});
  }

  async deleteOrder(order_id) {
    await this.orderRepository.delete({order_id});
  }
}
