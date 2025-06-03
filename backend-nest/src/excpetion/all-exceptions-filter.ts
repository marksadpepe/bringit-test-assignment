import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';

interface ExceptionResponse {
  message?: string | string[];
  statusCode?: number;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message;

    if (exception instanceof HttpException) {
      const exceptionRes = <ExceptionResponse>exception.getResponse();

      if (exceptionRes.message) {
        message = Array.isArray(exceptionRes.message)
          ? exceptionRes.message[0]
          : exceptionRes.message;
      }
    } else {
      message =
        exception instanceof Error
          ? exception.message
          : 'Internal Server Error';
    }

    response.status(statusCode).json({
      message,
      statusCode,
    });
  }
}
