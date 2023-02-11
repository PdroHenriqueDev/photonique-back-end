import { Test, TestingModule } from '@nestjs/testing';
import { PhotographersController } from './photographers.controller';

describe('PhotographersController', () => {
  let controller: PhotographersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotographersController],
    }).compile();

    controller = module.get<PhotographersController>(PhotographersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
