import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import encryptHelper from 'src/users/lib/helper/helper';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('user found', user);

    const isPasswordCorrect = await encryptHelper.comparePassword(
      pass,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async getProfile(id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
