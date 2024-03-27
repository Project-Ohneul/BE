import { Hobbies } from "src/hobbies/hobbies.entity";
import { Order } from "src/orders/orders.entity";
import { Payment } from "src/payments/payments.entity";
import { UserHobby } from "src/user-hobbies/user-hobbies.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity({ schema: "ohneul", name: "Users" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id" })
  user_id: number;

  @Column("varchar", { name: "username", length: 10 })
  username: string;

  @Column("varchar", { name: "provider_id", length: 45 })
  provider_id: string;

  // @Column()
  // phone: string;

  @Column("date", { name: "birth" })
  birth: string;

  @Column("varchar", { name: "gender", length: 1 })
  gender: string;

  @Column("int", { name: "score" })
  score: number | 0;

  @Column("int", { name: "coin" })
  coin: number | 0;

  @Column({ name: "mood_id" })
  mood_id: number | null;

  // @OneToMany(() => UserHobby, (userHobby)=>userHobby.user_id)

  // @JoinTable({
  //   name: "User_hobby",
  //   joinColumn: {
  //     name: "user_id",
  //     referencedColumnName: "user_id",
  //   },
  //   inverseJoinColumn: {
  //     name: "hobby_id",
  //     referencedColumnName: "hobby_id",
  //   },
  // })
  // hobbies: Hobbies;

  @OneToMany(() => Payment, (payment) => payment.user_id)
  payments: Payment[];

  @OneToMany(() => Order, (order) => order.user_id)
  orders: Order[];
}
