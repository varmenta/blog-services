import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { VERSION_NEUTRAL, ValidationPipe, VersioningType } from '@nestjs/common'
import { config } from './config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { HttpExceptionFilter } from 'libs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const configSwagger = new DocumentBuilder()
    .setTitle('Blog')
    .setDescription('Blog API Description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('api', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  })

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL, '1'],
  })

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new HttpExceptionFilter())

  const port = config.Port || 3333

  await app.listen(port, '0.0.0.0')
}

bootstrap()
