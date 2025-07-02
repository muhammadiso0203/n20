import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepo.create(createCategoryDto);
    return this.categoryRepo.save(category);
  }

  async findAll() {
    try {
      const categories = await this.categoryRepo.find({
        relations: ['products'],
      });
      return { categories };
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  async findOne({ id }: { id: number }) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException('not found');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepo.update(id, updateCategoryDto);
    const category = await this.categoryRepo.findOne({
      where: { id },
    });
    return category;
  }

  async remove({ id }: { id: number }) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    await this.categoryRepo.delete(id);
    return category;
  }
}
