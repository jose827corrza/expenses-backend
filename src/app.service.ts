import { Inject, Injectable } from '@nestjs/common';
import config from './config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(@Inject(config.KEY) private c: ConfigType<typeof config>) {}
  getHello() {
    return { environment: this.c.env || 'BASE' };
  }
}
