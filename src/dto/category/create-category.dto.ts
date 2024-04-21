import Joi from "joi";

export const categoryCreateSchema = Joi.object({
    nombre: Joi.string()
        .required()
        .min(3)
        .max(50)
        .messages({
            'string.empty': 'El nombre de la categoría no puede estar vacío.',
            'string.min': 'El nombre de la categoría debe tener al menos {#limit} caracteres.',
            'string.max': 'El nombre de la categoría no puede tener más de {#limit} caracteres.',
            'any.required': 'El nombre de la categoría es requerido.'
        })
}).options({ abortEarly: false });