import { Module } from '@nestjs/common';
import { PhotographersModule } from './photographers/photographers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database/connection';
import { AuthModule } from './auth/auth.module';
import { CepController } from './cep/cep.controller';

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
  ],
  controllers: [CepController],
  providers: [],
})
export class AppModule {}
