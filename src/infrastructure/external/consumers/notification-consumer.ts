import { Injectable, OnModuleInit } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import * as process from "node:process";
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class NotificationConsumer implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  onModuleInit() {
    console.log('NotificationConsumer initialized');
  }

  @RabbitSubscribe({
    exchange: 'notification_exchange',
    routingKey: 'notification',
    queue: 'notification_queue',
  })
  async handleNotification(payload: { email: string; message: string }) {
    try {
      const notifyResponse = await firstValueFrom(
        this.httpService.post(process.env.NOTIFICATION_EMAIL_URL, {
          email: payload.email,
          message: payload.message,
        })
      );
      console.log('Notification response:', notifyResponse.statusText);

      if (notifyResponse.status < 200 || notifyResponse.status >= 300) {
        throw new Error(`Notification failed: ${notifyResponse.statusText}`);
      }
    } catch (error) {
      console.warn('Notification failed, but transaction will proceed');
    }
  }
}
