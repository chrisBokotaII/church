import { Module } from '@nestjs/common';
import { PrayersService } from './prayers.service';
import { PrayersController } from './prayers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prayer } from './entities/prayer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prayer])],
  controllers: [PrayersController],
  providers: [PrayersService],
})
export class PrayersModule {}
