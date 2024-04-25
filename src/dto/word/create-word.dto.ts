import Joi from 'joi';


export class CreateWordDto {
    text: string;
}

export const createWordSchema = Joi.object({
    text: Joi.string()
        .required()
        .min(3)
        .max(50)
        .messages({
            'string.empty': 'Word cannot be empty.',
            'string.min': 'Word must be at least {#limit} characters long.',
            'string.max': 'Word cannot exceed {#limit} characters.',
            'any.required': 'Word is required.'
        })        
}).options({ abortEarly: false });