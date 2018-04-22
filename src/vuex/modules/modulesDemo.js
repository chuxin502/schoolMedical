import api from 'Vuex/api'

const RECEIVE_SHOW_MENU = 'RECEIVE_SHOW_MENU'

const state = {
    showMenu: true
}

const mutations = {
    [RECEIVE_SHOW_MENU](state, data) {
        state.showMenu = data
    }
}

const getters = {
    getShowMenu: state => state.showMenu
}

const actions = {
    askDist: ({commit}, list) => {
        let link = 'www.baidu.com'
        api.get(link).then((data) => {
            commit(RECEIVE_SHOW_MENU, data.Data)
        })
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}
