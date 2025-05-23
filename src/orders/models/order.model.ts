import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from '../../users/models/user.model';

enum Status {
  pending = 'pending',
  shipped = 'shipped',
  delivered = 'delivered',
  cancelled = 'cancelled',
}

@Table({ tableName: 'orders' })
export class Order extends Model {
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  totalPrice: number;

  @Column({
    type: DataType.ENUM(...Object.values(Status)),
    allowNull: false,
  })
  status: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
