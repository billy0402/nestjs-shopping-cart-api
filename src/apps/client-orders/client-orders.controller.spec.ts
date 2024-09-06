import { Test, TestingModule } from '@nestjs/testing';
import { ClientOrdersController } from './client-orders.controller';
import { ClientOrdersService } from './client-orders.service';

describe('ClientOrdersController', () => {
  let controller: ClientOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientOrdersController],
      providers: [ClientOrdersService],
    }).compile();

    controller = module.get<ClientOrdersController>(ClientOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
