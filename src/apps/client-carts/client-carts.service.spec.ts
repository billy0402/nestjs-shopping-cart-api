import { Test, TestingModule } from '@nestjs/testing';
import { ClientCartsService } from './client-carts.service';

describe('ClientCartsService', () => {
  let service: ClientCartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientCartsService],
    }).compile();

    service = module.get<ClientCartsService>(ClientCartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
