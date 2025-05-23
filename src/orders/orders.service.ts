import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './models/order.model';
import { User } from '../users/models/user.model';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private model: typeof Order) {}
  async create(createOrderDto: CreateOrderDto) {
    const newOrder = await this.model.create({ ...createOrderDto });
    return newOrder;
  }

  async findAll() {
    return this.model.findAll({
      include: {
        model: User,
      },
      attributes: { exclude: ['userId'] },
    });
  }

  async findOne(id: number) {
    const order = await this.model.findByPk(id, {
      include: {
        model: User,
      },
      attributes: { exclude: ['userId'] },
    });
    if (!order) return { message: 'Order not found' };
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const [count, updatedObject] = await this.model.update(updateOrderDto, {
      where: { id },
      returning: true,
    });

    if (count === 0) return { message: 'Order not found' };
    return updatedObject[0];
  }

  async remove(id: number) {
    const deletedOrder = await this.model.destroy({ where: { id } });
    if (deletedOrder === 0) return { message: 'Order not found' };
    return {
      message: 'success',
    };
  }
}
