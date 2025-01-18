export class InvalidEnvironmentVariableError extends Error {
  constructor() {
    super('[ERROR-001]: Invalid environment variables');
  }
}
