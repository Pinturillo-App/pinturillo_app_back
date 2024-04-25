import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, OneToMany } from 'typeorm';
import { Word } from './word.entity';


@Entity({ name: 'category'})
export class Category extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;
  
  @ManyToMany(() => Word, word => word.categories, { eager: true })
  words?: Word[];


}