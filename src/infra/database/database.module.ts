import { Global, Module } from '@nestjs/common';
import { DatabaseService } from 'src/infra/database/database.service';

@Global()
@Module({
  imports: [],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
