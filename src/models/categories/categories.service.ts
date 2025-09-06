import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return createCategoryDto;
  }

  async findAll(): Promise<Category[]> {
    // return this.brandModel.find({

    // }).limit(2).skip(5).sort().exec();
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return updateCategoryDto;
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
