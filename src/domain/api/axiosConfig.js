import { apiBaseURL } from '~/domain/constants/api'
import authService from '~/domain/services/auth.service'

export function getAxiosConfig() {
    return {
        baseURL: apiBaseURL,
        headers: {
            common: {
                'Authorization': `Bearer ${authService.getToken()}`
            }
        }
    }
}