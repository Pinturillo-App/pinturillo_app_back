import Joi from 'joi';


export class CreateCategoryDto {
    name: string;
}

export const createCategorySchema = Joi.object({
    name: Joi.string()
        .required()
        .min(3)
        .max(50)
        .messages({
            'string.empty': 'Category name cannot be empty.',
            'string.min': 'Category name must be at least {#limit} characters long.',
            'string.max': 'Category name cannot exceed {#limit} characters.',
            'any.required': 'Category name is required.'
        })        
}).options({ abortEarly: false });