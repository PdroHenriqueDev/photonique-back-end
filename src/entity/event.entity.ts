import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './category.entity';
import { Photographers } from './photographer.entity';

@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  local: string;

  @ManyToOne(() => Categories)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category_id: string;

  @Column({ nullable: false })
  state: number;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  date: Date;

  created_on: Date;

  @ManyToOne(() => Photographers)
  @JoinColumn({ name: 'photographer_id', referencedColumnName: 'id' })
  photographer_id: number;
}
