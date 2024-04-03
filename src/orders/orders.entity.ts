import {Entity, PrimaryColumn, Column, OneToMany} from "typeorm";
import {Payment} from "../payments/payments.entity";

@Entity({name: "Orders"})
export class Order {
  @PrimaryColumn()
  order_id: string;

  @Column()
  coin: number;

  @Column()
  amount: number;
}
