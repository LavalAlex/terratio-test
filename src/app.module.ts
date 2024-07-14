import { Module } from '@nestjs/common';

import { LotsModule } from './lots/lots.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lot } from './lots/entities/lot.entity';
import { Side } from './lots/entities/side.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.17.0.2',
      port: 3306,
      username: 'root',
      password: 'pr0jects-2024!',
      database: 'terratio',
      entities: [Lot, Side],
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
  ],
})
export class AppModule {}
