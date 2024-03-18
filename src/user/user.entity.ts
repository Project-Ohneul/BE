import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import {UserHobby} from "src/user-hobby/user-hobby.entity";
import {Hobbies} from "src/hobbies/hobby.entity";

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
  mood_id: number;

  @Column()
  theme_id: number;

  @ManyToMany(() => Hobbies)
  @JoinTable({
    name: "user_hobby",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "user_id",
    },
    inverseJoinColumn: {
      name: "hobby_id",
      referencedColumnName: "hobby_id",
    },
  })
  hobbies: Hobbies[];
}
