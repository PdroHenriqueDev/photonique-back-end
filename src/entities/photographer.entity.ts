import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photographers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'timestamp',
  })
  created_on: Date;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  cpf: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  zipcode: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  address: string;
}
