import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
 constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,


  ) {}


 async create(createUserDto: CreateUserDto) {
  try {
   
    const userCreate = this.usersRepository.create(createUserDto)
    const user = await this.usersRepository.save(userCreate)

    return {message:"user successfully created",user} 
    
  } catch (error) {
      throw new BadRequestException('user could not be created in the database');
  }

  }

   async login(loginUserDto: LoginUserDto) {
  try {
    
    const user = await this.usersRepository.findOneBy({ email: loginUserDto.email , password: loginUserDto.password})
    
 

    return !user?{message:'incorrect email or password'} : {message:"user successfully logged in",user} 
    
  } catch (error) {
     throw new BadRequestException('incorrect email or password');
  }

  }

 async findAll() {
    return this.usersRepository.find();
  }

 async findOne(id: string) {

  try {
    const user = await this.usersRepository.findOneBy({ id });
    return user
   
    
  } catch (error) {
    throw new BadRequestException('user not found');
  }

  }

 async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      
       await this.usersRepository.findOneBy({id});
      
    } catch (error) {
      
      throw new BadRequestException('user not found');
    }

    try {
     const user=  await this.usersRepository.update(id,updateUserDto)

      return {message:"user successfully updated",user} 

  } catch (error) {
     throw new BadRequestException('user could not be updated in the database');
  }
   
  }

 async remove(id: string) {
    try {
    const user = await this.usersRepository.delete(id);
    return {message:"user successfully removed",user} 
    
  } catch (error) {
    throw new BadRequestException('user not found');
  }
   
  }
}
