import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '~/providers/AuthProvider'

export function AuthGuard({element, isProtectedRoute = false}) {
    const [user] = useContext(AuthContext)

    // Caso o usuário esteja logado e a rota atual não é uma 
    // rota onde o login é necessário (cadastro, login, onboarding, etc.), 
    // então o usuário é redirecionado para o dashboard
    if (user && !isProtectedRoute) {
        return <Navigate to='/dashboard' replace={true} />
    }

    // Caso o usuário esteja deslogado e a rota atual é uma 
    // rota onde o login é necessário (dashboard, classificação, etc.), 
    // então o usuário é redirecionado para o OnBoarding
    if (!user && isProtectedRoute) {
        return <Navigate to='/' replace={true} />
    }

    // Caso a rota seja para o usuário logado e ele esteja 
    // logado ou para um usuário deslogado e ele esteja 
    // deslogado, permanecerá na mesma rota
    return element
}