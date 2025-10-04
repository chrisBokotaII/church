import { Module } from '@nestjs/common';
import { SermonsService } from './sermons.service';
import { SermonsController } from './sermons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sermon } from './entities/sermon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sermon])],
  controllers: [SermonsController],
  providers: [SermonsService],
})
export class SermonsModule {}
