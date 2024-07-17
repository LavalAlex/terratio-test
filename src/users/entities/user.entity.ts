import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Plot } from 'src/plots/entities/plots.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Plot, (plot) => plot.user, { cascade: true })
  plots: Plot[];

  @CreateDateColumn()
  creationDate!: Date;

  @UpdateDateColumn()
  lastUpdateDate!: Date;

  @Column({ nullable: true })
  removedDate: Date;
}
