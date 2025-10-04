import { HttpException, Injectable } from '@nestjs/common';
import { CreatePastorDto } from './dto/create-pastor.dto';
import { UpdatePastorDto } from './dto/update-pastor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pastor } from './entities/pastor.entity';

export default interface PastorResponse {
  message: string;
  status: number;
  data: Pastor | Pastor[];
}
@Injectable()
export class PastorsService {
  constructor(
    @InjectRepository(Pastor) private pastorRepository: Repository<Pastor>,
  ) {}
  async create(createPastorDto: CreatePastorDto): Promise<PastorResponse> {
    const pastor = this.pastorRepository.create(createPastorDto);
    await this.pastorRepository.save(pastor);

    return {
      message: 'pastor created successfully',
      status: 201,
      data: pastor,
    };
  }

  async findAll(): Promise<PastorResponse> {
    const data = await this.pastorRepository.find();
    if (!data) throw new HttpException('Pastors not found', 404);

    return {
      message: 'pastors found successfully',
      status: 200,
      data: data,
    };
  }

  async findOne(id: string): Promise<PastorResponse> {
    const data = await this.pastorRepository.findOne({ where: { id } });
    if (!data) throw new HttpException('Pastor not found', 404);
    return {
      message: 'pastor found successfully',
      status: 200,
      data: data,
    };
  }

  async update(
    id: string,
    updatePastorDto: UpdatePastorDto,
  ): Promise<PastorResponse> {
    const pastor = await this.pastorRepository.findOne({ where: { id } });
    if (!pastor) throw new HttpException('Pastor not found', 404);
    const pastorUpdated = await this.pastorRepository.update(
      id,
      updatePastorDto,
    );
    return {
      message: 'pastor updated successfully',
      status: 200,
      data: pastorUpdated as unknown as Pastor,
    };
  }

  async remove(id: string): Promise<PastorResponse> {
    const pastor = await this.pastorRepository.findOne({ where: { id } });
    if (!pastor) throw new HttpException('Pastor not found', 404);
    await this.pastorRepository.remove(pastor);
    return {
      message: 'pastor deleted successfully',
      status: 200,
      data: pastor,
    };
  }
}
