import { GalleryItem } from 'src/gallery/entities/gallery.entity';
import { Sermon } from 'src/sermons/entities/sermon.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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
  @OneToMany(() => Sermon, (sermon) => sermon.uploader)
  sermons: Sermon[];
  @OneToMany(() => GalleryItem, (galleryItem) => galleryItem.uploader)
  galleryItems: GalleryItem[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
