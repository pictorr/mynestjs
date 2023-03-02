// import { Controller, Post, Body, UsePipes } from '@nestjs/common';
// import { JoiValidationPipe } from 'src/validation.pipe';
// import { UsersService } from './users.service';
// import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
// import { Roles } from 'src/roles.decorator';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService ) {}

//   @Post()
//   @Roles('admin')
//   @UsePipes(new JoiValidationPipe(createUserSchema))
//   create(@Body() createUserDto: CreateUserDto) {
//     return this.usersService.create(createUserDto);
//   }

// }
