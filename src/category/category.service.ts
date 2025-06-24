import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: {
          name: createCategoryDto.name,
        },
      });
      return category;
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  async findAll() {
    try {
      return await this.prisma.category.findMany({
        include: {
          products: true,
        },
      });
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
        include: { products: true },
      });

      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      return category;
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const existing = await this.prisma.category.findUnique({ where: { id } });

      if (!existing) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      return await this.prisma.category.update({
        where: { id },
        data: {
          name: updateCategoryDto.name,
        },
      });
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  async remove(id: number) {
    try {
      const existing = await this.prisma.category.findUnique({ where: { id } });

      if (!existing) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      return await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }
}
