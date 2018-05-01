<template>
    <div id="app">
        <home v-if="showContent || $route.name === 'login'"></home>
    </div>
</template>

<script>
    import home from './views/public/home'
    import system from 'Vuex/store/system'

    export default {
        name: 'App',
        components: {home},
        data() {
            return {
                showContent: false,
            }
        },
        watch: {
            '$route.path'(val, oldVal) {
                if (oldVal === '/login') {
                    this.askUserInfo();
                }
            }
        },
        methods: {
            askUserInfo() {
                this.getRequest('auth_user_info', null, this.initUserInfo);
            },

            initUserInfo(data) {
                this.showContent = true;
                console.log(system);
                system.commit('RECEIVE_USER_INFO', data.Data);
            }
        },
        created() {
            this.askUserInfo();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .custom-el-form {
        .el-form-item__label {
            &:before {
                display: none;
            }
        }
    }
</style>
