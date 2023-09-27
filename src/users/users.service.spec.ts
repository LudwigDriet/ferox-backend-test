  import { Test, TestingModule } from '@nestjs/testing';
  import { UsersService } from './users.service';
  import {getRepositoryToken} from '@nestjs/typeorm'
  import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';

  describe('UsersService', () => {
    let service: UsersService;
    let repository:Repository<User>;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [UsersService,
        {
          provide:getRepositoryToken(User),
          useValue:{
            create:jest.fn(),
            save:jest.fn(),
          }
        }],
      }).compile();

      service = module.get<UsersService>(UsersService);
      repository = module.get<Repository<User>>(getRepositoryToken(User));

    });

    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(repository).toBeDefined();

    });

    describe('create',()=>{
      it('you must successfully create a new user', async() => {

      const data :CreateUserDto = {
        email:"ludwigprueba@gmail.com",
        password:"clave prueba"
      }

      const result = await service.create(data)

      const userEntityMock = {
         email:"ludwigprueba@gmail.com",
        password:"clave prueba"
      } as User

      jest.spyOn(repository,"create").mockReturnValueOnce(userEntityMock)
      jest.spyOn(repository,"save").mockResolvedValueOnce(userEntityMock)


      expect(result).toBeDefined();
      expect(repository.create).toBeCalledTimes(1);
      expect(repository.save).toBeCalledTimes(1);

    });
    })
       
  });
