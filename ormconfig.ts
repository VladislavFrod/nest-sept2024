import * as dotenv from 'dotenv';
import * as path from 'node:path';
import { DataSource } from 'typeorm';


import getter from './src/configs/configuration';


dotenv.config({
  path: './environments/local.env',
}); /* loads environment variables from a .env file into process.env */

// take out data from postgres ENV
const {
  user: username,
  dbName: database,
  password,
  host,
  port,
} = getter().postgres;

// create connection to postgres database using script in package.json
export default new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [
    path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
  ],
  migrations: [
    path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
  ],
  synchronize:
    false /*Must be false to avoid automatic entity's synchronisation with database */,
  logging: ['query', 'error'],
});
