import { tailed } from 'tailed-js'
import styledBy from 'styled-by'
import Loading from 'react-loading'

import { Icon } from '~/components'

const sendStateIcons = {
    'sending': (
        <Loading
            className="inline-block align-middle"
            color="#555555"
            width={30}
            height={30}
            type='bubbles'
        />
    ),
    'success': <Icon icon="check" className="inline" />,
    'error': <Icon icon="remove" className="inline" />
}

const sendStateTexts = {
    'sending': 'Enviando palpite',
    'success': 'Palpite salvo',
    'error': 'Erro ao salvar palpite'
}

const MatchCardSendStateWrapper = tailed('div')`
    mt-2
    
    ${styledBy('sendstate', {
        'success': 'text-green-600',
        'error': 'text-red-600',
    })}
`

export default function MatchCardSendState({status, sendstate}) {
    if (sendstate === 'initial' || status !== 'inprogress') {
        return null
    }
    
    return (
        <MatchCardSendStateWrapper sendstate={sendstate}>
            { sendStateIcons[sendstate] }
            <small className="align-middle">
                { sendStateTexts[sendstate] }
            </small>
        </MatchCardSendStateWrapper>
    )
}