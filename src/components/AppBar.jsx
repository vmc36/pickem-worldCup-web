import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '~/providers/AuthProvider'
import NaTraveLogo from '~/assets/images/logo/logo-fundo-vermelho.svg'
import { Icon } from '~/components'

import authService from '~/domain/services/auth.service'

function AppBarProfile({user, setUser}) {
    const navigate = useNavigate()
    
    function signOut() {
        authService.signOut()
        setUser(null)
        navigate('/')
    }

    return (
        <div>
            <Link to={`/u/${user.username}`}>
                <Icon icon="profile" className="inline mr-4" />
            </Link>
            <button
                className="align-middle font-bold"
                onClick={signOut}>
                Sair
            </button>
        </div>
    )
}

function AppBarMenu() {
    return (
        <nav className="mt-4">
            <ul className="flex space-x-4 font-bold">
                <li>
                    <Link to="/dashboard">
                        Palpites
                    </Link>
                </li>
                <li>
                    <Link to="/leaderboard">
                        Classificação
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export function AppBar({title}) {
    const [user, setUser] = useContext(AuthContext)
    
    return (
        <header className="w-full p-6 bg-primary text-on-primary">
            <div className="max-w-2xl container">
                <div className="flex justify-between mb-16 md:mb-8">
                    <Link to={user ? '/dashboard' : '/'}>
                        <img
                            className="w-20 md:w-24"
                            src={NaTraveLogo}
                            alt="Logo do site" />
                    </Link>
                    { user && <AppBarProfile user={user} setUser={setUser} /> }
                </div>
                { user && <small>Olá, {user?.name}!</small> }
                <h1 className="font-bold text-2xl">
                    {title}
                </h1>
                { user && <AppBarMenu /> }
            </div>
        </header>
    )
}