import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './models/product.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private model: typeof Product
  ){}

  async create(createProductDto: CreateProductDto){
    const newProduct = await this.model.create({...createProductDto});
    return newProduct;
  }

  async findAll(){
    const products = await this.model.findAll();
    return products;
  }

  async findById(id: number){
    const product = await this.model.findByPk(id);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto){
    const product = await this.model.update(updateProductDto, {where: {id}, returning: true});
    return product[1][0];
  }

  async remove(id: number){
    await this.model.destroy({where: {id}});
    return {data: {}};
  }
}
