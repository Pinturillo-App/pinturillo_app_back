import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, OneToMany } from 'typeorm';


@Entity({ name: 'category'})
export class Category extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;
  
  // @ManyToMany(() => Word, word => word.categories, { eager: true })
  // words?: Word[];

  // @OneToMany(() => Room, room => room.category)
  // rooms?: Room[];
}