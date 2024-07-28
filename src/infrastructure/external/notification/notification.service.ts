import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom, catchError } from "rxjs";

@Injectable()
export class NotificationService {
  constructor(private readonly httpService: HttpService) { }

  async notify(email: string, message: string): Promise<boolean> {
    try {
      const notifyResponse = await firstValueFrom(this.httpService.post('https://util.devi.tools/api/v1/notify', { email, message }));

      if (notifyResponse.status >= 200 && notifyResponse.status < 300) {
        return true;
      } else {
        throw new Error(`Notification failed: ${notifyResponse.statusText}`);
      }
    } catch (error) {
      console.error('Notification failed:', error); // Log specific error details
      // Optionally: return false to signal notification failure (consider context)
      // return false;
    }
  }
}
