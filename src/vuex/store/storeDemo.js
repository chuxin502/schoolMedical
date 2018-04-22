import Vue from 'vue'
import Vuex from 'vuex'

import modulesDemo from '../modules/modulesDemo'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        modulesDemo
    }
})
