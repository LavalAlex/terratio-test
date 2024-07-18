// ** Import Dependencies.
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  isGlobal: true,
});

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT') || 3306,
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrationsRun: false,
  migrations: ['dist/db/migrations/*.js'],
  extra: {
    trustServerCertificate: true,
  },
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
