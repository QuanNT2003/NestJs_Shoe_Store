import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { Version, VersionDocument } from './schemas/version.schema';
import {
  NumberId,
  NumberIdDocument,
} from '../number-id/schemas/number-id.schema';
@Injectable()
export class VersionsService {
  constructor(
    @InjectModel(Version.name) private versionModel: Model<VersionDocument>,
    @InjectModel(NumberId.name) private numberIdModel: Model<NumberIdDocument>,
  ) {}
  async create(createVersionDto: CreateVersionDto): Promise<Version> {
    try {
      // lấy số ID hiện tại của Version
      const numberVersion = await this.numberIdModel.findOne({
        name: 'version',
      });
      if (!numberVersion) {
        throw new BadRequestException('NumberId for Version not found');
      }

      // tạo VersionId dạng br00000001
      let VersionId = 've';
      while (
        VersionId.length + (numberVersion.numberId + 1).toString().length <
        10
      ) {
        VersionId += '0';
      }
      VersionId += (numberVersion.numberId + 1).toString();

      // update counter
      await this.numberIdModel.findOneAndUpdate(
        { name: 'version' },
        { numberId: numberVersion.numberId + 1 },
      );

      // tạo document
      const createdVersion = new this.versionModel({
        ...createVersionDto,
        versionId: VersionId,
        inStock: 0,
      });
      return await createdVersion.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Version[]> {
    // return this.versionModel.find({

    // }).limit(2).skip(5).sort().exec();
    // return this.versionModel.find().populate('size').populate('color').exec();
    return this.versionModel.find().populate('size').populate('color').exec();
  }

  async findOne(id: string): Promise<Version> {
    const Version = await this.versionModel
      .findById(id)
      .populate('size')
      .populate('color')
      .exec();
    if (!Version) throw new NotFoundException('Version not found');
    return Version;
  }

  async update(
    id: string,
    updateVersionDto: UpdateVersionDto,
  ): Promise<Version> {
    const updated = await this.versionModel.findByIdAndUpdate(
      id,
      { $set: updateVersionDto },
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<Version> {
    const deleted = await this.versionModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('User not found');
    return deleted;
  }
}
