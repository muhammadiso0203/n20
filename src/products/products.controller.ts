import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @GrpcMethod('ProductService', 'Create')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @GrpcMethod('ProductService', 'FindAll')
  findAll() {
    return this.productsService.findAll();
  }

  @GrpcMethod('ProductService', 'FindOne')
  findOne(@Payload() data: { id: number }) {
    return this.productsService.findOne(data);
  }

  @GrpcMethod('ProductService', 'Update')
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @GrpcMethod('ProductService', 'Remove')
  remove(@Payload() data: { id: number }) {
    return this.productsService.remove(data);
  }
}
