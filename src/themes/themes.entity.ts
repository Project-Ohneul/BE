import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "Themes"})
export class Themes {
  @PrimaryGeneratedColumn()
  theme_id: number;

  @Column()
  theme: string;
}
