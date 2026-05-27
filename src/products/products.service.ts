import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'dynamoose/dist/Model';
import { Product } from './entities/product.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Model<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    const product_id = randomUUID();
    return await this.productModel.create({ product_id, ...createProductDto });
  }

  async findAll() {
    return await this.productModel.scan().exec();
  }

  async findOne(product_id: string) {
    const product = await this.productModel.get(product_id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${product_id} not found`);
    }
    return product;
  }

  async update(product_id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(product_id);
    
    // Limpiamos campos automáticos para que no rompa la validación de tipos
    const { product_id: _, createdAt, updatedAt, ...updateData } = updateProductDto as any;
    
    return await this.productModel.update({ product_id }, updateData);
  }


  async remove(product_id: string) {
    await this.findOne(product_id);
    return await this.productModel.delete(product_id);
  }
}
