import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "ohneul", name: "Visit_history" })
export class VisitHistory {
  @PrimaryGeneratedColumn({ name: "visit_history_id" })
  visit_history_id: number;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  updated_at: Date | null;

  @Column({ type: "int", name: "count" })
  count: number;

  @Column({ type: "char", name: "user_id" })
  user_id: string;
}
