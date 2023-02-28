export const setAuthToken = (token: string) => {
    localStorage.setItem('auth_token', JSON.stringify({
        token: token,
        time: parseInt((new Date().getTime() / 1000).toString())
    }))
}

export const getAuthToken = () => {
    const token = localStorage.getItem('auth_token')
    if(!token) {
        return ''
    }
    try {
        const obj = JSON.parse(token)
        if (obj['time'] + 7 * 24 * 3600 < parseInt((new Date().getTime() / 1000).toString())) {
            setAuthToken('')
            return ''
        } else {
            return obj['token']
        }
    } catch(e){
        return ''
    }
}

import { Response } from './index'

export const isSuccess = (response: Response):boolean => {
    return response.code === 0
}

export const isError = (response: Response):boolean => {
    return response.code < 0
}