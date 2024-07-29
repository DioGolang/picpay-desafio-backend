import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AuthorizationService {
  constructor(private readonly httpService: HttpService) { }

  async authorize(): Promise<void> {
    try {
      const authorizeResponse = await firstValueFrom(this.httpService.get('https://util.devi.tools/api/v2/authorize'));

      if (!authorizeResponse.data.data.authorization) {
        throw new UnauthorizedException('Transaction not authorized');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        throw new UnauthorizedException('Transaction not authorized');
      }
      console.error('Authorization failed:', error);
      throw new UnauthorizedException('Authorization failed');
    }
  }
}
