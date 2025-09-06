import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthLoginDto } from './dto/auth-login.dto';
import { LocalAuthGuard } from './passport/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @Post('/login')
  // login(@Body() authLoginDto: AuthLoginDto) {
  //   return this.authService.login(authLoginDto);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
