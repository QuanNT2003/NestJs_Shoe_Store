import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  // UseGuards,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
// import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/nation')
  findAllNation() {
    return this.brandsService.findAllNation();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}
