import { Test, TestingModule } from '@nestjs/testing';
import { PublicProductsService } from './public-products.service';

describe('PublicProductsService', () => {
  let service: PublicProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicProductsService],
    }).compile();

    service = module.get<PublicProductsService>(PublicProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
