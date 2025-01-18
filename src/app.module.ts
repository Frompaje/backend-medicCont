import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from 'src/infra/env/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => validateEnv(env),
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
