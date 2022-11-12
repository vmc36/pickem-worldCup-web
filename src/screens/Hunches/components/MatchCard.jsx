import { useState } from 'react'
import { tail, tailed } from 'tailed-js'
import styledBy from 'styled-by'

import MatchCardSendState from './MatchCardSendState'
import { MatchCardForm } from './MatchCardForm'

import { formatTimeTitle } from '~/domain/utils/dateUtils'
import { hunchesApi } from '~/domain/api'

function getCardStatus(match, hunch) {
    // Quando o jogo já terminou e o resultado já foi cadastrado
    // no banco de dados
    const gameFinished = 
        match.homeTeamScore !== null && 
        match.awayTeamScore !== null

    if (gameFinished) {
        return hunch?.won ? 'win' : 'lose'
    }

    return 'inprogress'
}

const HunchStatusWrapper = tailed('div')`
    font-bold

    ${styledBy('status', {
        'inprogress': 'hidden',
        'lose': 'text-red-700',
        'win': 'text-green-700'
    })}
`

function HunchStatus({status}) {
    if (status === 'inprogress') {
        return null
    }

    return (
        <HunchStatusWrapper status={status}>
            { status === 'win' ? 'Acertou' : 'Errou'}
        </HunchStatusWrapper>
    )
}

const MatchCardWrapper = tailed('article')`
    rounded-2xl
    p-6
    border
    text-center
    text-body-text-2

    ${styledBy('status', {
        'inprogress': 'border-border',
        'lose': 'bg-red-100 border-red-500',
        'win': 'bg-green-100 border-green-500'
    })}
`

export function MatchCard({match, hunch, disabled}) {
    const status = getCardStatus(match, hunch)
    const teamsAreDefined = match.homeTeam && match.awayTeam
    
    const [ sendState, setSendState ] = useState('initial')

    function sendHunch(homeScore, awayScore, match) {
        setSendState('sending')
        hunchesApi
            .sendHunch(match.id, homeScore, awayScore)
            .then(() => setSendState('success'))
            .catch(() => setSendState('error'))
    }

    return (
        <MatchCardWrapper status={status}>
            <header>
                <HunchStatus status={status} />
                <h2 className="font-bold first-letter:text-lg">
                    { match.stage }
                    {' '}
                    { !teamsAreDefined && '(A definir)' }
                </h2>
                <time dateTime={match.datetime}>
                    {formatTimeTitle(match.datetime)}
                </time>
            </header>
            
            <MatchCardForm
                match={match}
                hunch={hunch}
                status={status}
                onSend={sendHunch}
                disabled={disabled || status !== 'inprogress' || !teamsAreDefined}
            />

            <footer>
                <MatchCardSendState status={status} sendstate={sendState} />
            </footer>
        </MatchCardWrapper>
    )
}