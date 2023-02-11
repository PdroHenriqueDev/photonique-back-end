import { Injectable } from '@nestjs/common';
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

  createPhotographer(createPhotographerDto: CreatePhotographerDto) {
    const newPhotographer = this.photographerRepository.create(
      createPhotographerDto,
    );
    return this.photographerRepository.save(newPhotographer);
  }

  findPhotographers() {
    return this.photographerRepository.find();
  }

  findPhotographerById(id: number) {
    return this.photographerRepository.findOne({ where: { id } });
  }
}
