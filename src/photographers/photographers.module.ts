import { Module } from '@nestjs/common';
import { PhotographersController } from './controller/photographers/photographers.controller';
import { PhotographersService } from './service/photographers/photographers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photographers } from 'src/entity';

@Module({
  controllers: [PhotographersController],
  providers: [PhotographersService],
  imports: [TypeOrmModule.forFeature([Photographers])],
})
export class PhotographersModule {}
