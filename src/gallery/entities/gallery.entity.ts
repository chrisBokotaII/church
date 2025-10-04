import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Album } from './album.entity';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

@Entity('gallery_items')
export class GalleryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  url: string; // Cloudinary secure_url for image or video

  @Column({ type: 'date' })
  date: string; // Stored as date (e.g., '2025-09-15')

  @Column({ type: 'enum', enum: MediaType })
  type: MediaType; // 'image' or 'video'
  @ManyToOne(() => User, (user) => user.galleryItems)
  uploader: User;

  @ManyToOne(() => Album, (album) => album.galleryItems)
  album: Album;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
