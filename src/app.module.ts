import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './posts/posts.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './posts/entities/post.entity'
import { config } from './config'

const { host, port, username, password, database } = config.typeOrmConfig
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host,
      port,
      username,
      password,
      database,
      synchronize: true,
      options: {
        encrypt: false,
      },
      autoLoadEntities: true,
      entities: [Post],
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
