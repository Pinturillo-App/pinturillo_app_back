import Joi from "joi";

export const roomCreateSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Room name cannot be empty.',
            'string.min': 'Room name must be at least {#limit} characters long.',
            'string.max': 'Room name cannot exceed {#limit} characters.',
            'any.required': 'Room name is required.'
        }),
    state: Joi.string()
        .required()
        .valid('Sin Iniciar', 'En Curso', 'Finalizado')
        .messages({
            'string.empty': 'Room state cannot be empty.',
            'any.only': 'Room state must be either "Sin Iniciar", "En Curso" or "Finalizado".',
            'any.required': 'Room state is required.'
        }),
    idCategory: Joi.string()
        .required()
        .messages({
            'string.empty': 'Category ID cannot be empty.',
            'any.required': 'Category ID is required.'
        })
}).options({ abortEarly: false });
