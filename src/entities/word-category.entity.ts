import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Word } from './word.entity';
import { Category } from './category.entity';


@Entity({ name: 'WordCategory' })
export class WordCategory extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Word, { nullable: false })
  @JoinColumn({ name: 'idWord' })
  idWord: Word;

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: 'idCategory' })
  idCategory: Category;
}
