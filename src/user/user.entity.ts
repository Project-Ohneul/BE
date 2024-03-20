import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany} from "typeorm";
import {Hobbies} from "src/hobbies/hobby.entity";
import {Payment} from "../payment/payment.entity";
import {Order} from "src/order/order.entity";

@Entity({name: "Users"})
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  phone: string;

  @Column()
  birth: Date;

  @Column()
  gender: string;

  @Column()
  score: number;

  @Column()
  coin: number;

  @Column()
  mood_id: number;

  @Column()
  theme_id: number;

  @ManyToMany(() => Hobbies)
  @JoinTable({
    name: "user_hobby",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "user_id",
    },
    inverseJoinColumn: {
      name: "hobby_id",
      referencedColumnName: "hobby_id",
    },
  })
  hobbies: Hobbies[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
