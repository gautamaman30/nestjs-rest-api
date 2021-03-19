import { Injectable, NestMiddleware, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {verify, Secret} from 'jsonwebtoken';
import {Errors} from '../utils/index';
import {configObj} from '../configEnv';
 
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(@Req() req: Request,@Res() res: Response,@Next() next: NextFunction) {
        let token;

        if(req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }

        verify(token, <Secret>configObj.SECRET_KEY, function(err, result) {
            if(err){
                console.log(err.message);
                res.status(401);
                res.send({error: Errors.AUTHORIZATION_FAILED});
            }
            if(result){
                req.body.username = result.username;
                return next();
            }
        });
    }
}