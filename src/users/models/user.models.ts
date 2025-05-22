import { Column, Model, Table, DataType } from "sequelize-typescript";

@Table({tableName: 'User'})
export class User extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    firstName: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    lastName: string
}