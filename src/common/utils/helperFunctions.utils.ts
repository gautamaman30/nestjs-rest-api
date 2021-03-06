import { HttpException, HttpStatus } from '@nestjs/common';
import {hash, compare} from "bcrypt";
import {Errors} from "./index";
import {sign, Secret} from 'jsonwebtoken'
import {configObj} from '../configEnv';

export class HelperFunctions{

    async hashPassword(password: string){
        try{
            const saltRounds = 10;
            const hashedPassword = await hash(password, saltRounds);
            if(hashedPassword) return hashedPassword;
        } catch(err){
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async comparePassword(password: string, hashedPassword: string){
        try{
            const result = await compare(password, hashedPassword);
            if(result) return true;
            else return false;
        } catch(err){
            console.log(err.message);
            return new HttpException(Errors.INTERNAL_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    signToken(payload) {
        const signOptions: any = {
            issuer: configObj.JWT_TOKEN_ISSUER,
            expiresIn: configObj.JWT_TOKEN_EXPIRES_IN,
            algorithm: configObj.JWT_TOKEN_ALGORITHM
        }
        return new Promise((resolve, reject) => {
            sign(payload, <Secret>configObj.SECRET_KEY , signOptions , function(err, token) {
                if(err){
                    console.log(err.message);
                    reject(Errors.INTERNAL_ERROR);
                }
                if(token){
                    console.log(token);
                    resolve(token);
                }
            });
        });
    }
}   