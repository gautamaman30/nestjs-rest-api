import { Controller, Get, Post, Delete, Put, Req, Body, UsePipes, Param, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateTasksDto, UpdateTasksDto, DeleteTasksDto } from "./dto/index";
import { ReqValidationPipe } from '../common/pipe/reqValidate.pipe';
import {createTaskSchema, deleteTaskSchema, getTaskById, updateTasksSchema  } from './validationSchema/index'

@Controller('task')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    async findUserTasks(@Req() req) {
        return this.tasksService.findUserTasks(req.user.username);
    }    

    @Get(':id')
    @UsePipes(new ReqValidationPipe(getTaskById))
    async findUserTasksById(@Param() id: number, @Req() req) {
        return this.tasksService.findUserTasksById(id, req.user.username);
    }

    @Post()
    @UsePipes(new ReqValidationPipe(createTaskSchema))
    async createTask(@Body() createTasksDto: CreateTasksDto, @Req() req) {
        createTasksDto.username = req.user.username;
        return this.tasksService.create(createTasksDto);
    }

    @Delete() 
    @UsePipes(new ReqValidationPipe(deleteTaskSchema))
    async removeById(@Body() deleteTasksDto: DeleteTasksDto,  @Req() req) {
        deleteTasksDto.username = req.user.username;
        return this.tasksService.remove(deleteTasksDto);
    }

    @Put()
    @UsePipes(new ReqValidationPipe(updateTasksSchema))
    async updateTask(@Body() updateTasksDto: UpdateTasksDto,  @Req() req) {
        updateTasksDto.username = req.user.username;
        return this.tasksService.update(updateTasksDto);
    }
}
