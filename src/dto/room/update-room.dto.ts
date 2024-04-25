import Joi from 'joi';


export class UpdateRoomDto {
    id: number;
    name: string;
    state: string;
    idCategory: string;
}

export const roomUpdateSchema = Joi.object({
    id: Joi.number()
        .required()
        .messages({
            'string.empty': 'Room id cannot be empty.',
            'any.required': 'Room id is required.'
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
        .valid('Sin iniciar', 'En curso', 'Finalizado')
        .messages({
            'string.empty': 'Room state cannot be empty.',
            'any.only': 'Room state must be either "Sin iniciar", "En curso" or "Finalizado".',
            'any.required': 'Room state is required.'
        }),
    idCategory: Joi.string()
        .optional()
        .messages({
            'string.empty': 'Category id cannot be empty.'
        })
}).options({ abortEarly: false });
