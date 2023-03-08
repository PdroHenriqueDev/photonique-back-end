import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photographers } from 'src/entities';
import { Gender } from 'src/enums/gender.enum';
import { StandardResponse } from 'src/models/StandartResponse.model';
import { CreatePhotographerDto } from 'src/photographers/photographers.dtos';
import { Repository } from 'typeorm';

@Injectable()
export class PhotographersService {
  constructor(
    @InjectRepository(Photographers)
    private readonly photographerRepository: Repository<Photographers>,
  ) {}

  async createPhotographer(
    createPhotographerDto: CreatePhotographerDto,
  ): Promise<StandardResponse<null>> {
    const { email, cpf, gender_id } = createPhotographerDto;

    const isEmailRegistered = await this.photographerRepository.findOne({
      where: { email },
    });

    const isCpfRegistered = await this.photographerRepository.findOne({
      where: { cpf },
    });

    if (isEmailRegistered || isCpfRegistered) {
      return {
        statusCode: 400,
        message: isEmailRegistered
          ? 'E-mail já cadastrado'
          : 'Cpf já cadastrado',
      };
    }

    const genders = [Gender.Male, Gender.Female];

    if (!genders.includes(Number(gender_id))) {
      return {
        statusCode: 400,
        message: 'Genêro não cadastrado',
      };
    }

    const currentDate = new Date();

    const data = {
      ...createPhotographerDto,
      created_on: currentDate,
    };

    await this.photographerRepository.save(data);

    return {
      statusCode: 201,
      message: 'Fotógrafo cadastrado',
    };
  }

  findPhotographers() {
    return this.photographerRepository.find();
  }

  findPhotographerById(id: number) {
    return this.photographerRepository.findOne({ where: { id } });
  }
}
