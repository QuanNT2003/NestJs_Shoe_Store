import { Module } from '@nestjs/common';
import { NumberIdService } from './number-id.service';
import { NumberIdController } from './number-id.controller';

@Module({
  controllers: [NumberIdController],
  providers: [NumberIdService],
})
export class NumberIdModule {}
