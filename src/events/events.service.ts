import { HttpException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

export interface EventResponse {
  message: string;
  status: number;
  data: Event | Event[];
}
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}
  async create(createEventDto: CreateEventDto): Promise<EventResponse> {
    const event = this.eventRepository.create(createEventDto);
    await this.eventRepository.save(event);

    return {
      message: 'event created successfully',
      status: 201,
      data: event,
    };
  }

  async findAll(): Promise<EventResponse> {
    const data = await this.eventRepository.find();
    if (!data) throw new HttpException('Events not found', 404);
    return {
      message: 'events found successfully',
      status: 200,
      data: data,
    };
  }

  async findOne(id: string): Promise<EventResponse> {
    const data = await this.eventRepository.findOne({ where: { id } });
    if (!data) throw new HttpException('Event not found', 404);
    return {
      message: 'event found successfully',
      status: 200,
      data: data,
    };
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<EventResponse> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) throw new HttpException('Event not found', 404);
    const eventUpdated = await this.eventRepository.update(id, updateEventDto);

    return {
      message: 'event updated successfully',
      status: 200,
      data: eventUpdated as unknown as Event,
    };
  }

  async remove(id: string): Promise<EventResponse> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) throw new HttpException('Event not found', 404);
    await this.eventRepository.remove(event);
    return {
      message: 'event deleted successfully',
      status: 200,
      data: event,
    };
  }
}
