import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { models } from '../model';
import { SeederOptions, runSeeders } from 'typeorm-extension';
import { userFactories } from '../../../modules/users/seeds/factories';
import { userSeeders } from '../../../modules/users/seeds/seeders';
config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: models,
  factories: [
    ...userFactories,
  ],
  seeds: [
    ...userSeeders,
  ],
};

const dataSource = new DataSource(options);
dataSource.initialize().then(async () => {
  await runSeeders(dataSource);
});
