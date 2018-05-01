import api from 'Vuex/api'

const RECEIVE_SHOW_MENU = 'RECEIVE_SHOW_MENU';
const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';

const state = {
    userInfo: {},
    showMenu: true
}

const mutations = {
    [RECEIVE_USER_INFO](state, data) {
        state.userInfo = data
    },
    [RECEIVE_SHOW_MENU](state, data) {
        state.showMenu = data
    },
};

const getters = {
    getShowMenu: state => state.showMenu,
    getUserInfo: state => state.userInfo,
};

const actions = {
    askDist: ({commit}, list) => {
        let link = 'www.baidu.com'
        api.get(link).then((data) => {
            commit(RECEIVE_SHOW_MENU, data.Data)
        })
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}
