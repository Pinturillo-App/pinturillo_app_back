import Joi from "joi";

export const wordUpdateSchema = Joi.object({
    id: Joi.string()
        .required()
        .messages({
            'string.empty': 'Category Word cannot be empty.',
            'any.required': 'Category Word is required.'
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