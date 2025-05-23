import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';

import { Order } from '../../orders/models/order.model';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @HasMany(() => Order)
  order: Order;
}
