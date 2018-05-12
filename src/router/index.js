import Vue from 'vue'
import Router from 'vue-router'

const main = r => require.ensure([], () => r(require('../views/public/main')), 'group-test')
const login = r => require.ensure([], () => r(require('../views/public/login')), 'group-test')
const students = r => require.ensure([], () => r(require('../views/students/index.vue')), 'group-test')
const doctors = r => require.ensure([], () => r(require('../views/doctors/index.vue')), 'group-test')
const medicines = r => require.ensure([], () => r(require('../views/medicines/index.vue')), 'group-test')
const notices = r => require.ensure([], () => r(require('../views/notices/index.vue')), 'group-test')
const handlerNotice = r => require.ensure([], () => r(require('../views/notices/handler')), 'group-test')
const registers = r => require.ensure([], () => r(require('../views/registers/index.vue')), 'group-test')

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: main
    }, {
        path: '/login',
        name: 'login',
        component: login
    }, {
        path: '/students',
        name: 'students',
        component: students
    }, {
        path: '/doctors',
        name: 'doctors',
        component: doctors
    }, {
        path: '/medicines',
        name: 'medicines',
        component: medicines
    }, {
        path: '/notices',
        name: 'notices',
        component: notices
    }, {
        path: '/handleNotice',
        name: 'handleNotice',
        component: handlerNotice
    }, {
        path: '/registers',
        name: 'registers',
        component: registers
    }]
})
