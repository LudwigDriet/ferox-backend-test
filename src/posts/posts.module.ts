import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
   imports:[TypeOrmModule.forFeature([Post]),UsersModule],
  controllers: [PostsController],
  providers: [PostsService,UsersService],
  exports:[TypeOrmModule]
})
export class PostsModule {}
