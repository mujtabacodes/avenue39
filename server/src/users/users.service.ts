import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginDto, UpdateUserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { customHttpException } from 'src/utils/helper';
import { comparePassword } from 'src/utils/func';
import jwt from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }

  async login(loginData: LoginDto) {
    const { email, password } = loginData;
    console.log('Input Details' + loginData);
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = jwt.sign({ email: email }, process.env.secKey, {
      expiresIn: '24h',
    });
    // Omit password from the user object
    const { password: _, ...userWithoutPassword } = user;

    return {
      message: 'Login successful',
      user: userWithoutPassword,
      token,
    };
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.prisma.user.update({
        where: { id: id },
        data: updateUserDto,
      });
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id: id },
    });
  }
}
