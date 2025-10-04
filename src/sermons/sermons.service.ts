import { Injectable } from '@nestjs/common';
import { CreateSermonDto } from './dto/create-sermon.dto';
import { UpdateSermonDto } from './dto/update-sermon.dto';

@Injectable()
export class SermonsService {
  create(createSermonDto: CreateSermonDto) {
    return 'This action adds a new sermon';
  }

  findAll() {
    return `This action returns all sermons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sermon`;
  }

  update(id: number, updateSermonDto: UpdateSermonDto) {
    return `This action updates a #${id} sermon`;
  }

  remove(id: number) {
    return `This action removes a #${id} sermon`;
  }
}
