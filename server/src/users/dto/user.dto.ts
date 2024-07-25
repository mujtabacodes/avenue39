import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
