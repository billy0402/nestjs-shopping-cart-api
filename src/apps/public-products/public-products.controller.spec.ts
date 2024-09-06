import { Test, TestingModule } from '@nestjs/testing';
import { PublicProductsController } from './public-products.controller';
import { PublicProductsService } from './public-products.service';

describe('PublicProductsController', () => {
  let controller: PublicProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicProductsController],
      providers: [PublicProductsService],
    }).compile();

    controller = module.get<PublicProductsController>(PublicProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
