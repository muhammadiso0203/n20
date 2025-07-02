import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @GrpcMethod('CategoryService', 'Create')
  create(@Payload() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @GrpcMethod('CategoryService', 'FindAll')
  findAll() {
    return this.categoriesService.findAll();
  }

  @GrpcMethod('CategoryService', 'FindOne')
  findOne(@Payload() data: { id: number }) {
    return this.categoriesService.findOne(data);
  }

  @GrpcMethod('CategoryService', 'Update')
  update(@Payload() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(
      updateCategoryDto.id,
      updateCategoryDto,
    );
  }

  @GrpcMethod('CategoryService', 'Remove')
  remove(@Payload() data: { id: number }) {
    return this.categoriesService.remove(data);
  }
}
