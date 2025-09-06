import {
  Injectable,
  // NotFoundException,
  // BadRequestException,
  // UnauthorizedException,
} from '@nestjs/common';
// import { AuthLoginDto } from './dto/auth-login.dto';
import { UsersService } from 'src/models/users/users.service';
import { comparePassword } from 'src/helper/util';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/models/users/schemas/user.schema';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (user && comparePassword(password, user.password)) {
      return user;
    }
    return null;
  }

  login(user: UserDocument) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  // async login(authLoginDto: AuthLoginDto) {
  //   const { email, password } = authLoginDto;
  //   const user = await this.usersService.findByEmail(email);

  //   if (user) {
  //     // console.log(user);

  //     const compare = await comparePassword(password, user.password);
  //     // console.log(compare);

  //     if (compare === true) {
  //       const payload = {
  //         id: user._id,
  //         username: user.name,
  //         userId: user.userId,
  //         email: user.email,
  //       };
  //       return {
  //         access_token: await this.jwtService.signAsync(payload),
  //       };
  //     } else {
  //       throw new UnauthorizedException(
  //         `User with email "${email}" has wrong password`,
  //       );
  //     }
  //   } else {
  //     throw new NotFoundException(`User with email "${email}" not found`);
  //   }
  // }
}
