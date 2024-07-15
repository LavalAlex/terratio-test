import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Side } from './side.entity';

@Entity({ name: 'plots' })
export class Plot {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column('float')
  total: number;

  @Column({ nullable: true })
  reference: string;

  @OneToMany(() => Side, (side) => side.lot, { cascade: true })
  sides: Side[];

  @CreateDateColumn()
  creationDate!: Date;

  @UpdateDateColumn()
  lastUpdateDate!: Date;

  @Column({ nullable: true })
  removedDate: Date;
}
