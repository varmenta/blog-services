import { logger } from '../logger'
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'

export type ExceptionFilterData = {
  response: {
    statusCode: number
    message: string
    error: string
  }
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    if (exception instanceof HttpException) {
      const request = ctx.getRequest<Request>()
      const status = exception.getStatus()
      const error = exception as unknown as ExceptionFilterData

      const errorResponse = {
        response: error.response,
        path: request.url,
        method: request.method,
        timestamp: new Date().toISOString(),
      }

      logger.error('Error executing request', errorResponse)

      response.status(status).send({
        statusCode: status,
        message: error.response.message || error.response,
        error: error.response.error,
      })
    } else {
      logger.error('INTERNAL ERROR', exception.message)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        error: exception.message,
      })
    }
  }
}
