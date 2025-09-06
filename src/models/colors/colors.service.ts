import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorsService {
  create(createColorDto: CreateColorDto) {
    return createColorDto;
  }

  findAll() {
    return `This action returns all colors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} color`;
  }

  update(id: number, updateColorDto: UpdateColorDto) {
    return updateColorDto;
  }

  remove(id: number) {
    return `This action removes a #${id} color`;
  }
}
