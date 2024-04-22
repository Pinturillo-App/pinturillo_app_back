import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';


@Entity({ name: 'Category'})
export class Category extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;
}
