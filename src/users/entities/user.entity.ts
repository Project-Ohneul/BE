import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
