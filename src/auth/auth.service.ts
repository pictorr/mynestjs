import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Role } from './entities/user.entity';
import { Repository, In } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId, roles: user.roles};
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    
      async register(registerDto: RegisterUserDto): Promise<User> {
        const { username, password, roles } = registerDto;
        
        // Check if the role exists
        const existingRoles = await this.roleRepository.findBy({ name: In(roles) });
        if (!existingRoles) {
          throw new BadRequestException('Role does not exist');
        }
        // Create the new user and set their role
        const user = new User();
        user.username = username;
        user.password = password;
        user.role = { name: roles[0], id : existingRoles[0].id };
    
        // Save the user and role to the database
        await this.userRepository.save(user);
    
        return user;
      }
}
