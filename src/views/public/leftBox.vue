<template>
    <div class="left-box">
        <div class="left-box-head">
            <p>校园医疗管理系统</p>
            <div>
                <span>当前用户：{{userInfo.name}}</span>
                <span class="logout" @click="logout">[退出]</span>
            </div>
        </div>
        <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            router
            active-text-color="#ffd04b">
            <div v-for="(menu,index) in menus" :key="index">
                <el-submenu :index="menu.route" v-if="menu.child">
                    <template slot="title">
                        <i :class="menu.icon"></i>
                        <span>{{menu.name}}</span>
                    </template>
                    <el-menu-item-group v-for="(childMenu,childIndex) in menu.child" :key="childIndex">
                        <el-menu-item :index="childMenu.route">{{childMenu.name}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item :index="menu.route" v-else>
                    <i :class="menu.icon"></i>
                    <span slot="title">{{menu.name}}</span>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>

<script type="text/babel">
    import system from 'Vuex/store/system'

    export default {
        computed: {
            userInfo() {
                return system.getters.getUserInfo;
            },
            menus() {
                switch (this.userInfo.type) {
                    case 1:
                        return this.studentMenus;
                    case 2:
                        return this.doctorMenus;
                    case 3:
                        return this.managerMenus;
                }
            }
        },
        data() {
            return {
                managerMenus: [
                    {name: '公告管理', icon: 'el-icon-menu', route: '/notices'},
                    {name: '医生管理', icon: 'el-icon-menu', route: '/doctors'},
                    {name: '学生管理', icon: 'el-icon-menu', route: '/students'},
                    {name: '药品管理', icon: 'el-icon-menu', route: '/medicines'},
                    {name: '挂号信息', icon: 'el-icon-menu', route: '/registers'},
                ],
                doctorMenus: [
                    {name: '药品管理', icon: 'el-icon-menu', route: '/medicines'},
                    {name: '挂号信息', icon: 'el-icon-menu', route: '/registers'},
                ],
                studentMenus: [
                    {name: '挂号信息', icon: 'el-icon-menu', route: '/registers'},
                ],
            }
        },
        methods: {
            logout() {
                this.getRequest('auth_sign_out', null, this.initLogout);
            },
            initLogout() {
                this.$router.push({path: 'login'});
            }
        },
        created() {
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .left-box {
        width: 232px;
        position: absolute;
        top: 0;
        bottom: 0;
        background-color: #545c64;
    }
    .left-box-head {
        height: 118px;
        color: white;
        text-align: center;
        padding-top: 30px;
        p {
            font-size: 22px;
            margin-bottom: 18px;
        }
        div {
            font-size: 14px;
        }
    }
    .logout {
        cursor: pointer;
        margin-left: 10px;
    }
</style>
<style lang="scss" rel="stylesheet/scss">
    .el-menu {
        border: none;
    }
</style>
