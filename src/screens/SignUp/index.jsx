import { useContext } from 'react'
import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '~/providers/AuthProvider'
import AuthLayout from '~/layouts/AuthLayout'
import { Button, TextField } from '~/components'

import authService from '~/domain/services/auth.service'
import { createSignUpValidation } from '~/domain/validations/userValidation'

export function SignUpScreen() {
    const [, setUser] = useContext(AuthContext)

    const navigate = useNavigate()

    const initialValues = {
        name: '',
        username: '',
        email: '',
        password: ''
    }

    function onSubmit(values, {setSubmitting}) {
        authService.createUser(values)
            .then(user => {
                setUser(user)
                navigate('/dashboard')
            })
            .finally(() => setSubmitting(false))
    }

    return (
        <AuthLayout title="Crie sua conta">
            <Formik
                initialValues={initialValues}
                validationSchema={createSignUpValidation}
                onSubmit={onSubmit}>
                {({isSubmitting}) => (
                    <Form className="flex flex-col gap-4">
                        <TextField
                            label="Seu nome"
                            type="text"
                            name="name"
                            id="name" />
                        <TextField
                            label="Seu nome de usuário"
                            type="text"
                            name="username"
                            id="username" />
                        <TextField
                            label="Seu e-mail"
                            type="email"
                            name="email"
                            id="email" />
                        <TextField
                            label="Sua senha"
                            type="password"
                            name="password"
                            id="password" />
                        <Button styleType="primary" type="submit" disabled={isSubmitting}>
                            { isSubmitting ? 'Criando conta...' : 'Criar minha conta' }
                        </Button>
                    </Form>
                )}
            </Formik>
        </AuthLayout>
    )
}