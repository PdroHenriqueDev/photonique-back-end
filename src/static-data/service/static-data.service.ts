import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entity';
import { CategoryProps } from 'src/interface/Category';
import { StandardResponse } from 'src/interface/StandartResponse';
import { Repository } from 'typeorm';

@Injectable()
export class StaticDataService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async findAllCategories(): Promise<StandardResponse<CategoryProps[]>> {
    const data = await this.categoriesRepository.find();
    return {
      data,
      statusCode: 200,
    };
  }
}
