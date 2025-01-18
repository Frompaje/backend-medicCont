import { logger } from 'src/infra/logger';
import { InvalidEnvironmentVariableError } from 'src/shared/error/invalid-environment-varaible-error';
import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRATION_TIME: z.string(),
  MAIL_LOGIN: z.string().optional(),
  MAIL_PASSWORD: z.string().optional(),
  MAIL_HOST: z.string().optional(),
  MAIL_SECURE: z.coerce.boolean(),
  PG_USERNAME: z.string().default('postgres'),
  PG_PASSWORD: z.string().default('password'),
  PG_DATABASE: z.string().default('medicContDB'),
});

export const validateEnv = (env: Record<string, any>) => {
  const _env = envSchema.safeParse(env);

  if (!_env.success) {
    logger.error('Invalid environment variables');
    logger.error(_env.error.formErrors.fieldErrors);

    throw new InvalidEnvironmentVariableError();
  }

  return _env.data;
};

export type Env = z.infer<typeof envSchema>;
