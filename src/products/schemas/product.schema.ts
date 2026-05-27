import * as dynamoose from 'dynamoose';

export const ProductSchema = new dynamoose.Schema(
  {
    product_id: {
      type: String,
      hashKey: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
