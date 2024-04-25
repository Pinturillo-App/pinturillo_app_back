import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, Column } from 'typeorm';


@Entity({ name: 'word_category' })
export class WordCategory extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_word', type: 'varchar', length: 50, nullable: false })
  idWord: string;

  @Column({ name: 'id_category', type: 'varchar', length: 50, nullable: false })
  idCategory: string;

  // @ManyToOne(() => Word, { nullable: false })
  // @JoinColumn({ name: 'word_id' , referencedColumnName: 'id'})
  // word_id: Word[];

  // @ManyToOne(() => Category, { nullable: false })
  // @JoinColumn({ name: 'category_id', referencedColumnName: 'id'})
  // category_id: Category[];
}