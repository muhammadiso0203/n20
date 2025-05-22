import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.models';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private model: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.model.create({ ...createUserDto });
    return user;
  }

  async findAll() {
    const users = await this.model.findAll();
    return users;
  }

  async findOne(id: number) {
    const user = await this.model.findByPk(id);
    if (!user) {
      return {
        statusCode: 404,
        message: 'Not found',
      };
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.model.update(updateUserDto, {where: {id}, returning: true})
    return updateUser[1][0];
  }

  async remove(id: number) {
    await this.model.destroy({where: {id}});
    return {
      data: {}
    }
  }
}
