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
  x0: number;

  @Column('float')
  y0: number;

  @Column('float')
  x1: number;

  @Column('float')
  y1: number;

  @ManyToOne(() => Plot, (plot) => plot.sides, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  plot: Plot;

  @CreateDateColumn()
  creationDate!: Date;

  @UpdateDateColumn()
  lastUpdateDate!: Date;

  @Column({ nullable: true })
  removedDate: Date;
}
