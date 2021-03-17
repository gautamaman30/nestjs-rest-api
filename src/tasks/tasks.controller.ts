import { Controller, Get, Post, Delete, Put, Req, Body, UsePipes, Param} from '@nestjs/common';
import { Request } from "express";
import { TasksService } from './tasks.service';
import { CreateTasksDto, UpdateTasksDto } from "./dto/index";
import { ReqValidationPipe } from '../pipe/reqValidate.pipe';
import {createTaskSchema, deleteTaskSchema, getTaskById, getTasksByUsername, updateTasksSchema  } from './schema/index'

@Controller('task')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    async findAll(@Req() req: Request) {
        return this.tasksService.findAll();
    }    

    @Get(':id')
    @UsePipes(new ReqValidationPipe(getTaskById))
    async findById(@Param() id: number) {
        return this.tasksService.findById(id);
    }

    @Get('user/:username')
    @UsePipes(new ReqValidationPipe(getTasksByUsername))
    async findByUsername(@Param() username: string) {
        return this.tasksService.findByUsername(username);
    }

    @Post()
    @UsePipes(new ReqValidationPipe(createTaskSchema))
    async createTask(@Body() createTasksDto: CreateTasksDto) {
        return this.tasksService.create(createTasksDto);
    }

    @Delete() 
    @UsePipes(new ReqValidationPipe(deleteTaskSchema))
    async removeTaskByTaskname(@Body() id: number, @Body() username: string) {
        return this.tasksService.remove(id, username);
    }

    @Put()
    @UsePipes(new ReqValidationPipe(updateTasksSchema))
    async updateTask(@Body() updateTasksDto: UpdateTasksDto) {
        return this.tasksService.update(updateTasksDto);
    }
}
