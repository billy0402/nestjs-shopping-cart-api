import { Injectable, Request } from '@nestjs/common';

import { Request as ExpressRequest, Router } from 'express';

@Injectable()
export class AppService {
  getRoutes(@Request() request: ExpressRequest) {
    const appRouter = request.app._router as Router;
    const basePath = `${request.protocol}://${request.get('host')}`;
    const routes = appRouter.stack
      .filter((layer) => layer.route)
      .map((layer) => {
        const path = layer.route!.path;
        const method = layer.route!.stack[0].method;
        return { method: method.toUpperCase(), path: `${basePath}${path}` };
      });
    return { routes };
  }
}
