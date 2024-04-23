import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Category } from './category.entity';


@Entity({ name: 'Room' })
export class Room extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ default: 'Sin iniciar' })
  state: string;

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: 'idCategory' })
  idCategory: Category;
}