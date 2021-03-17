import { Controller, Get, Post, Delete, Put, Req, Body, UsePipes, Param} from '@nestjs/common';
import { Request } from "express";
import { UsersService } from './users.service';
import { CreateUsersDto, UpdateUsersDto } from "./dto/index";
import { ReqValidationPipe } from '../pipe/reqValidate.pipe';
import { createUserSchema, getUsersByUsernameSchema, updateUserSchema, deleteUsersByUsernameSchema} from './schema/index'

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findAll(@Req() req: Request) {
        return this.usersService.findAll();
    }

    @Get(':username')
    @UsePipes(new ReqValidationPipe(getUsersByUsernameSchema))
    async findByUsername(@Param() username: string) {
        return this.usersService.findByUsername(username);
    }

    @Post()
    @UsePipes(new ReqValidationPipe(createUserSchema))
    async createUser(@Body() createUsersDto: CreateUsersDto) {
        return this.usersService.create(createUsersDto);
    }

    @Delete() 
    @UsePipes(new ReqValidationPipe(deleteUsersByUsernameSchema))
    async removeUserByUsername(@Body() username: string) {
        return this.usersService.remove(username);
    }

    @Put()
    @UsePipes(new ReqValidationPipe(updateUserSchema))
    async updateUser(@Body() updateUsersDto: UpdateUsersDto) {
        return this.usersService.update(updateUsersDto);
    }
}
