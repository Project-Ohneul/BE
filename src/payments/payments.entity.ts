import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "../users/entities/user.entity";

@Entity({ name: "Payments" })
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @Column()
  amount: number;

  @Column()
  coin: number;

  @Column()
  paymentKey: string;

  @ManyToOne(() => Users, (user) => user.user_id)
  @JoinColumn({ name: "user_id" })
  user_id: string;
}
