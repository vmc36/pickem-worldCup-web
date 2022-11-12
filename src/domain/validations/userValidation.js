import { object, string } from 'yup'

function validateName() {
    return string()
        .required('O nome é obrigatório')
        .min(3, ({min}) => `O nome deve ter pelo menos ${min} caracteres`)
}

function validateUserName() {
    return string()
        .required('O nome de usuário é obrigatório')
        .min(3, ({min}) => `O nome de usuário deve ter pelo menos ${min} caracteres`)
        .matches(/^[a-zA-ZÀ-Úà-ú0-9_]+$/gu, 'O nome de usuário deve ter apenas letras, números e underline')
}

function validateEmail() {
    return string()
        .required('O e-mail é obrigatório')
        .email('Insira um e-mail válido')
}

function validatePassword() {
    return string()
        .required('A senha é obrigatória')
        .min(6, ({min}) => `A senha deve ter pelo menos ${min} caracteres`)
}

export function createSignUpValidation() {
    const schema = object({
        name: validateName(),
        username: validateUserName(),
        email: validateEmail(),
        password: validatePassword()
    })

    return schema
}

export function createLoginValidation() {
    const schema = object({
        email: validateEmail(),
        password: validatePassword()
    })

    return schema
}