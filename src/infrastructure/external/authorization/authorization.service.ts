import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom, catchError } from "rxjs";

@Injectable()
export class AuthorizationService {
  constructor(private readonly httpService: HttpService) { }

  async authorize(): Promise<boolean> {
    try {
      const authorizeResponse = await firstValueFrom(this.httpService.get('https://util.devi.tools/api/v2/authorize'));

      if (!authorizeResponse.data.data.authorization) {
        throw new Error('Transaction not authorized');
      }

      return true;
    } catch (error) {
      console.error('Authorization failed:', error);
      throw error;
    }
  }
}