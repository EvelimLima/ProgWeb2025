import Joi from 'joi';

export const userSchema = Joi.object({
    fullname: Joi.string().min(3).required().messages({
        'string.empty': 'O nome completo é obrigatório.',
        'string.min': 'O nome deve ter no mínimo 3 caracteres.'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'O e-mail é obrigatório.',
        'string.email': 'Formato de e-mail inválido.'
    }),
    majorId: Joi.string().required().messages({
        'string.empty': 'O curso é obrigatório.'
    })
});
