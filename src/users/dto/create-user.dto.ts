import * as Joi from 'joi';

export class RegisterUserDto {
    username: string;
    password: string;
    id: number;
    roles: string[];
}

export const registerUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    roles: Joi.array().items(Joi.string().valid('admin', 'user')).required(),
});
