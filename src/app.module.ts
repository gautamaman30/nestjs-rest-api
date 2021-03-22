import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware, LowercaseReqKeysMiddleware } from './common/middleware/index'
import { UsersModule } from './users/users.module';
import { configObj } from './common/configEnv';
import { Users } from './users/entity/users.entity';
import { TasksModule } from './tasks/tasks.module';
import { Tasks } from './tasks/entity/tasks.entity';
import { JwtStrategy } from './common/strategy/jwt.strategy';

@Module({
    imports: [UsersModule, TasksModule, TypeOrmModule.forRootAsync({
        useFactory: () => ({
            type: <any>configObj.DB_TYPE,
            host: configObj.DB_HOST,
            port: configObj.DB_PORT,
            username: configObj.DB_USERNAME,
            password: configObj.DB_PASSWORD,
            database: configObj.DB_DATABASE,
            entities: [Users, Tasks],
            synchronize: true,
            logging: true  
        })
    })],  
    controllers: [],
    providers: [JwtStrategy],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LowercaseReqKeysMiddleware)
            .forRoutes({ path: 'user', method: RequestMethod.ALL}, {path: 'task', method: RequestMethod.ALL});
        consumer.apply(LoggerMiddleware)
            .forRoutes({path: 'user', method: RequestMethod.ALL}, {path: 'task', method: RequestMethod.ALL});        
    }
}
