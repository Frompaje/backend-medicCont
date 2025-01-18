import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenGenerate {
  execute() {
    return Math.floor(Math.random() * 600000) + 100000;
  }
}
