import Vue from 'vue'

const vueProto = Vue.prototype

// development，test是testing，build则是production，在build文件夹对应的文件可以看到
// let nodeType = process.env.NODE_ENV

let eventHub = new Vue()
vueProto.$eventHub = eventHub
window.$eventHub = eventHub
window.loginLink = ''   // 登录链接
