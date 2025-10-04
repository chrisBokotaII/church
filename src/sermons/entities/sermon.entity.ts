import { Pastor } from 'src/pastors/entities/pastor.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('sermons')
export class Sermon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'float' })
  duration: number; // Duration in seconds

  @Column({ type: 'varchar', length: 500 })
  audioUrl: string; // Cloudinary secure_url for audio

  @Column({ type: 'varchar', length: 500 })
  thumbnailUrl: string; // Cloudinary secure_url for thumbnail image

  @ManyToOne(() => Pastor, (pastor) => pastor.sermons)
  pastor: Pastor;

  @ManyToOne(() => User, (user) => user.sermons)
  uploader: User;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
