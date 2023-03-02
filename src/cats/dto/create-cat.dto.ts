import * as Joi from 'joi';

export class CreateCatDto {
    name: string;
    age: number;
    breed: string;
    id: number;
}

export const createCatSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    breed: Joi.string().required(),
});
