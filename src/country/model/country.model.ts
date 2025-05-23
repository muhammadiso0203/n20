import { Model, Column, Table, DataType, HasMany } from "sequelize-typescript";
import { User } from "src/user/models/user.model";

@Table({tableName: 'country'})

export class Country extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;


    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    capital: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    population: number

    @HasMany(() => User)
    users: User[];
}