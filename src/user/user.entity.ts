import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
  hobby_id: number;

  @Column()
  mood_id: number;

  @Column()
  theme_id: number;
}
