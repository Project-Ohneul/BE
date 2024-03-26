import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "Hobbies"})
export class Hobbies {
  @PrimaryGeneratedColumn()
  hobby_id: number;

  @Column()
  hobby: string;
}
