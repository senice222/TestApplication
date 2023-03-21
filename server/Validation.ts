import {body} from 'express-validator'

export const registerValidation = [
    body('fullName', 'Некоректное имя').isLength({min: 3}),
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Некоректное пароль').isLength({min: 5}),
    body('avatarUrl', 'Неудалось загрузить фото').optional()
]
export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Некоректное пароль').isLength({min: 5}),
]


