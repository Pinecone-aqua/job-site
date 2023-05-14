import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request as Req,
  Response as Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('all')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('user_id')
  getStaticId(): Promise<User[]> {
    console.log('generating static paths for user');
    return this.userService.generateStaticIdforUser();
  }

  @Post('add')
  createUser(@Body() body: User): Promise<User> {
    console.log('request body', body);
    return this.userService.createUser(body);
  }

  @Post('login')
  async logIn(@Req() Req: Request, @Res() Res: Response) {
    console.log('user', Req.body);
    const { email, password } = Req.body;
    const user = await this.userService.logIn(email, password);
    const payload = {
      name: user.firstName,
      email: user.email,
      // _id: user._id,
      image: user.image,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    Res.json({ token: token });
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }
}
