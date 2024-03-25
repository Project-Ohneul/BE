// import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
// import {Payment} from "src/payment/payment.entity";
// import {User} from "src/user/user.entity";

// @Entity({name: "Orders"})
// export class Order {
//   @PrimaryGeneratedColumn()
//   order_id: number;

//   @Column()
//   amount: number;

//   @OneToMany(() => Payment, (payment) => payment.order)
//   payments: Payment[];

//   @ManyToOne(() => User, (user) => user.orders)
//   user: User;
// }
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import {Payment} from "../payment/payment.entity";
import {User} from "../user/user.entity";

@Entity({name: "Orders"})
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  amount: number;

  @OneToMany(() => Payment, (payment) => payment.order_id)
  payments: Payment[];

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({name: "user_id"})
  user_id: User;
}
