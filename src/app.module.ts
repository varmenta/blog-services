import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './posts/posts.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './posts/entities/post.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'Passw0rd',
      database: 'blog',
      options: {
        encrypt: false,
      },
      autoLoadEntities: true,
      synchronize: true,
      entities: [Post],
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
