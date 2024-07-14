import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Plot } from './plots.entity';

@Entity({ name: 'sides' })
export class Side {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  x: number;

  @Column('float')
  y: number;

  @ManyToOne(() => Plot, (plot) => plot.sides)
  lot: Plot;
}
