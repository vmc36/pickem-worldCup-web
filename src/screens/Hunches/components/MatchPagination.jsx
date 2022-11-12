import { useEffect, useState } from 'react'

import { Button, Icon } from '~/components'

import {
    getDateTitle,
    getInitialMatchesDate,
    getNextDate,
    getPreviousDate
} from '~/domain/utils/dateUtils'

export function MatchPagination({isLoading, onDateChanged}) {
    const [date, setDate] = useState(getInitialMatchesDate())

    useEffect(() => {
        onDateChanged(date)
    }, [])

    function toPreviousScheduling() {
        updateDate(getPreviousDate(date))
    }

    function toNextScheduling() {
        updateDate(getNextDate(date))
    }

    function updateDate(newDate) {
        setDate(newDate)
        onDateChanged(newDate)
    }

    return (
        <nav>
            <Button
                styleType="primary-link"
                disabled={isLoading}
                onClick={toPreviousScheduling}
                aria-label="Ir para a data anterior"
                >
                <Icon icon="leftArrow" className="inline" />
            </Button>
            <time className="text-primary-dark font-bold" dateTime={date}>
                {getDateTitle(date)}
            </time>
            <Button
                styleType="primary-link"
                disabled={isLoading}
                onClick={toNextScheduling}
                aria-label="Ir para a próxima data"
                >
                <Icon icon="rightArrow" className="inline" />
            </Button>
        </nav>
    )
}