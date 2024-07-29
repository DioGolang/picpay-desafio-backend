import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class NotificationService {
  constructor(private readonly httpService: HttpService) { }

  async notify(email: string, message: string): Promise<void> {
    try {
      const notifyResponse = await firstValueFrom(
        this.httpService.post('https://util.devi.tools/api/v1/notify', { email, message })
      );

      if (notifyResponse.status < 200 || notifyResponse.status >= 300) {
        throw new InternalServerErrorException(`Notification failed: ${notifyResponse.statusText}`);
      }
    } catch (error) {
      console.warn('Notification failed, but transaction will proceed');
    //  throw new InternalServerErrorException('Notification failed');
    }
  }
}
