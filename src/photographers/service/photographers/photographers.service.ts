import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from 'src/entity';
import { Events } from 'src/entity';
import { Gender } from 'src/enum/gender.enum';
import { CreatePhotographerDto } from 'src/photographers/DTO/photographers.dtos';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { FileValidationPipe } from 'src/pipe/fileValidation.pipe';
import { EventDto } from 'src/photographers/DTO/event.dto';
import { StandardResponse } from 'src/interface/StandartResponse';

@Injectable()
export class PhotographersService {
  constructor(
    @InjectRepository(People)
    private readonly photographerRepository: Repository<People>,
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,
    private fileValidationPipe: FileValidationPipe,
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

    const [isEmailRegistered, isCpfRegistered] = await Promise.all([
      this.photographerRepository.findOne({
        where: { email },
      }),
      this.photographerRepository.findOne({
        where: {
          cpf,
        },
      }),
    ]);

    if (isEmailRegistered || isCpfRegistered) {
      return {
        statusCode: 400,
        message: isEmailRegistered
          ? 'E-mail já cadastrado'
          : 'CPF já cadastrado',
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

  async createEvet(
    event: EventDto,
  ): Promise<StandardResponse<{ eventId: number }>> {
    const newEvent = {
      ...event,
    };

    const savedNewEvent = await this.eventRepository.save(newEvent);
    const { id } = savedNewEvent;

    return {
      statusCode: 201,
      message: 'Evento criado com sucesso!',
      data: {
        eventId: id,
      },
    };
  }

  uploadPhoto(file: Express.Multer.File) {
    const validatorMessage = this.fileValidationPipe.transform(file);

    if (validatorMessage) return validatorMessage;

    return {
      statusCode: 200,
      message: 'Foto enviada com sucesso!',
    };
  }
}
