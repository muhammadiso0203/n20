import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './models/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private model: typeof Users) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.model.create({ ...createUserDto });
    return newUser;
  }

  async findAll() {
    return await this.model.findAll();
  }

  async findOne(id: number) {
    const user = await this.model.findByPk(id);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.model.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return user[1][0];
  }

  async remove(id: number) {
    await this.model.destroy({ where: { id } });
    return { data: {} };
  }
}
