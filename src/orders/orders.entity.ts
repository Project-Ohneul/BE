import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";

@Entity({name: "Orders"})
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  coin: number;

  @Column()
  amount: number;
}
