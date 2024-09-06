import { Test, TestingModule } from '@nestjs/testing';
import { PublicCategoriesController } from './public-categories.controller';
import { PublicCategoriesService } from './public-categories.service';

describe('PublicCategoriesController', () => {
  let controller: PublicCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicCategoriesController],
      providers: [PublicCategoriesService],
    }).compile();

    controller = module.get<PublicCategoriesController>(PublicCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
