import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity'; 

export const AppDataSource = new DataSource({
  type: 'postgres', 
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'postgres',
  logging: false,
  entities: [User], 
  migrations: ['src/migrations/**/*{.ts,.js}'], 
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });