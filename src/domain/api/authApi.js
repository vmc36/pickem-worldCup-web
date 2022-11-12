import axios from 'axios'

import { getAxiosConfig } from './axiosConfig'

export async function createUser(user) {
    const response = await axios({
        ...getAxiosConfig(),
        method: 'post',
        url: '/v1/auth/signup',
        data: user
    })

    const { token } = response.data
    return token
}

export async function login(email, password) {
    const response = await axios({
        ...getAxiosConfig(),
        url: '/v1/auth/login',
        auth: {
            username: email,
            password
        }
    })

    const { token } = response.data
    return token
}