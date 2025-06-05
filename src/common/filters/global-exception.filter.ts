import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';


@Catch(/*HttpException*/)


export class GlobalExceptionFilter implements ExceptionFilter {
  catch(
    exception: HttpException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();


    const response = ctx.getResponse<Response>();


    const request = ctx.getRequest<Request>();

    let status: number;
    let messages: string[] | string;
    switch (true) {

      case exception instanceof BadRequestException:
        status = exception.getStatus();

        messages = (
          exception.getResponse() as {
            message: string[] | string;
          }
        ).message;
        break;
      case exception instanceof HttpException:
        status = exception.getStatus();
        messages = exception.message;
        break;

      case exception instanceof QueryFailedError:
        status = HttpStatus.CONFLICT;
        messages = (exception as QueryFailedError).message;
        break;
      case exception instanceof TokenExpiredError:
        status = HttpStatus.UNAUTHORIZED;
        messages = (exception as TokenExpiredError).message;
        break;
      case exception instanceof JsonWebTokenError:
        status = HttpStatus.UNAUTHORIZED;
        messages = (exception as JsonWebTokenError).message;
        break;

      default:
        Logger.error(exception);
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        messages = 'Internal server error';
    }

    response.status(status).json({
      statusCode: status,
      messages,
      timestamp: new Date().toISOString(),
      path: request.url
    });
  }
}
