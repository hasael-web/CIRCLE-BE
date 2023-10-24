import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity("likes")
export class Like {
  @PrimaryColumn({ type: "uuid" })
    id!: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
    created_at!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
    updated_at!: Date;

  @ManyToOne(() => User, (user) => user.likes, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" }) // untuk membuat foreignkey
    user!: User;

  @ManyToOne(() => Thread, (thread) => thread.likes, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "thread_id" }) // untuk membuat foreignkey
    thread!: Thread;
}
