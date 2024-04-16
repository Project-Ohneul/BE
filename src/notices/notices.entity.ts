import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "ohneul", name: "Notices" })
export class Notices {
  @PrimaryGeneratedColumn({ type: "int", name: "notice_id" })
  notice_id: number;

  @Column({ type: "text", name: "notice" })
  notice: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updated_at: Date;
}
