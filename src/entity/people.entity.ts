import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Roles } from './roles.entity';

@Entity()
export class People {
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
  @Exclude()
  password: string;

  @Column({ nullable: false })
  cpf: string;

  @Column({ nullable: false })
  gender_id: number;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  zip_code: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  neighborhood: string;

  @Column({ nullable: false })
  address_number: string;

  @Column()
  address_complement: string;

  @OneToMany(() => Roles, (role) => role.id)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role_id: number;

  constructor(partial: Partial<People>) {
    Object.assign(this, partial);
  }
}
