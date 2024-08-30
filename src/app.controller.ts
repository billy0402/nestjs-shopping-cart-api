import { Controller, Get, Request } from '@nestjs/common';

import { Request as ExpressRequest } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Request() request: ExpressRequest) {
    return this.appService.getRoutes(request);
  }
}
