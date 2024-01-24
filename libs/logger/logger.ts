import * as winston from 'winston'
import { Logger } from '@nestjs/common'
import { logLevel } from './logLevel'
import 'dotenv/config'
const { NODE_ENV, APP_NAME } = process.env
const isLoggable = NODE_ENV && ['staging', 'production'].includes(NODE_ENV)
let defaultMeta: any = {}

if (isLoggable) {
  defaultMeta = {
    cluster_name: NODE_ENV,
    service: APP_NAME,
  }
}

const _logger = winston.createLogger({
  level: isLoggable ? logLevel : 'silly',
  format: isLoggable ? winston.format.json() : winston.format.simple(),
  transports: [new winston.transports.Console()],
})

const { log } = _logger
_logger.log = (...args: any) => {
  const { level, msg, ctx } = contextMixin(...args)

  if (!isLoggable) {
    const message = `${msg} - ${JSON.stringify(ctx, null, 1)}`
    const { data } = ctx

    switch (level) {
      case 'debug': {
        Logger.debug(message, data ? data.location : undefined)
        break
      }
      case 'warn': {
        Logger.warn(message, data ? data.location : undefined)
        break
      }
      case 'error': {
        Logger.warn(message, data ? data.location : undefined)
        break
      }
      default: {
        Logger.log(message, data ? data.location : undefined)
      }
    }
    return _logger
  } else {
    return log.bind(_logger)(ctx)
  }
}

export const logger = _logger

interface ContextMetadata {
  [key: string]: string
}
export const contextMixin = (
  ...args: any
): {
  level: string
  msg: string
  ctx: any
} => {
  let ctx: ContextMetadata = {}

  const level = args[0]
  const msg = args[1]
  const meta = args[2]
  const { http, error } = meta
  if (http) {
    ctx.http = http
    delete meta.http
  }
  if (error) {
    ctx.error = error
    delete meta.error
  }
  ctx.data = meta
  if (isLoggable) {
    ctx.msg = msg
    ctx.level = level
    ctx = {
      ...ctx,
      ...defaultMeta,
      source: 'nodejs',
    }
  }
  return { level, msg, ctx }
}
