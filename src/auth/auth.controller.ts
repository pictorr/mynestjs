import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/validation.pipe';
import { AuthService } from './auth.service';
import { RegisterUserDto, registerUserSchema } from './dto/register.dto';
import { Roles } from 'src/roles.decorator';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService ) {}

  @Post()
  @Roles('admin')
  @UsePipes(new JoiValidationPipe(registerUserSchema))
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

}
