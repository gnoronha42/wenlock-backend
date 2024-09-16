import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/createUser/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dtos/login-dto';
import { MailService } from './mail.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,

  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string, id: number,fullName:string }> {
    const user = await this.userService.findByEmailOrRegistration(loginDto.email); 
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, id: user.id,fullName:user.fullName }; 
}


async sendRecoveryEmail(email: string): Promise<void> {
  const user = await this.userService.findByEmail(email);
  if (!user) {
    throw new UnauthorizedException('User not found');
  }

  const recoveryToken = this.jwtService.sign({ email: user.email }, { expiresIn: '1h' });
  const recoveryLink = `http://yourapp.com/recover-password?token=${recoveryToken}`;

  await this.mailService.sendMail({
    to: user.email,
    subject: 'Password Recovery',
    text: `Click here to recover your password: ${recoveryLink}`,
  });
}
}

