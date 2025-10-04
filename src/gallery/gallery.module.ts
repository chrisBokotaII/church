import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryItem } from './entities/gallery.entity';
import { Album } from './entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GalleryItem, Album])],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
