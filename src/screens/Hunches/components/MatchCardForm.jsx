import { useRef } from 'react'
import { Formik, Form, Field } from 'formik'
import { tailed } from 'tailed-js'

import { Icon } from '~/components'
import { apiBaseURL } from '~/domain/constants/api'

export function HunchInputField({name, disabled}) {
    return (
        <Field
            className="bg-pink-100 disabled:bg-pink-50 disabled:border disabled:border-border text-primary disabled:text-body-text outline-none focus:border focus:border-primary-light text-center rounded-md p-4 w-14 h-14"
            disabled={disabled}
            name={name}
            type="number"
            size={2}
            maxLength={2}
            min={0}
            max={99} />
    )
}

const TeamCardWrapper = tailed('div')`
    flex
    flex-col-reverse
    items-center
    gap-2

    ${(props) => props.type === 'away' ? 'sm:flex-row-reverse' : 'sm:flex-row' }
`

export function TeamCard({team, away = false}) {
    return (
        <TeamCardWrapper type={away ? 'away' : 'home'}>
            <span>{team?.abbr ?? ''}</span>
            {
                team 
                    ? <img src={`${apiBaseURL}/flags/${team.logo}`} />
                    : <Icon icon="shield" className="w-20" />
            }
        </TeamCardWrapper>
    )
}

export function MatchCardForm({match, hunch, status, disabled, onSend}) {
    const formikRef = useRef()

    const initialValues = {
        home: hunch?.homeTeamScore ?? '',
        away: hunch?.awayTeamScore ?? ''
    }

    function onChange() {
        formikRef.current.handleSubmit()
    }

    function onSubmit(values) {
        const { home, away } = values

        // Quando o input está vazio o value é uma string vazia,
        // caso contrário, ele converte o valor do input para um number
        if (typeof(home) === 'number' && typeof(away) === 'number') {
            if (home >= 0 && away >= 0) {
                onSend(home, away, match)
            }
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            innerRef={formikRef}
            onSubmit={onSubmit}
            >
            <Form
                className="flex justify-between items-center space-x-2 mt-8"
                onChange={onChange}
                >
                <TeamCard team={match.homeTeam} />
                <HunchInputField name="home" status={status} disabled={disabled} />

                <span className="text-primary font-bold">
                    X
                </span>

                <HunchInputField name="away" status={status} disabled={disabled} />
                <TeamCard team={match.awayTeam} away={true} />
            </Form>
        </Formik>
    )
}