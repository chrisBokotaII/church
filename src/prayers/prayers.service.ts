import { HttpException, Injectable } from '@nestjs/common';
import { CreatePrayerDto } from './dto/create-prayer.dto';
import { UpdatePrayerDto } from './dto/update-prayer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prayer } from './entities/prayer.entity';

export interface PrayerResponse {
  message: string;
  status: number;
  data: Prayer | Prayer[];
}
@Injectable()
export class PrayersService {
  constructor(
    @InjectRepository(Prayer) private prayerRepository: Repository<Prayer>,
  ) {}
  async create(createPrayerDto: CreatePrayerDto): Promise<PrayerResponse> {
    const prayer = this.prayerRepository.create(createPrayerDto);
    await this.prayerRepository.save(prayer);
    return {
      message: 'Prayer created successfully',
      status: 201,
      data: prayer,
    };
  }

  async findAll(): Promise<PrayerResponse> {
    const prayers = await this.prayerRepository.find();
    if (!prayers) throw new HttpException('Prayers not found', 404);
    return {
      message: 'Prayers found successfully',
      status: 200,
      data: prayers,
    };
  }

  async findOne(id: string): Promise<PrayerResponse> {
    const prayer = await this.prayerRepository.findOne({ where: { id } });
    if (!prayer) throw new HttpException('Prayer not found', 404);
    return {
      message: 'Prayer found successfully',
      status: 200,
      data: prayer,
    };
  }

  async update(
    id: string,
    updatePrayerDto: UpdatePrayerDto,
  ): Promise<PrayerResponse> {
    const prayer = this.prayerRepository.findOne({ where: { id } });
    if (!prayer) throw new HttpException('Prayer not found', 404);
    const prayerUpdated = this.prayerRepository.update(id, updatePrayerDto);
    return {
      message: 'Prayer updated successfully',
      status: 200,
      data: prayerUpdated as unknown as Prayer,
    };
  }

  async remove(id: string): Promise<PrayerResponse> {
    const prayer = await this.prayerRepository.findOne({ where: { id } });
    if (!prayer) throw new HttpException('Prayer not found', 404);
    await this.prayerRepository.remove(prayer);
    return {
      message: 'Prayer deleted successfully',
      status: 200,
      data: prayer,
    };
  }
}
