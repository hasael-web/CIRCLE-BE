import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("threads")
export class Thread {
  @PrimaryColumn({ type: "uuid" })
    id!: string;

  @Column({ type: "text" })
    content!: string;

  @Column({ type: "text" })
    image!: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
    created_at!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
    updated_at!: Date;
}
