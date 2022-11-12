import axios from 'axios'

import { getAxiosConfig } from './axiosConfig'

export async function getUser() {
    const response = await axios({
        ...getAxiosConfig(),
        url: '/v1/me',
    })
    
    return response.data
}