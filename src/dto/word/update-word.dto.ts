import Joi from 'joi';


export class UpdateWordDto {
    id: number;
    text: string;
}

export const updateWordSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Word id must be a number.',
            'number.integer': 'Word id must be an integer.',
            'number.positive': 'Word id must be a positive number.',
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