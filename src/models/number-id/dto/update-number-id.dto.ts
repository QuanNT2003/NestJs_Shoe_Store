import { PartialType } from '@nestjs/mapped-types';
import { CreateNumberIdDto } from './create-number-id.dto';

export class UpdateNumberIdDto extends PartialType(CreateNumberIdDto) {}
