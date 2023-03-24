import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CepController } from './controller/cep.controller';
import { CepService } from './service/cep.service';

@Module({
  controllers: [CepController],
  providers: [CepService],
  imports: [HttpModule],
})
export class CepModule {}
