import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CategoryEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: "varchar"})
    name: string;

    @Column({type: "varchar"})
    description: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}