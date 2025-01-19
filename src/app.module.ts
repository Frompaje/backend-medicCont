import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/infra/database/database.module';
import { validateEnv } from 'src/infra/env/env';
import { TaxModule } from 'src/modules/taxes/tax.module';

import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => validateEnv(env),
      isGlobal: true,
    }),
    UserModule,
    TaxModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
