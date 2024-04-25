import Joi from 'joi';


export class UpdateWordDto {
    id: number;
    text: string;
}

export const updateWordSchema = Joi.object({
    id: Joi.number()
        .required()
        .messages({
            'string.empty': 'Word id cannot be empty.',
            'any.required': 'Word id is required.'
        }),
    text: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': 'Word must be at least {#limit} characters long.',
            'string.max': 'Word cannot exceed {#limit} characters.',
            'any.required': 'Word is required.' 
        })        
}).options({ abortEarly: false });