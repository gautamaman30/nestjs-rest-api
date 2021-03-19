import { Controller, Get, Post, Delete, Put, Req, Body, UsePipes, Param} from '@nestjs/common';
import { Request } from "express";
import { UsersService } from './users.service';
import { CreateUsersDto, UpdateUsersDto, LoginUsersDto } from "./dto/index";
import { ReqValidationPipe } from '../common/pipe/reqValidate.pipe';
import { createUserSchema, getUsersByUsernameSchema, updateUserSchema, deleteUsersSchema, loginUserSchema} from './schema/index'

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findUser(@Req() req: Request) {
        return this.usersService.findByUsername(req.body.username);
    }

    @Post('login')
    @UsePipes(new ReqValidationPipe(loginUserSchema))
    async loginUser(@Body() loginUsersDto: LoginUsersDto) {
        return this.usersService.loginUser(loginUsersDto);
    }

    @Post()
    @UsePipes(new ReqValidationPipe(createUserSchema))
    async createUser(@Body() createUsersDto: CreateUsersDto) {
        return this.usersService.create(createUsersDto);
    }

    @Delete() 
    async removeUser(@Req() req: Request) {
        return this.usersService.remove(req.body.username);
    }

    @Put()
    @UsePipes(new ReqValidationPipe(updateUserSchema))
    async updateUser(@Body() updateUsersDto: UpdateUsersDto) {
        return this.usersService.update(updateUsersDto);
    }
}
