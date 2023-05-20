import { Module } from '@nestjs/common';
import { StaticDataController } from './controller/static-data.controller';
import { StaticDataService } from './service/static-data.service';
import { Categories } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [StaticDataController],
  providers: [StaticDataService],
  imports: [TypeOrmModule.forFeature([Categories])],
})
export class StaticDataModule {}
