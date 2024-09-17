import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user/controllers/user.controller';
import { AuthService } from './auth/services/auth.service';
import { CreateUserDto } from './user/dtos/create-user-dto';
import { User } from './user/entities/user.entity';
import { UserService } from './user/services/createUser/user.service';


describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            sendRecoveryEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should create a user and return it', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'John Doe',
        email: 'john@example.com',
        registrationNumber: '123456',
        password: 'password123',
      };
      const result: User = { 
        id: 1, 
        ...createUserDto, 
        createdAt: new Date(), 
        updatedAt: new Date(), 
      };

      jest.spyOn(userService, 'create').mockResolvedValue(result);

      expect(await userController.create(createUserDto)).toEqual(result);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [
        { 
          id: 1, 
          fullName: 'John Doe', 
          email: 'john@example.com', 
          registrationNumber: '123456', 
          password: 'hashedPassword',
          createdAt: new Date(), 
          updatedAt: new Date(), 
        },
        { 
          id: 2, 
          fullName: 'Jane Doe', 
          email: 'jane@example.com', 
          registrationNumber: '654321', 
          password: 'hashedPassword',
          createdAt: new Date(), 
          updatedAt: new Date(), 
        },
      ];

      jest.spyOn(userService, 'findAll').mockResolvedValue({ users: result, total: result.length });

      expect(await userController.findAll()).toEqual({ users: result, total: result.length });
      expect(userService.findAll).toHaveBeenCalledWith(1, 10, undefined); 
    });
  });

  describe('findById', () => {
    it('should return a user by ID', async () => {
      const result: User = { 
        id: 1, 
        fullName: 'John Doe', 
        email: 'john@example.com', 
        registrationNumber: '123456', 
        password: 'hashedPassword',
        createdAt: new Date(), 
        updatedAt: new Date(), 
      };

      jest.spyOn(userService, 'findById').mockResolvedValue(result);

      expect(await userController.findById(1)).toEqual(result);
      expect(userService.findById).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if user not found', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValue(null); 
    
      await expect(userController.findById(999)).rejects.toThrowError('User not found');
    });
  });
});