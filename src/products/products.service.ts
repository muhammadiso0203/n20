import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productRepo.create(createProductDto);
      await this.productRepo.save(product)
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const user = await this.productRepo.find();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepo.findOne({ where: { id } });
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepo.findOne({ where: { id } });

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      await this.productRepo.update({ id }, updateProductDto);

      return await this.productRepo.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string){
    try {
      const product = await this.productRepo.findOne({where: {id}})
      if(!product){
        throw new NotFoundException(error)
      }
      await this.productRepo.delete({id})
      return {message: "success"}
    } catch (error) {
      
    }
  }
}
