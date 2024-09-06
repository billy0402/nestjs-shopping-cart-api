import { Test, TestingModule } from '@nestjs/testing';
import { ClientOrdersService } from './client-orders.service';

describe('ClientOrdersService', () => {
  let service: ClientOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientOrdersService],
    }).compile();

    service = module.get<ClientOrdersService>(ClientOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
