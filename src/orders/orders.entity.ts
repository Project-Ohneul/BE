import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Payment} from "../payments/payments.entity";

@Entity({name: "Orders"})
export class Order {
  @PrimaryGeneratedColumn()
  order_id: string;

  @Column()
  coin: number;

  @Column()
  amount: number;

  @OneToMany(() => Payment, (payment) => payment.order_id)
  payments: Payment[];
}
