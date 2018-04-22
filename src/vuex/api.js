import axios from 'axios'
import Vue from 'vue'

let vue = Vue.prototype

export default {
    get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url).then((response) => {
                request(response, resolve)
            }, (response) => {
                reject(response)
            })
        })
    },
    post(url, data, headers) {
        let config = {
            headers: headers || {'Content-Type': 'application/x-www-form-urlencoded'}
        }

        if (!headers || headers['Content-Type'] !== 'multipart/form-data') {
            config.transformRequest = (data) => {
                let req = ''
                for (let key in data) {
                    req += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
                }
                return req
            }
        }

        return new Promise((resolve, reject) => {
            axios.post(url, data, config).then((response) => {
                request(response, resolve)
            }, (response) => {
                if (reject && typeof reject === 'function') return reject(response)

                vue.$message({
                    showClose: true,
                    message: '网络错误，请稍后重试！',
                    type: 'error'
                })
            })
        })
    }
}

function request(response, resolve) {
    let data = response.data
    let transData = vue._.isString(data) ? JSON.parse(data) : data

    switch (transData.Code) {
        case -401:
            window.location.href = window.loginLink + window.location.origin
            break
        case -1:
        case -404:
            vue.$message({
                showClose: true,
                message: transData.Message,
                type: 'error'
            })
            break
        case -403:
            vue.$message({
                showClose: true,
                message: transData.Message,
                type: 'error'
            })
            break
        default:
            if (resolve && vue._.isFunction(resolve)) {
                resolve(data)
            }
            break
    }
}
