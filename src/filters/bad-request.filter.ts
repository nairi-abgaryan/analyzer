import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { STATUS_CODES } from 'http';
import * as _ from 'lodash';

@Catch(BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(public reflector: Reflector) {}

    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        let statusCode = exception.getStatus();
        const r = <any>exception.getResponse();

        if (_.isArray(r.message) && r.message[0] instanceof ValidationError) {
            statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
            const validationErrors = <ValidationError[]>r.message;
            this.validationFilter(validationErrors);
        }

        r.statusCode = statusCode;
        r.error = STATUS_CODES[statusCode];

        response.status(statusCode).json(r);
    }

    private async validationFilter(validationErrors: ValidationError[]) {
        await Promise.all(
            validationErrors.map((validationError: ValidationError) => {
            Object.entries(validationError.constraints).forEach(([constraintKey, constraint]) => {
                if (constraint) {

                    validationError.constraints[constraintKey] = `error.fields.${  _.snakeCase(constraintKey)}`;
                    return validationError ;
                }
                return null;
            });

            if (!_.isEmpty(validationError.children)) {
                this.validationFilter(validationError.children);
            }

            return null;
        }))
    }
}
