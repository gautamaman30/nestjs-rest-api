import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from 'typeorm';
import { Tasks } from "./entity/tasks.entity";
import { CreateTasksDto, UpdateTasksDto } from "./dto/index";
import { Errors, Messages, StatusCodes } from '../utils/index'

@Injectable()
export class TasksService {

    constructor(@InjectRepository(Tasks) private tasksRepository: Repository<Tasks>) {}

    async findAll() {
        try {
            const result = await this.tasksRepository.find();
            return result;
        } catch(err) {
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async findById(id: number) {
        try {
            let result = await this.tasksRepository.findOne(id);
            if(!result) {
                return new HttpException(Errors.TASK_NOT_FOUND_ID, StatusCodes.NOT_FOUND);
            }
            return result;
        } catch(err) {
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
        } 
    }

    async findByUsername(username: string) {
        try {
            let result = await this.tasksRepository.findOne(username);
            if(!result) {
                return new HttpException(Errors.TASK_NOT_FOUND_USERNAME, StatusCodes.NOT_FOUND);
            }
            return result;
        } catch(err) {
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
        } 
    }

    async create(createTasksDto: CreateTasksDto) {
        try {
            const result = await this.tasksRepository.insert(createTasksDto);
            return {message: Messages.TASK_CREATED_SUCCESSFULLY, id: result.identifiers[0].id};
        } catch(err) {
            console.log(err);
            return new HttpException(Errors.INTERNAL_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: number, username: string) {
        try {   
            let filter = {id, username};
            const result = await this.tasksRepository.delete(filter);
            return {message: Messages.TASK_DELETED_SUCCESSFULLY};
        } catch(err) {
            console.log(err.message);
            if(err instanceof QueryFailedError) {
                return new HttpException(err.message, StatusCodes.BAD_REQUEST);
            }
            return new HttpException(Errors.INTERNAL_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async update(updateTasksDto: UpdateTasksDto) {
        try {
            let updateDoc: any = {};
            if(updateTasksDto.name) updateDoc.name = updateTasksDto.name;
            if(updateTasksDto.content) updateDoc.content = updateTasksDto.content;

            if(Object.keys(updateDoc).length === 0) {
                return new HttpException(Errors.TASK_UPDATE_FIELDS_REQUIRED, StatusCodes.BAD_REQUEST);  
            }

            let filter = {id: updateTasksDto.id, username: updateTasksDto.username};
            const result = this.tasksRepository.update(filter, updateDoc);
            return {message: Messages.TASK_UPDATED_SUCCESSFULLY}
        } catch(err) {
            console.log(err.message);
            if(err instanceof QueryFailedError) {
                return new HttpException(err.message, StatusCodes.BAD_REQUEST);
            }
            return new HttpException(Errors.INTERNAL_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

}
