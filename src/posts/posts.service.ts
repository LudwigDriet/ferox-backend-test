import { Injectable,BadRequestException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
   constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

      @InjectRepository(User)
    private usersRepository: Repository<User>,


  ) {}


  async create(createPostDto: CreatePostDto) {

    
    try {
      
       await this.usersRepository.findOneBy({
        id: createPostDto.user_id,
      });
      
    } catch (error) {
      
      throw new BadRequestException('user not found');
    }

    
      try {
      const post = this.postsRepository.create(createPostDto)
      return await this.postsRepository.save(post)

  } catch (error) {
     throw new BadRequestException('post could not be created in the database');
  }
  
  }

 async findAll() {
      return this.postsRepository.find();
  }

 async findOne(id: string) {
    return this.postsRepository.findOneBy({ id });
  }

}
