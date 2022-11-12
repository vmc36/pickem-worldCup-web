import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import ReactLoading from 'react-loading'
import { ReactComponent as NoMatchImage } from '~/assets/images/illustrations/error-in-calendar.svg'

import { AppBar, ErrorAlert } from '~/components'
import { MatchCard } from './components/MatchCard'
import { MatchPagination } from './components/MatchPagination'
import { useFetch } from '~/hooks'
import { AuthContext } from '~/providers/AuthProvider'

import { hunchesApi, matchesApi } from '~/domain/api'

function HunchesContent({matches, hunches, isLoading, error, disabled}) {
    if (error) {
        return (
            <ErrorAlert
                error={error.message ?? 'Ocorreu um erro ao carregar os palpites'}
            />
        )
    }

    if (isLoading) {
        return <ReactLoading className="m-auto" type="bars" color="#AF053F" />
    }

    if (matches.length === 0) {
        return (
            <div>
                <p className="font-bold text-lg text-gray-400">
                    Não há jogos nesta data
                </p>
                <NoMatchImage className="w-96 m-auto" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 mt-8 pb-8">
            {
                matches.map(match => (
                    <MatchCard
                        key={match.id}
                        match={match}
                        hunch={hunches[match.id]}
                        disabled={disabled}
                    />
                ))
            }
        </div>
    )
}

export function HunchesScreen() {
    const { username } = useParams()
    const isUserProfile = !username
    const [user] = useContext(AuthContext)
    
    const [state, isLoading, error, fetch] = useFetch({})
    
    async function fetchMatches(matchDate) {
        const matchesResult = await matchesApi.getMatches(matchDate)
        const { hunches } = await hunchesApi.getHunches(username ?? user.username, matchDate)

        const hunchesMap = hunches.reduce((acc, hunch) => {
            acc[hunch.matchId] = hunch
            return acc
        }, {})
        
        return {
            hunches: hunchesMap,
            matches: matchesResult
        }
    }

    function onDateChanged(date) {
        fetch(async () => await fetchMatches(date))
    }

    return (
        <>
            <AppBar title={ isUserProfile ? 'Seus palpites' : username } />
            <main className="min-h-fit px-2 max-w-2xl container my-8 text-center">
                {
                    !error &&
                    <MatchPagination isLoading={isLoading} onDateChanged={onDateChanged} />
                }
                <HunchesContent
                    matches={state.matches ?? []}
                    hunches={state.hunches ?? []}
                    isLoading={isLoading}
                    error={error}
                    disabled={!isUserProfile}
                />
            </main>
        </>
    )
}