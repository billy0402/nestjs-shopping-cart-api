import { Test, TestingModule } from '@nestjs/testing';
import { PublicCategoriesService } from './public-categories.service';

describe('PublicCategoriesService', () => {
  let service: PublicCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicCategoriesService],
    }).compile();

    service = module.get<PublicCategoriesService>(PublicCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
