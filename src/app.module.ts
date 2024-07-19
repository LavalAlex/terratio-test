// ** Import Dependencies.
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { join } from 'path';

// ** Import Entities.
import { Plot } from './plots/entities/plots.entity';
import { Side } from './plots/entities/side.entity';

// ** Import Module.
import { PlotsModule } from './plots/plots.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT
        ? Number(process.env.DATABASE_PORT)
        : 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Plot, Side],
      synchronize: false,
      migrationsRun: false,
      migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
      extra: {
        trustServerCertificate: true,
      },
    }),
    PlotsModule,
  ],
})
export class AppModule {}
