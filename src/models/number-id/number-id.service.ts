import { Injectable } from '@nestjs/common';
import { CreateNumberIdDto } from './dto/create-number-id.dto';
import { UpdateNumberIdDto } from './dto/update-number-id.dto';

@Injectable()
export class NumberIdService {
  create(createNumberIdDto: CreateNumberIdDto) {
    return 'This action adds a new numberId';
  }

  findAll() {
    return `This action returns all numberId`;
  }

  findOne(id: number) {
    return `This action returns a #${id} numberId`;
  }

  update(id: number, updateNumberIdDto: UpdateNumberIdDto) {
    return `This action updates a #${id} numberId`;
  }

  remove(id: number) {
    return `This action removes a #${id} numberId`;
  }
}
