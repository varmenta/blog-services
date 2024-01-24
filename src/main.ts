import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { VERSION_NEUTRAL, ValidationPipe, VersioningType } from '@nestjs/common'
import { config } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL, '1'],
  })

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const port = config.Port || 3333

  await app.listen(port, '0.0.0.0')
}

bootstrap()