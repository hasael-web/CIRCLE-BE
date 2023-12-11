import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity("replies")
export class Reply {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ length: 500 })
  content!: string;

  @Column({ type: "text", nullable: true })
  image!: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at!: Date;

  @ManyToOne(() => User, (user) => user.replies, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" }) // untuk membuat foreignkey
  user!: User;

  @ManyToOne(() => Thread, (thread) => thread.replies, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "thread_id" }) // untuk membuat foreignkey
  thread!: Thread;
}
