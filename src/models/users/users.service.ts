import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import {
  NumberId,
  NumberIdDocument,
} from '../number-id/schemas/number-id.schema';
import { hashPasswordHelper } from 'src/helper/util';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(NumberId.name) private numberIdModel: Model<NumberIdDocument>,
  ) {}

  emailExist = async (email: string) => {
    const user = await this.userModel.exists({ email });
    if (user) return true;
    else return false;
  };
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { name, email, password, phone, address, images } = createUserDto;

      //check email
      const exists = await this.emailExist(email);
      if (exists) {
        throw new BadRequestException('Email already exists');
      }

      const hashPassword = await hashPasswordHelper(password);

      // lấy số ID hiện tại của brand
      const numberUser = await this.numberIdModel.findOne({ name: 'user' });
      if (!numberUser) {
        throw new BadRequestException('NumberId for user not found');
      }

      // tạo userId dạng us00000001
      let userId = 'us';
      while (userId.length + (numberUser.numberId + 1).toString().length < 10) {
        userId += '0';
      }
      userId += (numberUser.numberId + 1).toString();

      // update counter
      await this.numberIdModel.findOneAndUpdate(
        { name: 'user' },
        { numberId: numberUser.numberId + 1 },
      );

      // tạo document
      const createdUser = new this.userModel({
        name,
        email,
        phone,
        address,
        images,
        userId: userId,
        password: hashPassword,
      });
      return await createdUser.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(query: string, page: number) {
    const { filter, limit, sort } = aqp(query);

    const totalUser = (await this.userModel.find()).length;
    const totalPage = Math.ceil(totalUser / limit);

    const results = await this.userModel
      .find()
      .limit(limit)
      .skip((+page - 1) * +limit)
      .select('-password')
      .sort(sort as any)
      .exec();

    console.log(results);

    return { results, totalPage };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updated = await this.userModel.findByIdAndUpdate(
      id,
      { $set: updateUserDto },
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<User> {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('User not found');
    return deleted;
  }
}
