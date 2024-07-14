import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
}
