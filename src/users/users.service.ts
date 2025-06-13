import { InjectModel } from '@nestjs/mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './Schema/user.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly model: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { name, email, post_id } = createUserDto;
      const user = new this.model({
        name,
        email,
        post_id: new Types.ObjectId(post_id),
      });
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    try {
      const users = this.model.find().populate('post_id');
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id: number) {
    try {
      const user = this.model.findById(id).populate('post_id');
      if (!user) {
        throw new InternalServerErrorException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = this.model.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
      if (!user) {
        throw new InternalServerErrorException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  remove(id: number) {
    try {
      const user = this.model.findByIdAndDelete(id);
      if (!user) {
        throw new InternalServerErrorException('User not found');
      }
      return { data: {} };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
