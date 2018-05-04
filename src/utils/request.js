import Vue from 'vue'
import linkApi from '../services/api'

const vueProto = Vue.prototype

window.waitReply = {
    full: {},       // 锁定全屏
    content: {}, // 锁定内容区
    side: {}    // 锁定右侧窗
}
window.openSideHandler = false
window.defaultSide = ''

vueProto.getRequest = function(sign, arg, func, prop = {}) {
    let link = linkApi[sign] || sign
    let locking = prop.locking

    if (!locking) {
        locking = window.openSideHandler ? 'side' : 'content'
    }

    if (!prop.canRepeat && markLoading(locking, link) === false) return false

    // 不直接使用link是为了请求返回时能够准确找到指点路径
    let fullLink = link + '?_=' + new Date().getTime()
    if (arg) {
        let argArray = []
        for (let key in arg) {
            if (vueProto._.isNil(arg[key])) continue
            argArray.push(key + '=' + encodeURIComponent(arg[key]))
        }
        fullLink += '&' + argArray.join('&')
    }

    this.$http.get(fullLink, {
        headers: {'Content-Type': 'application/json:charset=UTF-8'},
        emulateJSON: true
    }).then((response) => {
        loading(link, locking)
        request(this, response, link, func, locking)
    }, (response) => {
        loading(link, locking)
        this.$message({
            showClose: true,
            message: '网络错误，请稍后重试！',
            type: 'error'
        })
    })
}

vueProto.postRequest = function(sign, arg, func, prop = {}) {
    let link = linkApi[sign] || sign
    let locking = prop.locking

    if (!locking) {
        locking = window.openSideHandler ? 'side' : 'content'
    }

    if (!prop.canRepeat && markLoading(locking, link) === false) return false

    this.$http.post(link, arg, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: (data) => {
            let ret = ''
            for (let it in data) {
                if (vueProto._.isNil(data[it])) continue
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }
    }).then((response) => {
        loading(link, locking)
        request(this, response, link, func, locking)
    }, (response) => {
        loading(link, locking)
        this.$message({
            showClose: true,
            message: '网络错误，请稍后重试！',
            type: 'error'
        })
    })
}

function loading(link, locking) {
    let waitReplyObj = window.waitReply[locking]
    if (!waitReplyObj) return

    // 删除已请求完的链接
    delete waitReplyObj[link]

    if (locking && !Object.keys(waitReplyObj).length) {
        window.$eventHub.$emit('setLoading', false, locking)
    }
}

// 鉴别是否可以发起请求，并告知home组件启用对应的遮罩
function markLoading(locking, link) {
    let waitReplyOb = window.waitReply[locking]

    if (!locking) return

    if (waitReplyOb[link]) return false

    waitReplyOb[link] = link
    setTimeout(() => {
        if (Object.keys(waitReplyOb).length) {
            window.$eventHub.$emit('setLoading', true, locking)
        }
    }, 100)
}

// 请求成功后的处理方法
function request(vue, response, link, func) {
    let data = response.data
    let transData = vue._.isString(data) ? JSON.parse(data) : data

    switch (transData.Code) {
        case -401:
            vue.$router.push('/login');
            // window.location.href = window.loginLink + window.location.origin
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
            if (!func) break
            return func(transData, response.status)
    }
}
