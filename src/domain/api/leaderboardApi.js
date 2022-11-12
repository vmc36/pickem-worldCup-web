import axios from 'axios'

import { getAxiosConfig } from './axiosConfig'


export async function getLeaderboard() {
    const result = await axios({
        ...getAxiosConfig(),
        url: '/v1/leaderboard'
    })
    
    return result.data
}