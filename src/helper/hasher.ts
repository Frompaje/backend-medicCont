import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';

export abstract class Hash {
  abstract hash(payload: string): Promise<string>;
  abstract compare(data: string, payload: string): Promise<boolean>;
}

@Injectable()
export class Hasher implements Hash {
  private SALT = 8;

  async hash(payload: string): Promise<string> {
    const hashed = hashSync(payload, this.SALT);

    return hashed;
  }
  async compare(data: string, payload: string): Promise<boolean> {
    const result = compareSync(data, payload);

    return result;
  }
}
