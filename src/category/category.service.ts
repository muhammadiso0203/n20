import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];

  create(createCategoryInput: CreateCategoryInput) {
    try {
      const category = {
        id: Math.floor(Math.random() * 1000),
        ...createCategoryInput,
      };
      this.categories.push(category);
      return category;
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  findAll() {
    try {
      return this.categories;
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  findOne(id: number) {
    try {
      const category = this.categories.find((category) => category.id === id);
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    try {
      const category = this.categories.find((cat) => cat.id == id);
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found `);
      }
      Object.assign(category, updateCategoryInput);

      const updatedCategory = this.categories.find((cat) => cat.id == id);
      return updatedCategory;
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }

  remove(id: number) {
    try {
      const category = this.categories.findIndex((cat) => cat.id == id);

      if (category === -1) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      const deleted = this.categories[category];
      this.categories.splice(category, 1);
      return deleted;
    } catch (error) {
      throw new HttpException(error, error?.status);
    }
  }
}