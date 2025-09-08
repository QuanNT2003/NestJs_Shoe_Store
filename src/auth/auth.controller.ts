import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthLoginDto } from './dto/auth-login.dto';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { UserDocument } from 'src/models/users/schemas/user.schema';
import { AuthRegisterDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @Post('/login')
  // login(@Body() authLoginDto: AuthLoginDto) {
  //   return this.authService.login(authLoginDto);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req: Request & { user: UserDocument }) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  register(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto);
  }
}
