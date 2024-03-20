import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "../user/user.entity";
@Entity({name: "Payments"})
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @Column()
  amount: number;

  @Column()
  coin_reward: number;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
