import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.save(createUserDto);
    return newUser;
  }

  async findAll() {
    const users = await this.userRepo.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    await this.userRepo.update(id, updateUserDto);

    const updatedUser = await this.userRepo.findOneBy({ id });
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    await this.userRepo.delete(id);
    return {
      message: 'success',
    };
  }
}
