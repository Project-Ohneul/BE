import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "User_hobby"})
export class UserHobby {
  @PrimaryGeneratedColumn()
  user_hobby_id: number;

  @Column()
  user_id: number;

  @Column()
  hobby_id: number;

  @Column()
  username: string;
}
