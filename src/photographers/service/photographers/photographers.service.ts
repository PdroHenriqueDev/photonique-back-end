import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photographers } from 'src/entity';
import { Gender } from 'src/enums/gender.enum';
import { StandardResponse } from 'src/model/StandartResponse.model';
import { CreatePhotographerDto } from 'src/photographers/DTO/photographers.dtos';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PhotographersService {
  constructor(
    @InjectRepository(Photographers)
    private readonly photographerRepository: Repository<Photographers>,
  ) {}

  async createPhotographer(
    createPhotographerDto: CreatePhotographerDto,
  ): Promise<StandardResponse<null>> {
    const {
      email,
      cpf,
      gender_id,
      password,
      phone,
      zip_code,
      state,
      city,
      address,
      neighborhood,
      address_number,
    } = createPhotographerDto;
    const salt = await bcrypt.genSalt();

    const isEmailRegistered = await this.photographerRepository.findOne({
      where: { email },
    });

    const cpfHash = await bcrypt.hash(cpf, salt);

    const isCpfRegistered = await this.photographerRepository.findOne({
      where: { cpf: cpfHash },
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

    const [
      passwordHash,
      phoneHash,
      zipCodeHash,
      stateHash,
      cityHash,
      addressHash,
      neighborhoodHash,
      addressNumberHash,
    ] = await Promise.all([
      bcrypt.hash(password, salt),
      bcrypt.hash(phone, salt),
      bcrypt.hash(zip_code, salt),
      bcrypt.hash(state, salt),
      bcrypt.hash(city, salt),
      bcrypt.hash(address, salt),
      bcrypt.hash(neighborhood, salt),
      bcrypt.hash(address_number, salt),
    ]);

    const currentDate = new Date();

    const data = {
      ...createPhotographerDto,
      cpf: cpfHash,
      phone: phoneHash,
      zip_code: zipCodeHash,
      state: stateHash,
      city: cityHash,
      address: addressHash,
      neighborhood: neighborhoodHash,
      address_number: addressNumberHash,
      password: passwordHash,
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
