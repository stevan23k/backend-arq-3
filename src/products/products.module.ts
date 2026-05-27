import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import * as dynamoose from 'dynamoose';
import { ProductSchema } from './schemas/product.schema';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: 'PRODUCT_MODEL',
      useFactory: () => {
        return dynamoose.model('productos', ProductSchema, {
          create: false, // No intenta crearla si ya existe
          waitForActive: false, // No espera a que esté activa (asumimos que ya lo está)
        });
      },
    },
  ],
})
export class ProductsModule {}
