import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { Plot } from './plots/entities/plots.entity';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Side } from './plots/entities/side.entity';
import { PlotsModule } from './plots/plots.module';
import { join } from 'path';

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
      entities: [Plot, Side, User],
      synchronize: false,
      migrationsRun: false,
      migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
      extra: {
        trustServerCertificate: true,
      },
    }),
    PlotsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
