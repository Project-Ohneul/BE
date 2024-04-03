import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {Users} from "../users/entities/user.entity";
import {Order} from "src/orders/orders.entity"; // orders의 경로 수정

@Entity({name: "Payments"})
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @Column()
  amount: number;

  @Column()
  coin: number;

  @ManyToOne(() => Users, (user) => user.payments)
  @JoinColumn({name: "user_id"})
  user_id: Users;

  @ManyToOne(() => Order, (order) => order.payments)
  @JoinColumn({name: "order_id"})
  order_id: Order;
}
