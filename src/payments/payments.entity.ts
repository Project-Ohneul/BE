import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "../users/entities/user.entity";
import { Order } from "src/orders/orders.entity";

@Entity({ name: "Payments" })
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: string;

  @Column()
  amount: number;

  @Column()
  coin_reward: number;

  @ManyToOne(() => Users, (user) => user.payments)
  @JoinColumn({ name: "user_id" })
  user_id: Users;

  @ManyToOne(() => Order, (order) => order.payments)
  @JoinColumn({ name: "order_id" })
  order_id: Order;
}
