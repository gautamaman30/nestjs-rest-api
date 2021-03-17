import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsersService } from './users.service';
import {UsersController} from './users.controller';
import {Users} from './entity/users.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
