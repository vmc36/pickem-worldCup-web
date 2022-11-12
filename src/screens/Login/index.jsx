import { useContext } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '~/providers/AuthProvider'
import AuthLayout from '~/layouts/AuthLayout'
import { Button, TextField } from '~/components'

import authService from '~/domain/services/auth.service'
import { createLoginValidation } from '~/domain/validations/userValidation'

export function LoginScreen() {
    const [, setUser] = useContext(AuthContext)
    
    const navigate = useNavigate()

    const initialValues = {
        email: '',
        password: ''
    }

    function onSubmit(values, {setSubmitting}) {
        authService.login(values.email, values.password)
            .then(user => {
                setUser(user)
                navigate('/dashboard')
            })
            .finally(() => setSubmitting(false))
    }
    
    return (
        <AuthLayout title="Entre na sua conta">
            <Formik
                initialValues={initialValues}
                validationSchema={createLoginValidation}
                onSubmit={onSubmit}>
                {({isSubmitting}) => (
                    <Form className="flex flex-col gap-4">
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
                            {
                                isSubmitting
                                    ? 'Entrando na conta...'
                                    : 'Entrar na minha conta'
                            }
                        </Button>
                    </Form>
                )}
            </Formik>
        </AuthLayout>
    )
}