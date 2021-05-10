import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(name?: string): Promise<User[]> {
    if (name) return this.usersRepository.find({ name });

    return this.usersRepository.find();
  }

  async findById(userId: number): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOneOrFail(userId);
      return user;
    } catch{
      throw new NotFoundException();
    }
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = this.usersRepository.create({
      name: createUserDto.name,
    });

    return this.usersRepository.save(newUser);
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser: User = await this.findById(updateUserDto.id);

    updatedUser.name = updateUserDto.name;

    return this.usersRepository.save(updatedUser);
  }

  async deleteUser(userId: number): Promise<User> {
    const deletedUser: User = await this.findById(userId);

    return this.usersRepository.remove(deletedUser);
  }
}
