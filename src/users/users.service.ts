import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 0, name: 'zizoo' },
    { id: 1, name: 'zizoo' },
    { id: 2, name: 'zizoo' },
    { id: 3, name: 'ali' }
  ];

  findAll(name?: string): User[] {
    if (name) return this.users.filter((user) => user.name == name);

    return this.users;
  }

  findById(userId: number): User {
    return this.users.find((user) => user.id === userId);
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser: User = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }
}
