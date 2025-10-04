import { Sermon } from 'src/sermons/entities/sermon.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('pastors')
export class Pastor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  role: string;

  @Column({ type: 'varchar', length: 500 })
  photoUrl: string; // Cloudinary secure_url for pastor photo

  @Column({ type: 'text' })
  bio: string;

  @OneToMany(() => Sermon, (sermon) => sermon.pastor)
  sermons: Sermon[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
