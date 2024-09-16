import { AppDataSource } from './data-source'; 
import * as bcrypt from 'bcrypt';
import { UserService } from './user/services/createUser/user.service';
import { CreateUserDto } from './user/dtos/create-user-dto';
import { User } from './user/entities/user.entity';

async function seedDatabase() {
  
  const dataSource = await AppDataSource.initialize();
  const userService = new UserService(dataSource.getRepository(User)); 
  try {
    await userService.findByEmailOrRegistration('admin@example.com');
    console.log('Usuário administrador já existe.');
  } catch {
  
    const createUserDto: CreateUserDto = {
      fullName: 'Admin User',
      email: 'admin@example.com',
      registrationNumber: 'admin123',
      password: 'password', 
    };

    await userService.create(createUserDto);
    console.log('Usuário administrador pré-cadastrado com sucesso.');
  }
}

seedDatabase()
  .catch(error => console.error('Erro ao inicializar o banco de dados:', error));
