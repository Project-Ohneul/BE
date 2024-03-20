import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import {Payment} from "src/payment/payment.entity";
import {User} from "src/user/user.entity";

@Entity({name: "Orders"})
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  amount: number;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
