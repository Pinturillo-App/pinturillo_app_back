import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Word extends BaseEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, nullable: false })
  text: string;
}
