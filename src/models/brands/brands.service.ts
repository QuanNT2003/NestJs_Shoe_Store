import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand, BrandDocument } from './schemas/brand.schema';
import {
  NumberId,
  NumberIdDocument,
} from '../number-id/schemas/number-id.schema';
@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
    @InjectModel(NumberId.name) private numberIdModel: Model<NumberIdDocument>,
  ) {}
  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      // lấy số ID hiện tại của brand
      const numberBrand = await this.numberIdModel.findOne({ name: 'brand' });
      if (!numberBrand) {
        throw new BadRequestException('NumberId for brand not found');
      }

      // tạo brandId dạng br00000001
      let brandId = 'br';
      while (
        brandId.length + (numberBrand.numberId + 1).toString().length <
        10
      ) {
        brandId += '0';
      }
      brandId += (numberBrand.numberId + 1).toString();

      // update counter
      await this.numberIdModel.findOneAndUpdate(
        { name: 'brand' },
        { numberId: numberBrand.numberId + 1 },
      );

      // tạo document
      const createdBrand = new this.brandModel({
        ...createBrandDto,
        brandId,
      });
      return await createdBrand.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Brand[]> {
    // return this.brandModel.find({

    // }).limit(2).skip(5).sort().exec();
    return this.brandModel.find().exec();
  }

  async findAllNation(): Promise<string[]> {
    // return this.brandModel.find({

    // }).limit(2).skip(5).sort().exec();
    return this.brandModel.find().distinct('nation').exec();
  }

  async findOne(id: string): Promise<Brand> {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) throw new NotFoundException('brand not found');
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const updated = await this.brandModel.findByIdAndUpdate(
      id,
      { $set: updateBrandDto },
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<Brand> {
    const deleted = await this.brandModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('User not found');
    return deleted;
  }
}
