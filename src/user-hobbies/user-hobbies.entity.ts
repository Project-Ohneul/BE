import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "../users/entities/user.entity";
import { Hobbies } from "src/hobbies/hobbies.entity";

@Entity({ name: "User_hobby" })
export class UserHobby {
  @PrimaryGeneratedColumn()
  user_hobby_id: number;

  // @Column()
  // user_id: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user_id: string;

  @ManyToOne(() => Hobbies)
  @JoinColumn({ name: "hobby_id" })
  hobby_id: number;
}
