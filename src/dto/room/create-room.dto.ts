import Joi from 'joi';


export class CreateRoomDto {
    name: string;
    state: string;
    idCategory: number;
}

export const createRoomSchema = Joi.object({
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
        .valid('Sin iniciar', 'En curso', 'Finalizado')
        .messages({
            'string.empty': 'Room state cannot be empty.',
            'any.only': 'Room state must be either "Sin iniciar", "En curso" or "Finalizado".',
            'any.required': 'Room state is required.'
        }),
    idCategory: Joi.number()
        .required()
        .messages({
            'string.empty': 'Category id cannot be empty.',
            'any.required': 'Category id is required.'
        })
}).options({ abortEarly: false });
