import { useContext, useEffect } from 'react'
import ReactLoading from 'react-loading'

import { ReactComponent as NoDataIllustration } from '~/assets/images/illustrations/no_data.svg'
import { LeaderboardRow, LeaderboardRowDivider } from './components/LeaderboardRow'
import { AppBar, ErrorAlert } from '~/components'
import { useFetch } from '~/hooks'
import { AuthContext } from '~/providers/AuthProvider'

import { leaderboardApi } from '~/domain/api'

function LeaderboardContent() {
    const [state, isLoading, error, fetch] = useFetch({})
    const [user] = useContext(AuthContext)

    async function fetchLeaderboard() {
        const scoresLimit = 10

        const scoresResult = await leaderboardApi.getLeaderboard()
        const userScoreIndex = scoresResult
            .findIndex(score => score.user.username === user.username)

        const limitedScores = scoresResult.slice(0, scoresLimit)

        let userScorePosition = -1
        
        // Se o usuário não estiver entre os 10 primeiros
        // adiciona-o ao final da lista
        if (userScoreIndex >= limitedScores.length) {

            // Adiciona uma separação entre os demais itens e 
            // o item do usuário, pois a sua posição não está 
            // na sequência da lista.
            // Exemplo:
            // O último item da lista é o 10 e a posição 
            // do usuário é o 15
            if (userScoreIndex > limitedScores.length) {
                limitedScores.push({type: 'divider'})
            }

            const userScore = scoresResult[userScoreIndex]
            userScorePosition = userScore.position
            limitedScores.push(userScore)
        }
        
        return {
            userScorePosition,
            scores: limitedScores
        }
    }

    useEffect(() => {
        fetch(fetchLeaderboard)
    }, [])

    if (error) {
        return (
            <ErrorAlert
                error={error.message ?? 'Erro ao carregar a classificação'}
            />
        )
    }

    if (isLoading) {
        return <ReactLoading className="m-auto" type="bars" color="#AF053F" />
    }

    if (state.scores?.length === 0) {
        return (
            <div>
                <p className="font-bold text-lg text-gray-400">
                    Ainda não há classificação
                </p>
                <NoDataIllustration className="mt-4 h-56 m-auto w-full" />
            </div>
        )
    }

    return (
        <table cellPadding={8} className="w-full mb-8">
            <thead>
                <tr>
                    <th title="Classificação">#</th>
                    <th title="Usuário">Usuário</th>
                    <th title="Pontuação">Pontuação</th>
                    <th title="Aproveitamento">Aproveitamento</th>
                    <th title="Opções"></th>
                </tr>
            </thead>
            <tbody className="border border-slate-200 rounded-md">
                {
                    state.scores?.map(score => {
                        if (score.type === 'divider') {
                            return <LeaderboardRowDivider />
                        }

                        return (
                            <LeaderboardRow
                                key={score.user.username ?? score.type}
                                score={score}
                                isCurrentUser={score.position === state?.userScorePosition}
                            />
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export function LeaderboardScreen() {
    return (
        <>
            <AppBar title="Classificação" />
            <main className="px-2 max-w-2xl container my-8 text-center overflow-x-auto">
                <LeaderboardContent />
            </main>
        </>
    )
}