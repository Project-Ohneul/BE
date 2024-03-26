import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany} from "typeorm";
import {Hobbies} from "src/hobbies/hobby.entity";
import {Payment} from "../payment/payment.entity";
import {Order} from "src/order/order.entity";

@Entity({schema: "ohneul", name: "Users"})
export class User {
  @PrimaryGeneratedColumn({type: "int", name: "user_id"})
  user_id: number;

  @Column("varchar", {name: "username", length: 10})
  username: string;

  @Column("varchar", {name: "provider_id", length: 45})
  provider_id: string;

  // @Column()
  // phone: string;

  @Column("date", {name: "birth"})
  birth: string;

  @Column("varchar", {name: "gender", length: 1})
  gender: string;

  @Column("int", {name: "score"})
  score: number | 0;

  @Column("int", {name: "coin"})
  coin: number | 0;

  @Column({name: "mood_id"})
  mood_id: number | null;

  // @Column()
  // theme_id: number;

  @ManyToMany(() => Hobbies)
  @JoinTable({
    name: "User_hobby",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "user_id",
    },
    inverseJoinColumn: {
      name: "hobby_id",
      referencedColumnName: "hobby_id",
    },
  })
  hobbies: Hobbies;

  @OneToMany(() => Payment, (payment) => payment.user_id)
  payments: Payment[];

  @OneToMany(() => Order, (order) => order.user_id)
  orders: Order[];
}
