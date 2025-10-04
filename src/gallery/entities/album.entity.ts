import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GalleryItem } from './gallery.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @OneToMany(() => GalleryItem, (galleryItem) => galleryItem.album)
  galleryItems: GalleryItem[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
