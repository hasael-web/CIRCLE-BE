import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Thread } from "./Thread";
import { Like } from "./Like";
import { Reply } from "./Reply";

@Entity("users")
export class User {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ length: 50 })
  username!: string;

  @Column({ length: 100 })
  fullname!: string;

  @Column({ length: 50 })
  email!: string;

  @Column({ type: "text" })
  password!: string;

  @Column({ type: "text" })
  profile_picture!: string;

  @Column({ length: 250, nullable: true })
  bio!: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at!: Date;

  @OneToMany(() => Thread, (thread) => thread.user)
  threads!: Thread[];

  @OneToMany(() => Like, (like) => like.user)
  likes!: Like[];

  @OneToMany(() => Reply, (reply) => reply.user)
  replies!: Reply[];

  @ManyToMany(() => User, (user) => user.users)
  @JoinTable({
    name: "following",
    joinColumn: {
      name: "following_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "follower_id",
      referencedColumnName: "id",
    },
  })
  users!: User[];
}
