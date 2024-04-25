import Joi from 'joi';


export class UpdateCategoryDto {
    id: number;
    name: string;
}

export const categoryUpdateSchema = Joi.object({
    id: Joi.number()
        .required()
        .messages({
            'string.empty': 'Category id cannot be empty.',
            'any.required': 'Category id is required.'
        }),
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': 'Category name must be at least {#limit} characters long.',
            'string.max': 'Category name cannot exceed {#limit} characters.',
            'any.required': 'Category name is required.'
        })        
}).options({ abortEarly: false });