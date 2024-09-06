import { Test, TestingModule } from '@nestjs/testing';
import { AdminCategoriesController } from './admin-categories.controller';
import { AdminCategoriesService } from './admin-categories.service';

describe('AdminCategoriesController', () => {
  let controller: AdminCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminCategoriesController],
      providers: [AdminCategoriesService],
    }).compile();

    controller = module.get<AdminCategoriesController>(AdminCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
