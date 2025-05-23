import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../users/models/user.model';
import { Order } from '../orders/models/order.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private model: typeof User) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.model.create({ ...createUserDto });
    return newUser;
  }

  async findAll() {
    return this.model.findAll({ include: { model: Order } });
  }

  async findOne(id: number) {
    const user = await this.model.findByPk(id, { include: { model: Order } });
    if (!user) return { message: 'User not found' };
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const [count, updatedObject] = await this.model.update(updateUserDto, {
      where: { id },
      returning: true,
    });

    if (count === 0) return { message: 'User not found' };
    return updatedObject[0];
  }

  async remove(id: number) {
    const deletedUser = await this.model.destroy({ where: { id } });
    if (deletedUser == 0) return { message: 'User not found' };
    return {
      message: 'success',
    };
  }
}
