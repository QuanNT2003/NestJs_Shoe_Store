import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import {
  NumberId,
  NumberIdDocument,
} from '../number-id/schemas/number-id.schema';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(NumberId.name) private numberIdModel: Model<NumberIdDocument>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      // lấy số ID hiện tại của brand
      const numberBrand = await this.numberIdModel.findOne({ name: 'product' });
      if (!numberBrand) {
        throw new BadRequestException('NumberId for product not found');
      }

      // tạo brandId dạng br00000001
      let productId = 'pr';
      while (
        productId.length + (numberBrand.numberId + 1).toString().length <
        10
      ) {
        productId += '0';
      }
      productId += (numberBrand.numberId + 1).toString();

      // update counter
      await this.numberIdModel.findOneAndUpdate(
        { name: 'product' },
        { numberId: numberBrand.numberId + 1 },
      );

      // tạo document
      const createdBrand = new this.productModel({
        ...createProductDto,
        productId,
      });
      return await createdBrand.save();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Product[]> {
    // return this.brandModel.find({

    // }).limit(2).skip(5).sort().exec();
    return this.productModel
      .find()
      .populate('brand')
      .populate('category')
      .exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate('brand')
      .populate('category')
      .exec();
    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updated = await this.productModel.findByIdAndUpdate(
      id,
      { $set: updateProductDto },
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<Product> {
    const deleted = await this.productModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('User not found');
    return deleted;
  }
}
