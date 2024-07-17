import { Module } from '@nestjs/common';

import { LotsModule } from './plots/plots.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Plot } from './plots/entities/plots.entity';
import { User } from './users/entities/user.entity';
import { Side } from './plots/entities/side.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.17.0.2',
      port: 3306,
      username: 'root',
      password: 'pr0jects-2024!',
      database: 'terratio',
      entities: [Plot, Side, User],
      synchronize: true,
      // migrations: [
      //     "src/migration/**/*.ts"
      // ],
      // "subscribers": [
      //     "src/subscriber/**/*.ts"
      // ],
      // "cli": {
      //     "entitiesDir": "src/entity",
      //     "migrationsDir": "src/migration",
      //     "subscribersDir": "src/subscriber"
      // }
    }),
    LotsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
