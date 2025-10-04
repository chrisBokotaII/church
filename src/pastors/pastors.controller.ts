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
import PastorResponse, { PastorsService } from './pastors.service';
import { CreatePastorDto } from './dto/create-pastor.dto';
import { UpdatePastorDto } from './dto/update-pastor.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/authorization/role.enum';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';

@Controller('pastors')
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class PastorsController {
  constructor(private readonly pastorsService: PastorsService) {}

  @Post()
  async create(@Body() createPastorDto: CreatePastorDto) {
    return this.pastorsService.create(createPastorDto);
  }

  @Get()
  findAll() {
    return this.pastorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pastorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePastorDto: UpdatePastorDto) {
    return this.pastorsService.update(id, updatePastorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pastorsService.remove(id);
  }
}
