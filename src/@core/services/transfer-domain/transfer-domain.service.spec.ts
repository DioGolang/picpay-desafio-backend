import { Test, TestingModule } from '@nestjs/testing';
import { TransferDomainService } from './transfer-domain.service';

describe('TransferDomainService', () => {
  let service: TransferDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransferDomainService],
    }).compile();

    service = module.get<TransferDomainService>(TransferDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
