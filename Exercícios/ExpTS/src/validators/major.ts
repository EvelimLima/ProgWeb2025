//validators/major.ts

import Joi from 'joi';

export const majorSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.empty': 'O nome é obrigatório.',
        'string.min': 'O nome deve ter no mínimo 3 caracteres.'
    }),
    code: Joi.string().length(4).required().messages({
        'string.empty': 'O código é obrigatório.',
        'string.length': 'O código deve ter exatamente 4 caracteres.'
    }),
    description: Joi.string().allow('').optional()
});
