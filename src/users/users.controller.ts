import { Controller, Get, Post, Delete, Put, Req, Body, UsePipes, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUsersDto, UpdateUsersDto, LoginUsersDto } from "./dto/index";
import { ReqValidationPipe } from '../common/pipe/reqValidate.pipe';
import { createUserSchema, updateUserSchema, loginUserSchema} from './validationSchema/index'

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findUser(@Req() req) {
        return this.usersService.findByUsername(req.user.username);
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
    @UseGuards(AuthGuard('jwt'))
    async removeUser(@Req() req) {
        return this.usersService.remove(req.user.username);
    }

    @Put()
    @UsePipes(new ReqValidationPipe(updateUserSchema))
    @UseGuards(AuthGuard('jwt'))
    async updateUser(@Body() updateUsersDto: UpdateUsersDto) {
        return this.usersService.update(updateUsersDto);
    }
}
