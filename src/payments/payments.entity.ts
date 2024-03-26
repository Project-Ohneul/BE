// import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
// import {User} from "../user/user.entity";
// import {Order} from "src/order/order.entity";
// @Entity({name: "Payments"})
// export class Payment {
//   @PrimaryGeneratedColumn()
//   paymentKey: string;

//   @Column()
//   amount: number;

//   @Column()
//   coin_reward: number;

//   @ManyToOne(() => User, (user) => user.payments)
//   user: User;

//   @ManyToOne(() => Order, (order) => order.payments)
//   order: Order;
// }

import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {User} from "../users/user.entity";
import {Order} from "src/orders/orders.entity";

@Entity({name: "Payments"})
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: string;

  @Column()
  amount: number;

  @Column()
  coin_reward: number;

  @ManyToOne(() => User, (user) => user.payments)
  @JoinColumn({name: "user_id"})
  user_id: User;

  @ManyToOne(() => Order, (order) => order.payments)
  @JoinColumn({name: "order_id"})
  order_id: Order;
}
