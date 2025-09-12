import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import encryptHelper from './lib/helper/helper';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const checkEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (checkEmail) throw new HttpException('Email already exists', 409);
    const hashPassword = encryptHelper.hashPassword(createUserDto.password);
    const user = this.userRepository.create(createUserDto);
    user.password = await hashPassword;

    await this.userRepository.save(user);
    const { password, ...result } = user;
    return {
      message: 'user created successfully',
      status: 201,
      data: result,
    };
  }

  async findAll(): Promise<ResponseUserDto> {
    const users = await this.userRepository.find();

    users.forEach((user) => {
      delete user.password;
    });

    return {
      message: 'users fetched successfully',
      status: 200,
      data: users,
    };
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new HttpException('User not found', 404);
    const { password, ...result } = user;
    return {
      message: 'user fetched successfully',
      status: 200,
      data: result,
    };
  }
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    const userExist = await this.userRepository.findOne({ where: { id } });
    if (!userExist) throw new HttpException('User not found', 404);
    const user = await this.userRepository.update(id, updateUserDto);
    return `user updated successfully`;
  }

  async remove(id: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new HttpException('User not found', 404);
    await this.userRepository.remove(user);
    return `user deleted successfully`;
  }
}
