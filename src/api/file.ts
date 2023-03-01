import axios from "axios"
import { api_file_upload } from "."
import { getAuthToken } from "./utils"

export const api_admin_upload_file = (game_id: string, file: File) => api_file_upload('/api/common/admin/file/upload', file, {game_id})

export const api_attacker_upload_file = (game_id: string, file: File) => api_file_upload('/api/common/attacker/file/upload', file, {game_id})

export const api_download_file = (game_id: string, file_id: string, filename: string) => {
    const auth_token = getAuthToken()
    let url = `/api/common/file/download?game_id=${game_id}&file_id=${file_id}`

    // create form
    const xhr = new XMLHttpRequest()
    xhr.open('GET', axios.defaults.baseURL + url, true)
    xhr.setRequestHeader('Authorization', auth_token)
    xhr.responseType = 'blob'
    xhr.onload = function () {
        if (this.status === 200) {
            const blob = this.response
            const a = document.createElement('a')
            a.download = filename
            const url = window.URL.createObjectURL(blob)
            
            a.href = url
            a.click()
        }
    }

    xhr.send()
}