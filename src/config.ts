import 'dotenv/config'

export class Config {
  get typeOrmConfig() {
    return {
      host: this.getEnv('DATABASE_HOST'),
      port: Number(this.getEnv('DATABASE_PORT')),
      username: this.getEnv('DATABASE_USERNAME'),
      password: this.getEnv('DATABASE_PASSWORD'),
      database: this.getEnv('DATABASE_NAME'),
    }
  }

  get DevMode(): boolean {
    return this.getEnv('NODE_ENV') === 'test'
  }

  get Port(): number {
    return parseInt(this.getEnv('PORT'), 10)
  }

  get NodeEnv(): string {
    return this.getEnv('NODE_ENV')
  }

  protected getEnv(env: string): string {
    if (!process.env[env]) {
      throw new Error(`Missing env var ${env}`)
    }

    return process.env[env] as string
  }
}

export const config = new Config()
