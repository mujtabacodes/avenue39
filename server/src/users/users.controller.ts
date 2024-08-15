import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  SignupDto,
  LoginDto,
  UpdateUserDto,
  ForgetPasswordDto,
} from './dto/user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('/signup')
  create(@Body() signupUserDto: SignupDto) {
    return this.usersService.signup(signupUserDto);
  }

  @Post('/login')
  login(
    @Body() loginData: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(loginData, res);
  }

  @Post('forget-password')
  forget(@Body() PasswordData: ForgetPasswordDto) {
    return this.usersService.forgetPassword(PasswordData);
  }
}
