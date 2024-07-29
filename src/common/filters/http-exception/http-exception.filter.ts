import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const response = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';
    const message = typeof response === 'string' ? response : (response as any).message || 'Internal server error';

    res.status(status).json({
      statusCode: status,
      message,
    });
  }
}