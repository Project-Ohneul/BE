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
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity({ schema: "ohneul", name: "Users" })
export class Users {
  @PrimaryGeneratedColumn("uuid", { name: "user_id" })
  user_id: string;

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

  @Column("int", { name: "score_amount" })
  score_amount: number | 0;

  @Column("int", { name: "coin" })
  coin: number | 0;

  @Column({ name: "mood_id" })
  mood_id: number | null;

  @OneToMany(() => Payment, (payment) => payment.user_id)
  payments: Payment[];

  @Column({ name: "report", default: 0 })
  report: number;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deleted_at: Date | null;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updated_at: Date;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  created_at: Date;
}
