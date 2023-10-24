import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Like } from "./Like";
import { Reply } from "./Reply";

@Entity("threads")
export class Thread {
  @PrimaryColumn({ type: "uuid" })
    id!: string;

  @Column({ length: 500 })
    content!: string;

  @Column({ type: "text" })
    image!: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
    created_at!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
    updated_at!: Date;

  @ManyToOne(() => User, (user) => user.threads, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" }) // untuk membuat foreignkey
    user!: User;

  @OneToMany(() => Like, (like) => like.thread)
    likes!: Like[];

  @OneToMany(() => Reply, (reply) => reply.thread)
    replies!: Reply[];
}
