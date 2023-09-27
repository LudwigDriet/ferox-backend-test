import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';


@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
     username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),UsersModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
