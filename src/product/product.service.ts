import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(createProductInput: CreateProductInput) {
    try {
      const Product = {
        id: Math.floor(Math.random() * 1000),
        ...createProductInput,
      };
      this.products.push(Product);
      return Product;
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  findAll() {
    try {
      return this.products;
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  findOne(id: number) {
    try {
      const product = this.products.find((product) => product.id === id);
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    try {
      const product = this.products.find((product) => product.id == id);
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found `);
      }
      Object.assign(product, updateProductInput);

      const updatedProduct = this.products.find((product) => product.id == id);
      return updatedProduct;
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  remove(id: number) {
    try {
      const product = this.products.findIndex((product) => product.id == id);

      if (product === -1) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      const deleted = this.products[product];
      this.products.splice(product, 1);
      return deleted;
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }
}