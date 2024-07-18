import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Plot } from './plots/entities/plots.entity';
import { Side } from './plots/entities/side.entity';
import { join } from 'path';

ConfigModule.forRoot({
  isGlobal: true,
});

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT') || 3306,
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [Plot, Side],
  synchronize: false,
  migrationsRun: false,
  migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
  extra: {
    trustServerCertificate: true,
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
