import Joi from "joi";

export const wordCategoryCreateSchema = Joi.object({
    idWord: Joi.string()
        .required()
        .messages({
            'string.empty': 'Word ID cannot be empty.',
            'any.required': 'Word ID is required.'
        }),
    idCategory: Joi.string()
        .required()
        .messages({
            'string.empty': 'Category ID cannot be empty.',
            'any.required': 'Category ID is required.'
        })
}).options({ abortEarly: false });