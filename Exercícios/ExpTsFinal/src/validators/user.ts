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
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'A senha é obrigatória.',
        'string.min': 'A senha deve ter no mínimo 6 caracteres.'
    }),
    repassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'As senhas não coincidem.',
        'string.empty': 'A confirmação de senha é obrigatória.'
    }) 
});

export const userUpdateSchema = Joi.object({
  fullname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  majorId: Joi.string().required()
});
