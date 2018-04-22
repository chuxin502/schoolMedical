import Vue from 'vue'
import Router from 'vue-router'

const students = r => require.ensure([], () => r(require('../views/students/index.vue')), 'group-test')

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'students',
            component: students
        },
    ]
})
