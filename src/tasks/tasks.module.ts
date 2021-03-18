import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TasksService } from './tasks.service';
import {TasksController} from './tasks.controller';
import {Tasks} from './entity/tasks.entity';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Tasks]), UsersModule],
    providers: [TasksService],
    controllers: [TasksController]
})
export class TasksModule {}
