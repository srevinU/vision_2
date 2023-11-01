import { Module } from '@nestjs/common';
import { DatabaseService } from '@app/common/database';

@Module({
  providers: [DatabaseService],
})
export class DataBaseModule {}
