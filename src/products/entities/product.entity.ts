import { Item } from 'dynamoose/dist/Item';

export class Product extends Item {
  product_id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
