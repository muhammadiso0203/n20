import { Column, Table, Model, DataType } from "sequelize-typescript";

@Table({tableName: 'product'})
export class Product extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false,
    })
    price: number;
}