import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Tasks } from "./entity/tasks.entity";
import { CreateTasksDto, UpdateTasksDto, DeleteTasksDto } from "./dto/index";
import { Errors, Messages } from '../common/utils/index';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {

    constructor(@InjectRepository(Tasks) private tasksRepository: Repository<Tasks>, private usersService: UsersService) {}

    async findUserTasksById(id, username: string) {
        try {
            let result = await this.tasksRepository
                .createQueryBuilder("tasks")
                .innerJoinAndSelect('users','users','users.username = tasks.username')    
                .where("tasks.id = :id", id)
                .andWhere("tasks.username = :username", {username})
                .getOne();
            if(!result) {
                return new HttpException(Errors.TASK_NOT_FOUND_ID, HttpStatus.NOT_FOUND);
            }
            return result;
        } catch(err) {
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        } 
    }

    async findUserTasks(username: string) {
        try {
            let result = await this.tasksRepository.find({username});
            if(result.length === 0) {
                return new HttpException(Errors.TASK_NOT_FOUND_USERNAME, HttpStatus.NOT_FOUND);
            }
            return result;
        } catch(err) {
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        } 
    }

    async create(createTasksDto: CreateTasksDto) {
        try {
            const user = await this.usersService.findByUsername(createTasksDto.username);
            if(user instanceof HttpException) {
                return user;
            }
            const result = await this.tasksRepository.insert(createTasksDto);
            return {message: Messages.TASK_CREATED_SUCCESSFULLY, id: result.identifiers[0].id};
        } catch(err) {
            console.log(err);
            return new HttpException(Errors.INTERNAL_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(deleteTasksDto: DeleteTasksDto) {
        try {   
            const result = await this.tasksRepository.delete(deleteTasksDto);
            if(result.affected === 0) {
                return new HttpException(Errors.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            return {message: Messages.TASK_DELETED_SUCCESSFULLY};
        } catch(err) {
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(updateTasksDto: UpdateTasksDto) {
        try {
            let updateDoc: any = {};
            if(updateTasksDto.name) updateDoc.name = updateTasksDto.name;
            if(updateTasksDto.content) updateDoc.content = updateTasksDto.content;

            if(Object.keys(updateDoc).length === 0) {
                return new HttpException(Errors.TASK_UPDATE_FIELDS_REQUIRED, HttpStatus.BAD_REQUEST);  
            }

            let filter = {id: updateTasksDto.id, username: updateTasksDto.username};

            const result = await this.tasksRepository.update(filter, updateDoc);
            if(result.affected === 0) {
                return new HttpException(Errors.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            return {message: Messages.TASK_UPDATED_SUCCESSFULLY};
        } catch(err) {
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
