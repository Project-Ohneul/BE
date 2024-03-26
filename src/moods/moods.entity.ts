import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "Moods"})
export class Moods {
  @PrimaryGeneratedColumn()
  mood_id: number;

  @Column()
  mood: string;
}
