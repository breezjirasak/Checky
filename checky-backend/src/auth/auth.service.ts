import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import {SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { username, password, confirmPassword } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const isPasswordMatched = await this.isPasswordMatched(
      confirmPassword,
      hashedPassword,
    );

    const existingUser = await this.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Username already exist.');
    }

    if (isPasswordMatched) {

      const user = await this.userModel.create({
        username: username,
        password: hashedPassword,
      });

      const token = this.jwtService.sign({ id: user._id });

      return { token };
    } else {
      throw new BadRequestException('Passwords do not match.');
    }
  }
  
  async signIn(signInDto: SignInDto): Promise<{token: string}> {
    const {username, password} = signInDto;

    const user = await this.findByUsername(username);
    
    if (!user) {
      throw new UnauthorizedException("Invalid username")
    }

    const isPasswordMatched = await this.isPasswordMatched(
      password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException("Invalid password")
    }

    const token = this.jwtService.sign({ id: user._id});

    return { token };
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async isPasswordMatched(
    password1: string,
    password2: string,
  ): Promise<boolean> {
    return bcrypt.compare(password1, password2);
  }
}
