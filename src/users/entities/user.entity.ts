import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  fullName: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ enum: ['admin', 'superadmin'], default: 'admin' })
  role: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
