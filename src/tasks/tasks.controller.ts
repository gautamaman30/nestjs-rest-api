import { Controller, Get, Post, Delete, Put, Req, Body, UsePipes, Param} from '@nestjs/common';
import { Request } from "express";
import { TasksService } from './tasks.service';
import { CreateTasksDto, UpdateTasksDto, DeleteTasksDto } from "./dto/index";
import { ReqValidationPipe } from '../common/pipe/reqValidate.pipe';
import {createTaskSchema, deleteTaskSchema, getTaskById, updateTasksSchema  } from './schema/index'

@Controller('task')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    async findUserTasks(@Req() req: Request) {
        return this.tasksService.findUserTasks(req.body.username);
    }    

    @Get(':id')
    @UsePipes(new ReqValidationPipe(getTaskById))
    async findUserTasksById(@Param() id: number, @Req() req: Request) {
        return this.tasksService.findUserTasksById(id, req.body.username);
    }

    @Post()
    @UsePipes(new ReqValidationPipe(createTaskSchema))
    async createTask(@Body() createTasksDto: CreateTasksDto, @Req() req: Request) {
        createTasksDto.username = req.body.username;
        return this.tasksService.create(createTasksDto);
    }

    @Delete() 
    @UsePipes(new ReqValidationPipe(deleteTaskSchema))
    async removeById(@Body() deleteTasksDto: DeleteTasksDto,  @Req() req: Request) {
        deleteTasksDto.username = req.body.username;
        return this.tasksService.remove(deleteTasksDto);
    }

    @Put()
    @UsePipes(new ReqValidationPipe(updateTasksSchema))
    async updateTask(@Body() updateTasksDto: UpdateTasksDto,  @Req() req: Request) {
        updateTasksDto.username = req.body.username;
        return this.tasksService.update(updateTasksDto);
    }
}
