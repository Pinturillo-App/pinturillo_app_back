import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';


@Entity({ name: 'room' })
export class Room extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ name: 'state', type: 'varchar', default: 'Sin iniciar' })
  state: string;
  
  // @Column({ name: 'id_category', nullable: false})
  // idCategory: string;

  // @ManyToOne(() => Category, ( category => category.rooms ))
  // category?: Category;
}