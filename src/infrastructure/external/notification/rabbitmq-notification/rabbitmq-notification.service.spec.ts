import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqNotificationService } from './rabbitmq-notification.service';

describe('RabbitmqNotificationService', () => {
  let service: RabbitmqNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitmqNotificationService],
    }).compile();

    service = module.get<RabbitmqNotificationService>(RabbitmqNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
