import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { ZodError } from 'zod';

@Catch()
export class ZodExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception.error instanceof ZodError) {
      Logger.error(exception.error);
    }

    super.catch(exception, host);
  }
}
