import { Module } from '@nestjs/common';
import { ProductsService } from './product.service';
import { ProductsResolver } from './product.resolver';

@Module({
  providers: [ProductsResolver, ProductsService],
})
export class ProductModule {}
