module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'wenlock',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  };
  