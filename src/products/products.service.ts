import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product);
  }

  async findAll() {
    try {
      const products = await this.productRepo.find({
        relations: ['category'],
      });
      return { products };
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  async findOne({ id }: { id: number }) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException('not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepo.update(id, updateProductDto);
    const product = await this.productRepo.findOne({
      where: { id },
    });
    return product;
  }

  async remove({ id }: { id: number }) {
    const product = await this.productRepo.findOne({ where: { id } });
    await this.productRepo.delete(id);
    return product;
  }
}
