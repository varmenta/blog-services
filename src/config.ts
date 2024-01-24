import 'dotenv/config'

export class Config {
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
