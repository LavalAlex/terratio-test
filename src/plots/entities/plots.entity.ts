import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Side } from './side.entity';

@Entity({ name: 'plots' })
export class Plot {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('float')
  total: number;

  @Column({ nullable: true })
  reference: string;

  @OneToMany(() => Side, (side) => side.plot, { cascade: true })
  sides: Side[];

  @ManyToOne(() => User, (user) => user.plots, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  creationDate!: Date;

  @UpdateDateColumn()
  lastUpdateDate!: Date;

  @Column({ nullable: true })
  removedDate: Date;
}
