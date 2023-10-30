import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("uploads")
export class Upload {
  @PrimaryGeneratedColumn()
    id!: string;

  @Column({ length: 500 })
    cloudinary_id!: string;
}
