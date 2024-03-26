import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Payment } from "../payments/payments.entity";
import { Users } from "../users/entities/user.entity";

@Entity({ name: "Orders" })
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  amount: number;

  @OneToMany(() => Payment, (payment) => payment.order_id)
  payments: Payment[];

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user_id: Users;
}
