import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TasksService } from './tasks.service';
import {TasksController} from './tasks.controller';
import {Tasks} from './entity/tasks.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Tasks])],
    providers: [TasksService],
    controllers: [TasksController]
})
export class TasksModule {}
