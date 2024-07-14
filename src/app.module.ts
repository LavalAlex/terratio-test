import { Module } from '@nestjs/common';

import { LotsModule } from './plots/plots.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Side } from './plots/entities/side.entity';
import { Plot } from './plots/entities/plots.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.17.0.2',
      port: 3306,
      username: 'root',
      password: 'pr0jects-2024!',
      database: 'terratio',
      entities: [Plot, Side],
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
