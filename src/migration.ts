// ** Import Dependecies.
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { join } from 'path';

// ** Import entities.
import { Plot } from './plots/entities/plots.entity';
import { User } from './users/entities/user.entity';
import { Side } from './plots/entities/side.entity';

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
  entities: [User, Side, Plot],
  synchronize: true,
  migrationsRun: false,
  migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
  extra: {
    trustServerCertificate: true,
  },
});

AppDataSource.initialize().catch((err) => {
  console.error('Error during Data Source initialization:', err);
});
