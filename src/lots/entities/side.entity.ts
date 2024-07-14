import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lot } from './lot.entity';

@Entity({ name: 'sides' })
export class Side {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  x: number;

  @Column('float')
  y: number;

  @ManyToOne(() => Lot, (lot) => lot.sides)
  lot: Lot;
}
