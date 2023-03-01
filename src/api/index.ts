import { getAuthToken } from './utils'
import axios, { AxiosResponse } from 'axios'
import { stringify } from 'querystring'

export class Response {
    code: number
    data: any
    message: string
    constructor(code: number, data: any, message: string) {
        this.code = code
        this.data = data
        this.message = message
    }

    static success(data: any, message: string) {
        return new Response(0, data, message)
    }

    static error(data: any, message: string) {
        return new Response(-1, data, message)
    }

    is_success(): boolean {
        return this.code >= 0
    }

    is_error(): boolean {
        return this.code < 0
    }
}

export const api_base = (url: string, method: string, args: any) => new Promise<Response>( resolve => {
    (async function(){
        // check if args is a object
        if (typeof args === 'object') {
            // if args is a object, then convert it to a string
            args = stringify(args)
        }
        args = args || ''
        const auth_token = getAuthToken()
        switch(method.toLowerCase()){
            case 'post':
                try{
                    let data : AxiosResponse<Response>
                    if( !auth_token) {
                        data = await axios.post<Response>(url, args)
                    } else {
                        data = await axios.post<Response>(url, args, {
                            headers: {
                                'Authorization': getAuthToken()
                            }
                        })
                    }
                    const response = data.data
                    resolve(response)
                }catch(e){
                    resolve(Response.error(false, '网络错误'))
                }
                break
            case 'get':
                try{
                    let data
                    if (!auth_token) {
                        data = await axios.get(url + '?' + args)
                    } else {
                        data = await axios.get(url + '?' + args, {
                            headers: {
                                'Authorization': getAuthToken()
                            }
                        })
                    }
                    const response = data.data
                    resolve(response)
                }catch(e){
                    resolve(Response.error(false, '网络错误'))
                }
                break
            default:
                resolve(Response.error(false, '未知错误'))
                break
        }
    })()
})

export const api_file_upload = (url: string, file: File, args : any) => new Promise<Response>( resolve => {
    (async function(){
        const auth_token = getAuthToken()
        const formData = new FormData()
        formData.append('file', file)
        if (args) {
            for (const key in args) {
                if (args.hasOwnProperty(key)) {
                    const element = args[key];
                    formData.append(key, element)
                }
            }
        }
        try{
            let data
            if (!auth_token) {
                data = await axios.post(url, formData)
            } else {
                data = await axios.post(url, formData, {
                    headers: {
                        'Authorization': getAuthToken()
                    }
                })
            }
            const response = data.data
            resolve(response)
        }catch(e){
            resolve(Response.error(false, '网络错误'))
        }
    })()
})