import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from 'src/user/dtos/create-user-dto';
import { UpdateUserDto } from 'src/user/dtos/update-user-dto';
import { ChangePasswordDto } from 'src/auth/dtos/change-password-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { fullName, email, registrationNumber, password } = createUserDto;

    const emailExists = await this.userRepository.findOne({ where: { email } });
    if (emailExists) {
        throw new ConflictException('Email already exists');
    }

    
    const registrationExists = await this.userRepository.findOne({ where: { registrationNumber } });
    if (registrationExists) {
        throw new ConflictException('Registration number already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
        fullName,
        email,
        registrationNumber,
        password: hashedPassword, 
    });

    return this.userRepository.save(user);
}

async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  const user = await this.userRepository.findOne({ where: { id } });

  if (!user) {
      throw new NotFoundException('User not found');
  }

  const { fullName, email, registrationNumber, password } = updateUserDto;

  if (email && email !== user.email) {
      const emailExists = await this.userRepository.findOne({ where: { email } });
      if (emailExists) {
          throw new ConflictException('Email already exists');
      }
  }
  
  if (registrationNumber && registrationNumber !== user.registrationNumber) {
      const registrationExists = await this.userRepository.findOne({ where: { registrationNumber } });
      if (registrationExists) {
          throw new ConflictException('Registration number already exists');
      }
  }

  if (password) {
      user.password = await bcrypt.hash(password, 10);
  }

  user.fullName = fullName ?? user.fullName;
  user.email = email ?? user.email;
  user.registrationNumber = registrationNumber ?? user.registrationNumber;

  return this.userRepository.save(user);
}
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ users: User[], total: number }> {
    const [users, total] = await this.userRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return { users, total };
  }

  async findByEmailOrRegistration(emailOrRegistration: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [
        { email: emailOrRegistration },
        { registrationNumber: emailOrRegistration },
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  

  private async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
  
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<void> {
    const user = await this.findById(userId); 
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const isMatch = await this.comparePasswords(changePasswordDto.oldPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Old password is incorrect');
    }
  
    user.password = await this.hashPassword(changePasswordDto.newPassword);
    await this.userRepository.save(user);
  }

}
