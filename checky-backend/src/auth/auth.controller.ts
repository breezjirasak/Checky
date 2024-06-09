import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  create(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  login(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(signInDto);
  }
}
