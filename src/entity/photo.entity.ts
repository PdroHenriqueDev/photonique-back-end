import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { People } from './people.entity';

@Entity()
export class Photos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'timestamp',
  })
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  event_name: string;

  @Column({ nullable: false })
  local: string;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false })
  state: number;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  date: Date;

  created_on: Date;

  @ManyToOne(() => People)
  @JoinColumn({ name: 'photographer_id', referencedColumnName: 'id' })
  photographer_id: string;
}
