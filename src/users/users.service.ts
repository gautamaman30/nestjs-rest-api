import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from 'typeorm';
import { Users } from "./entity/users.entity";
import { CreateUsersDto, GetUsersDto, UpdateUsersDto, LoginUsersDto } from "./dto/index";
import { Errors, Messages, helperFunctions } from '../common/utils/index';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}

    async findByUsername(username: string) {
        try {
            let result = await this.usersRepository.findOne(username);
            if(!result) {
                return new HttpException(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            return new GetUsersDto(result);
        } catch(err) {
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        } 
    }

    async create(createUsersDto: CreateUsersDto) {
        try {
            const hashedPassword = await helperFunctions.hashPassword(createUsersDto.password);
            if(hashedPassword instanceof HttpException) {
                return hashedPassword;
            }
            createUsersDto.password = hashedPassword;
            const result = await this.usersRepository.insert(createUsersDto);

            const token = await helperFunctions.signToken({username: createUsersDto.username});
            return {message: Messages.USER_CREATED_SUCCESSFULLY, token};
        } catch(err) {
            console.log(err.message);
            if(err instanceof QueryFailedError) {
                return new HttpException(Errors.USERNAME_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
            }
            return new HttpException(Errors.INTERNAL_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async loginUser(loginUsersDto: LoginUsersDto) {
        try {
            const user = await this.usersRepository.findOne({username: loginUsersDto.username});
            if(!user) {
                return new HttpException(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            const result = await helperFunctions.comparePassword(loginUsersDto.password, user.password);
            if(!result) {
                return new HttpException(Errors.INCORRECT_PASSWORD, HttpStatus.BAD_REQUEST);
            }
            const token = await helperFunctions.signToken({username: loginUsersDto.username});
            return {message: Messages.USER_LOGGED_IN_SUCCESSFULLY, token};
        } catch(err) {
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(username: string) {
        try {
            const result = await this.usersRepository.delete(username);
            if(result.affected === 0) {
                return new HttpException(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            return {message: Messages.USER_DELETED_SUCCESSFULLY};
        } catch(err) {
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(updateUsersDto: UpdateUsersDto) {
        try {
            let updateDoc: any = {};
            if(updateUsersDto.first_name) updateDoc.first_name = updateUsersDto.first_name;
            if(updateUsersDto.last_name) updateDoc.last_name = updateUsersDto.last_name;
            if(updateUsersDto.title) updateDoc.title = updateUsersDto.title;

            if(Object.keys(updateDoc).length === 0) {
                return new HttpException(Errors.USER_UPDATE_FIELDS_REQUIRED, HttpStatus.BAD_REQUEST);  
            }
                
            const result = await this.usersRepository.update({username: updateUsersDto.username}, updateDoc);
            if(result.affected === 0) {
                return new HttpException(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            return {message: Messages.USER_UPDATED_SUCCESSFULLY}
        } catch(err) {
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
