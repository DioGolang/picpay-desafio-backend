import { Injectable } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthorizationConsumer {
  constructor(private readonly httpService: HttpService) {}

  @RabbitRPC({
    exchange: 'authorization_exchange',
    routingKey: 'authorization.key',
    queue: 'authorization_queue',
  })
  public async handleAuthorizationMessage(msg: any) {
    console.log(`Received message: ${JSON.stringify(msg)}`);

    const correlationId = msg.correlationId;
    if (!correlationId) {
      console.error('Missing correlationId in message');
      return {
        status: 'fail',
        data: { authorization: false },
        correlationId,
      };
    }

    try {
      const response = await firstValueFrom(this.httpService.get('https://util.devi.tools/api/v2/authorize'));
      const { status, data } = response.data;
      console.log(`Authorization result: ${status}, ${data.authorization}`);

      return {
        status,
        data,
        correlationId, // Include the correlationId in the response
      };

    } catch (error) {
      console.error('Error processing authorization request:', error);
      return {
        status: 'fail',
        data: { authorization: false },
        correlationId, // Include the correlationId in the error response
      };
    }
  }
}
