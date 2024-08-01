import { Injectable } from '@nestjs/common';
import { AmqpConnection, RequestOptions} from '@golevelup/nestjs-rabbitmq';
import { IMessageBroker } from '../../../@core/interfaces/message-broker.interface';
import { Observable, from, throwIfEmpty, catchError, retry, firstValueFrom } from "rxjs";
import { v4 as uuidv4 } from 'uuid';
import { HttpService } from "@nestjs/axios";

@Injectable()
export class RabbitmqService implements IMessageBroker {
  constructor(
    private readonly amqpConnection: AmqpConnection,
  private readonly httpService: HttpService,
  ) {}

  async publish(pattern: string, payload: any): Promise<void> {
    try {
      console.log('Publishing message:', { pattern, payload });
      await this.amqpConnection.publish('authorization_exchange', pattern, payload);
    } catch (error) {
      console.error('Error publishing message:', error);
      throw error;
    }
  }

  send<T>(pattern: string, payload: any): Observable<T> {
    const correlationId = uuidv4();
    const options: RequestOptions = {
      exchange: 'authorization_exchange',
      routingKey: pattern,
      payload,
      correlationId,
      timeout: 10000, // Increased timeout
    };

    return from(this.amqpConnection.request<T>(options))
  }


  async sendMessage(queue: string, message: any): Promise<any> {
    const correlationId = uuidv4(); // Generate a unique correlation ID
    return await this.amqpConnection.request({
      exchange: 'authorization_exchange',
      routingKey: queue,
      payload: {
        ...message,
        correlationId,
      },
      correlationId,
    });
  }

}