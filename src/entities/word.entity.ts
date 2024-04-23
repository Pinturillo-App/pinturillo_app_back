import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';


@Entity({ name: 'Word' })
export class Word extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  text: string;
}
