import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {User} from "../users/user.entity";

@Entity({name: "User_hobby"})
export class UserHobby {
  @PrimaryGeneratedColumn()
  user_hobby_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User;

  @Column()
  hobby_id: number;
}
