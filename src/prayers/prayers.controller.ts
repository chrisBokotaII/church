import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PrayersService } from './prayers.service';
import { CreatePrayerDto } from './dto/create-prayer.dto';
import { UpdatePrayerDto } from './dto/update-prayer.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/authorization/role.enum';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';

@Controller('prayers')
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class PrayersController {
  constructor(private readonly prayersService: PrayersService) {}

  @Post()
  create(@Body() createPrayerDto: CreatePrayerDto) {
    return this.prayersService.create(createPrayerDto);
  }

  @Get()
  findAll() {
    return this.prayersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prayersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrayerDto: UpdatePrayerDto) {
    return this.prayersService.update(id, updatePrayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prayersService.remove(id);
  }
}
