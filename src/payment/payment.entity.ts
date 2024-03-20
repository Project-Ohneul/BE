import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "../user/user.entity";
import {Order} from "src/order/order.entity";
@Entity({name: "Payments"})
export class Payment {
  @PrimaryGeneratedColumn()
  paymentKey: string;

  @Column()
  amount: number;

  @Column()
  coin_reward: number;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;
}
