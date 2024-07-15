import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Plot } from './plots.entity';

@Entity({ name: 'sides' })
export class Side {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  x: number;

  @Column('float')
  y: number;

  @ManyToOne(() => Plot, (plot) => plot.sides, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  lot: Plot;

  @CreateDateColumn()
  creationDate!: Date;

  @UpdateDateColumn()
  lastUpdateDate!: Date;

  @Column({ nullable: true })
  removedDate: Date;
}
