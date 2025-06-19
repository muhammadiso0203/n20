import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepo.create(createCategoryDto);
      await this.categoryRepo.save(category);
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const category = await this.categoryRepo.find();
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.categoryRepo.findOne({where: {id}});

    if (!existingCategory) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    Object.assign(existingCategory, updateCategoryDto);

    try {
      return await this.categoryRepo.save(existingCategory);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const category = await this.categoryRepo.findOne({where: {id}});
      if(!category){
        throw new NotFoundException(error)
      }
      await this.categoryRepo.delete({id})
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
