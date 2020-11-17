import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig } from './config/env.config';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRoot(typeOrmConfig()),
    TasksModule
  ]
})
export class AppModule {}
