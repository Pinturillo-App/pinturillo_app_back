import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Room extends BaseEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ default: 'Sin Iniciar' })
  state: string;

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: "idCategory" })
  idCategory: Category;

}