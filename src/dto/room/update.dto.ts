import Joi from "joi";

export const roomUpdateSchema = Joi.object({
    id: Joi.string()
        .required()
        .messages({
            'string.empty': 'Room ID cannot be empty.',
            'any.required': 'Room ID is required.'
        }),
    name: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            'string.min': 'Room name must be at least {#limit} characters long.',
            'string.max': 'Room name cannot exceed {#limit} characters.'
        }),
    state: Joi.string()
        .optional()
        .valid('Sin Iniciar', 'En Curso', 'Finalizado')
        .messages({
            'string.empty': 'Room state cannot be empty.',
            'any.only': 'Room state must be either "Sin Iniciar", "En Curso" or "Finalizado".',
            'any.required': 'Room state is required.'
        }),
    idCategory: Joi.string()
        .optional()
        .messages({
            'string.empty': 'Category ID cannot be empty.'
        })
}).options({ abortEarly: false });
