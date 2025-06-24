import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: {
          name: createProductDto.name,
        },
      });
      return product;
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  async findAll() {
    try {
      return await this.prisma.category.findMany({
        include: {
          category: true,
        },
      });
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: { category: true },
      });
      return product;
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const existing = await this.prisma.product.findUnique({ where: { id } });

      if (!existing) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      return await this.prisma.category.update({
        where: { id },
        data: {
          name: updateProductDto.name,
        },
      });
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  async remove(id: number) {
    try {
      const existing = await this.prisma.product.findUnique({ where: { id } });

      if (!existing) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      return await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }
}
