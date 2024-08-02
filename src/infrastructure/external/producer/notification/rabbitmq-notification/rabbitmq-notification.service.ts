import { Injectable, Inject } from '@nestjs/common';
import { INotification } from '../../../../../@core/interfaces/notification-service.interface';
import { IMessageBroker } from '../../../../../@core/interfaces/message-broker.interface';

@Injectable()
export class RabbitmqNotificationService implements INotification {
  constructor(@Inject('IMessageBroker') private readonly messageBroker: IMessageBroker) {}

  async notify(email: string, message: string): Promise<void> {
    await this.messageBroker.publish('notification', { email, message });
  }
}