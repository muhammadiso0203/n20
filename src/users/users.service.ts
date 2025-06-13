import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { errorCatch } from '../utils/error-catch';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.model.create(createUserDto);
      return {
        statusCode: 201,
        message: 'success',
        data: newUser,
      };
    } catch (e) {
      return errorCatch(e);
    }
  }

  async findAll() {
    try {
      const users = await this.model.find().populate('posts');
      return {
        statusCode: 200,
        message: 'success',
        data: users,
      };
    } catch (e) {
      return errorCatch(e);
    }
  }

  async findOne(id: string) {
    const user = await this.model.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found `);
    }

    return {
      statusCode: 200,
      message: 'success',
      data: user,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.model.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found `);
    }

    const updatedUser = await this.model.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    });

    return {
      statusCode: 200,
      message: 'success',
      updatedUser,
    };
  }

  async remove(id: string) {
    const user = await this.model.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found `);
    }

    await this.model.findByIdAndDelete(id);
    return {
      statusCode: 200,
      message: 'success',
      data: {},
    };
  }
}
