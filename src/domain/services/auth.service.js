import { authApi, userApi  } from '~/domain/api'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

async function login(email, password) {
    const jwt = await authApi.login(email, password)
    saveToken(jwt)
    return await fetchUser()
}

async function createUser(user) {
    const jwt = await authApi.createUser(user)
    saveToken(jwt)
    return await fetchUser()
}

async function fetchUser() {
    const { id, name, username } = await userApi.getUser()
    const user = { id, name, username }
    
    saveUser(user)

    return user
}

function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

function getCurrentUser() {
    const serializedUser = localStorage.getItem(USER_KEY)

    if (serializedUser) {
        return JSON.parse(serializedUser)
    }

    return null
}

function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
}

function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

function signOut() {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
}

export default {
    login,
    createUser,
    getCurrentUser,
    getToken,
    signOut
}