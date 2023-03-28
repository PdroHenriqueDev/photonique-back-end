import { Module } from '@nestjs/common';
import { PhotographersModule } from './photographers/photographers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database/connection';
import { AuthModule } from './auth/auth.module';
import { CepService } from './cep/service/cep.service';
import { CepController } from './cep/controller/cep.controller';
import { CepModule } from './cep/cep.module';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { IsCep } from './validator/cepIsValid';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        databaseConfig(configService),
      inject: [ConfigService],
    }),
    PhotographersModule,
    AuthModule,
    CepModule,
    HttpModule,
  ],
  controllers: [CepController],
  providers: [CepService, IsCep],
})
export class AppModule {}
