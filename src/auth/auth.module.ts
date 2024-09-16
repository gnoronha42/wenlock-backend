import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { UserService } from '../user/services/createUser/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtStrategy } from './config/jwt-strategy';
import { MailService } from './services/mail.service';
require('dotenv').config();


@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    JwtModule.register({
      secret: process.env.JWT_SECRET , 
      signOptions: { expiresIn: '30m' }, 
    }),
  ],
  providers: [AuthService, UserService,JwtStrategy,MailService],
  exports: [AuthService],
})


export class AuthModule {}