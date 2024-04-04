import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {Users} from "../users/entities/user.entity";
import {Order} from "src/orders/orders.entity";

@Entity({name: "Payments"})
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @Column()
  amount: number;

  @Column()
  coin: number;

  @Column()
  paymentKey: string;

  @ManyToOne(() => Users, (user) => user.payments)
  @JoinColumn({name: "phone"})
  phone: Users;

  // @ManyToOne(() => Order)
  // @JoinColumn({name: "order_id"})
  // order_id: Order;
}
