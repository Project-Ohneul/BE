import {Injectable} from "@nestjs/common";
import {Order} from "./order.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async createOrder(amount: number): Promise<Order> {
    const order = new Order();
    order.amount = amount;
    return this.orderRepository.save(order);
  }

  async getOneOrder(order_id: number): Promise<Order> {
    return this.orderRepository.findOne({where: {order_id}});
  }
}
