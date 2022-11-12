import { createContext, useState } from 'react'

import authService from '~/domain/services/auth.service'

export const AuthContext = createContext([null, () => {}])

export function AuthProvider({children}) {
    const [user, setUser] = useState(authService.getCurrentUser())

    return (
        <AuthContext.Provider value={[user, setUser]}>
            {children}
        </AuthContext.Provider>
    )
}