import { Module } from '@nestjs/common';
import { PhotographersController } from './controller/photographers/photographers.controller';
import { PhotographersService } from './service/photographers/photographers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events, People } from 'src/entity';
import { FileValidationPipe } from 'src/pipe/fileValidation.pipe';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PhotographersController],
  providers: [PhotographersService, FileValidationPipe],
  imports: [TypeOrmModule.forFeature([People, Events]), AuthModule],
  exports: [PhotographersService],
})
export class PhotographersModule {}
