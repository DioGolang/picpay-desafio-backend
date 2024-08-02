import { Inject, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { IAuthorization } from "../../../../@core/interfaces/authorization.interface";
import { RabbitmqService } from "../../rabbitmq/rabbitmq.service";

@Injectable()
export class AuthorizationService implements IAuthorization {
  private readonly logger = new Logger(AuthorizationService.name);

  constructor(
    @Inject('IMessageBroker') private readonly rabbitmqService: RabbitmqService,
  ) {}

  async authorize(): Promise<void> {
    try {
      const message = {};
      const response = await this.rabbitmqService.sendMessage('authorization.key', message);
      this.logger.debug(`Authorization response: ${JSON.stringify(response)}`);

      if (response.status === 'success' && response.data.authorization === true) {
        return;
      }

      if (response.status === 'fail' && response.data.authorization === false) {
        throw new UnauthorizedException('Authorization failed');
      }

      throw new Error('Unexpected authorization response');
    } catch (error) {
      this.logger.error('Authorization failed:', error);
      throw new UnauthorizedException('Authorization failed');
    }
  }
}