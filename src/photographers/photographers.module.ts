import { Module } from '@nestjs/common';
import { PhotographersController } from './controllers/photographers/photographers.controller';
import { PhotographersService } from './services/photographers/photographers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photographers } from 'src/entity';

@Module({
  controllers: [PhotographersController],
  providers: [PhotographersService],
  imports: [TypeOrmModule.forFeature([Photographers])],
})
export class PhotographersModule {}
