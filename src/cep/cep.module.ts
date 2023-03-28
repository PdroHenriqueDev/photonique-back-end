import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IsCep } from 'src/validator/cepIsValid';
import { CepController } from './controller/cep.controller';
import { CepService } from './service/cep.service';

@Module({
  controllers: [CepController],
  providers: [CepService, IsCep],
  imports: [HttpModule],
})
export class CepModule {}
