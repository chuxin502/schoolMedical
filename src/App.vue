<template>
    <div id="app">
        <router-view/>
        <!--<home v-if="showContent || $route.name === 'login'"></home>-->
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
                system.commit('RECEIVE_USER_INFO', data.Data);

                if (data.Data.type === 2) {
                    this.askMedicineStock();
                }
            },

            askMedicineStock() {
                this.getRequest('medicines_less', null, this.initMedicineStock);
            },

            initMedicineStock(data) {
                if (data.Data.length) {
                    this.$notify({
                        title: '药品库存预警',
                        message: `${data.Data.join('、')}${data.Data.length === 10 ? '等' : ''}库存较低，请及时补充`,
                        duration: 0
                    });
                }
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
        &.el-form--label-top {
            .el-form-item__label {
                padding: 0;
            }
        }
        .el-form-item {
            margin-bottom: 10px;
            &.is-error {
                margin-bottom: 22px;
            }
        }
    }
    .el-table__header {
        line-height: normal;
    }
</style>
