import { Link } from 'react-router-dom'

import NaTraveLogo from '~/assets/images/logo/logo-fundo-branco.svg'
import { Icon } from '~/components'

export default function AuthLayout({title, children}) {
    return (
        <>
            <header className="w-full p-6 border-b border-primary-light">
                <img
                    className="w-20 md:w-36 m-auto"
                    src={NaTraveLogo}
                    alt="Logo do site" />
            </header>
            <main className="max-w-2xl mx-8 md:mx-auto pb-4">
                <Link to="/" aria-label="Voltar à página inicial">
                    <Icon icon="back" className="inline mr-4 text-primary" />
                </Link>
                <h1 className="my-8 inline-block text-2xl text-primary-dark font-bold align-middle">
                    {title}
                </h1>
                {children}
            </main>
        </>
    )
}