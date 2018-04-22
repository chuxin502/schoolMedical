// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import draggable from 'vuedraggable'
import lodash from 'lodash'
import 'services/index'
import 'utils/index'

import App from './App'
import router from './router'

// Vue.component('draggable2', draggable)

Vue.prototype.$http = axios
Vue.prototype._ = lodash

Vue.config.productionTip = false

Vue.use(elementUi)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
