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

  @Column({ type: "text", select: false })
    password!: string;

  @Column({ type: "text" })
    profile_picture!: string;

  @Column({ length: 250 })
    bio!: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
    created_at!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
    updated_at!: Date;

  @OneToMany(() => Thread, (thread) => thread.user)
    threads!: Thread[];

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
