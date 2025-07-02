import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @ManyToOne(() => Category, (category) => category.products)
  // @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;
}
