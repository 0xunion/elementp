import { api_base } from './index'
import md5 from 'md5'

export const api_login_captcha = () => api_base('/api/common/captcha/image/login', 'GET', {})

export const api_init_root = (email: string, password: string) => api_base('/api/common/auth/init/root', 'POST', {
    email, password : md5(password)
})

export const api_email_login = (email: string, password: string, captcha: string, captcha_token: string) => api_base('/api/common/auth/login/email_password', 'POST', {
    email, password : md5(password), captcha, captcha_token
})

export const api_phone_login = (phone: string, password: string, captcha: string, captcha_token: string) => api_base('/api/common/auth/login/phone_password', 'POST', {
    phone, password : md5(password), captcha, captcha_token
})

export const api_get_user_info = () => api_base('/api/common/auth/self/info', 'GET', {})