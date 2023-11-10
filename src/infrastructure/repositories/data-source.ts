import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { models } from './model';

config();

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: models,
  migrations: [
    'src/infrastructure/repositories/migrations/*.ts',
  ],
  synchronize: false,
};

const dataSource = new DataSource(options);
export default dataSource;
