import { Link } from 'react-router-dom'

import NaTraveLogo from '~/assets/images/logo/logo-fundo-vinho.svg'
import OnBoardingImage from '~/assets/images/imagem/img.png'
import { Button } from '~/components'

export function OnBoardingScreen() {
    return (
        <main className="min-h-full bg-primary-dark text-on-primary flex flex-col p-5 pb-8 md:px-24">
            <img
                className="mx-auto my-8 w-20 md:w-24"
                src={NaTraveLogo}
                alt="Logo do site" />
                
            <div className="flex-1 flex flex-col sm:flex-row gap-8 md:gap-20 items-center md:justify-evenly">
                <img
                    className="w-full sm:w-2/5 md:max-w-3xl"
                    src={OnBoardingImage}
                    alt="Torcedores da Seleção Brasileira" />

                <section className="flex-1 flex flex-col gap-4 max-w-lg">
                    <h1 className="text-3xl md:text-5xl text-center md:text-start font-bold mb-4">
                        Dê o seu palpite na Copa do Mundo do Catar 2022!
                    </h1>

                    <Link to="/auth/signup">
                        <Button styleType="on-primary">
                            Criar minha conta
                        </Button>
                    </Link>

                    <Link to="/auth/signin">
                        <Button styleType="on-primary-outlined">
                            Fazer login
                        </Button>
                    </Link>
                </section>
            </div>
        </main>
    )
}