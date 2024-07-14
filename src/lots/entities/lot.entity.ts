import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Side } from './side.entity';

@Entity({ name: 'lots' })
export class Lot {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @OneToMany(() => Side, (side) => side.lot, { cascade: true })
  sides: Side[];

  @Column('float')
  total: number;
}
