import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size, SizeDocument } from './schemas/size.schema';

@Injectable()
export class SizesService {
  constructor(@InjectModel(Size.name) private sizeModel: Model<SizeDocument>) {}
  create(createSizeDto: CreateSizeDto) {
    const newSize = new this.sizeModel(createSizeDto);
    return newSize.save();
  }

  async findAll(): Promise<Size[]> {
    return this.sizeModel.find().exec();
  }

  async findOne(id: string): Promise<Size> {
    const size = await this.sizeModel.findById(id).exec();
    if (!size) throw new NotFoundException('size not found');
    return size;
  }

  update(id: string, updateSizeDto: UpdateSizeDto) {
    return this.sizeModel
      .findByIdAndUpdate(id, updateSizeDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Size> {
    const deleted = await this.sizeModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Size not found');
    return deleted;
  }
}
