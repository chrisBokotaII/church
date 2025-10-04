import { Module } from '@nestjs/common';
import { PastorsService } from './pastors.service';
import { PastorsController } from './pastors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pastor } from './entities/pastor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pastor])],
  controllers: [PastorsController],
  providers: [PastorsService],
})
export class PastorsModule {}
