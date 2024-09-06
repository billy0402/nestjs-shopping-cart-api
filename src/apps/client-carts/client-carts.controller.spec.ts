import { Test, TestingModule } from '@nestjs/testing';
import { ClientCartsController } from './client-carts.controller';
import { ClientCartsService } from './client-carts.service';

describe('ClientCartsController', () => {
  let controller: ClientCartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientCartsController],
      providers: [ClientCartsService],
    }).compile();

    controller = module.get<ClientCartsController>(ClientCartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
