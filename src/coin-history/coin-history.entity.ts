import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: "ohneul", name: "coin_history" })
export class CoinHistory {
  @PrimaryGeneratedColumn({ name: "coin_history_id" })
  coin_history_id: number;

  @Column("char", { name: "user_id" })
  user_id: string;

  @Column("int", { name: "used_coin" })
  used_coin: string;

  @Column("timestamp", { name: "used_at" })
  used_at: Date;
}
