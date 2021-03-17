import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ReqValidationPipe implements PipeTransform {
    constructor(private schema) {}

    async transform(value: any) {
        try { 
            const result = await this.schema.validate(value);
            return result;
        } catch(err) {
            console.log(err);
            throw new BadRequestException(err.message);
        }
    }
}