<template>
    <div class="left-box">
        <div class="left-box-head">
            <p>校园医疗管理系统</p>
            <div>
                <span>当前用户：小渣渣</span>
                <span class="logout">[退出]</span>
            </div>
        </div>
        <el-menu
            default-active="2"
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
    export default {
        data() {
            return {
                menus: [
                    {name: '个人信息', icon: 'el-icon-menu', route: '/'},
                    {name: '医生管理', icon: 'el-icon-menu', route: '/2'},
                    {name: '学生管理', icon: 'el-icon-menu', route: '/3'},
                    {name: '药品管理', icon: 'el-icon-menu', route: '/4'},
                    {name: '挂号信息', icon: 'el-icon-menu', route: '/5'},
                ]
            }
        },
        methods: {
            // changeMenu(route) {
            //     this.$router.push({path: route})
            // }
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
