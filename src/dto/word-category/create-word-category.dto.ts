import Joi from 'joi';


export class CreateWordCategoryDto {
    idWord: number;
    idCategory: string;
}

export const wordCategoryCreateSchema = Joi.object({
    idWord: Joi.number()
        .required()
        .messages({
            'string.empty': 'Word id cannot be empty.',
            'any.required': 'Word id is required.'
        }),
    idCategory: Joi.string()
        .required()
        .messages({
            'string.empty': 'Category id cannot be empty.',
            'any.required': 'Category id is required.'
        })
}).options({ abortEarly: false });