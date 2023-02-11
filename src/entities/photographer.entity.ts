import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photographers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    nullable: true,
    type: 'timestamp',
  })
  created_on: Date;
}
