import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: "ohneul", name: "Reports" })
export class Reports {
  @PrimaryGeneratedColumn({ name: "report_id" })
  report_id: number;

  @Column({ name: "user_id" })
  user_id: string;

  @Column({ name: "reason" })
  reason: string;
}
