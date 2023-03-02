import { Injectable } from '@nestjs/common';
export type User = any;
@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
            roles: ['admin', 'user']
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
            roles: ['user']
        },
    ];
    
    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
    
    async create(user: User): Promise<User> {
        this.users.push({userId: this.users.length + 1, ...user});
        return user;
    }
}
