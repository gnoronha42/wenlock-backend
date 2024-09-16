

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, IsString, IsNotEmpty, Matches } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ description: 'Full name of the user', required: false })
    @IsOptional()
    @IsString()
    fullName?: string;
  
    @ApiProperty({ description: 'Email address of the user', required: false })
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @ApiProperty({ description: 'Registration number of the user', required: false })
    @IsOptional()
    @Matches(/^\d+$/, { message: 'Registration number must contain only numbers' })
    registrationNumber?: string;
  
    @ApiProperty({ description: 'Password of the user', required: false })
    @IsOptional()
    @IsString()
    @Matches(/^[a-zA-Z0-9]{6,}$/, { message: 'Password must be alphanumeric and at least 6 characters long' })
    password?: string;
  }