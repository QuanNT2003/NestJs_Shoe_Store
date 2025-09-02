import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NumberIdService } from './number-id.service';
import { CreateNumberIdDto } from './dto/create-number-id.dto';
import { UpdateNumberIdDto } from './dto/update-number-id.dto';

@Controller('number-id')
export class NumberIdController {
  constructor(private readonly numberIdService: NumberIdService) {}

  @Post()
  create(@Body() createNumberIdDto: CreateNumberIdDto) {
    return this.numberIdService.create(createNumberIdDto);
  }

  @Get()
  findAll() {
    return this.numberIdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.numberIdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNumberIdDto: UpdateNumberIdDto) {
    return this.numberIdService.update(+id, updateNumberIdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.numberIdService.remove(+id);
  }
}
