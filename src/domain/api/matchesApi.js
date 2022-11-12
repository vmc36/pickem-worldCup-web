import axios from 'axios'
import { getAxiosConfig } from './axiosConfig'

export async function getMatches(date) {
    const response = await axios({
        ...getAxiosConfig(),
        url: '/v1/matches',
        params: {
            date: date.toISOString()
        }
    })
    
    return response.data
}