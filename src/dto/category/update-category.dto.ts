import Joi from "joi";

export const categoryUpdateSchema = Joi.object({
    id: Joi.string()
        .required()
        .messages({
            'string.empty': 'El ID de la categoría no puede estar vacío.',
            'any.required': 'El ID de la categoría es requerido.'
        }),
    nombre: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': 'El nombre de la categoría debe tener al menos {#limit} caracteres.',
            'string.max': 'El nombre de la categoría no puede tener más de {#limit} caracteres.',
            'any.required': 'El nombre de la categoría es requerido.'
        })
}).options({ abortEarly: false });