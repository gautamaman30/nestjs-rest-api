import {hash, compare} from "bcrypt";
import {Errors, StatusCodes} from "./index";
import { HttpException } from '@nestjs/common';

export class HelperFunctions{

    async hashPassword(password){
        try{
            const saltRounds = 10;
            const hashedPassword = await hash(password, saltRounds);
            if(hashedPassword) return hashedPassword;
        } catch(err){
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async comparePassword(password, hashedPassword){
        try{
            const result = await compare(password, hashedPassword);
            if(result) return true;
            else return false;
        } catch(err){
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}   