import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photographers } from 'src/entities';
import { CreatePhotographerDto } from 'src/photographers/photographers.dtos';
import { Repository } from 'typeorm';

@Injectable()
export class PhotographersService {
  constructor(
    @InjectRepository(Photographers)
    private readonly photographerRepository: Repository<Photographers>,
  ) {}

  async createPhotographer(createPhotographerDto: CreatePhotographerDto) {
    const { email, cpf } = createPhotographerDto;

    const isEmailRegistered = await this.photographerRepository.findOne({
      where: { email },
    });

    const isCpfRegistered = await this.photographerRepository.findOne({
      where: { cpf },
    });

    if (isEmailRegistered || isCpfRegistered) {
      return new BadRequestException(
        isEmailRegistered ? 'E-mail já cadastrado' : 'Cpf já cadastrado',
      );
    }

    const currentDate = new Date();

    const data = {
      ...createPhotographerDto,
      created_on: currentDate,
    };

    const newPhotographer = this.photographerRepository.create(data);
    return this.photographerRepository.save(newPhotographer);
  }

  findPhotographers() {
    return this.photographerRepository.find();
  }

  findPhotographerById(id: number) {
    return this.photographerRepository.findOne({ where: { id } });
  }
}
