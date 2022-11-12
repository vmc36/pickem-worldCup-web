import axios from 'axios'

import { getAxiosConfig } from './axiosConfig'

export async function getHunches(username, date) {
    const response = await axios({
        ...getAxiosConfig(),
        url: `/v1/hunches/${username}`,
        params: {
            date: date.toISOString()
        }
    })

    return response.data
}

export async function sendHunch(matchId, homeTeamScore, awayTeamScore) {
    await axios({
        ...getAxiosConfig(),
        method: 'post',
        url: '/v1/hunches',
        data: {
            matchId,
            homeTeamScore,
            awayTeamScore
        }
    })
}