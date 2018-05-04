<template>
    <div class="hello">
        <i class="fa fa-address-book"></i>
        <el-button>默认按钮</el-button>
        <testEl></testEl>
        <h1>{{ msg }}</h1>
        <h2>Essential Links</h2>
        <ul>
            <li>
                <a
                        href="https://vuejs.org"
                        target="_blank"
                >
                    Core Docs
                </a>
            </li>
            <li>
                <a
                        href="https://forum.vuejs.org"
                        target="_blank"
                >
                    Forum
                </a>
            </li>
            <li>
                <a
                        href="https://chat.vuejs.org"
                        target="_blank"
                >
                    Community Chat
                </a>
            </li>
            <li>
                <a
                        href="https://twitter.com/vuejs"
                        target="_blank"
                >
                    Twitter
                </a>
            </li>
            <br>
            <li>
                <a
                        href="http://vuejs-templates.github.io/webpack/"
                        target="_blank"
                >
                    Docs for This Template
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import storeDemo from 'Vuex/store/storeDemo'
    import testEl from './testEl.vue'

    export default {
        name: 'HelloWorld',
        components: {testEl},
        computed: {
            aa() {
                return storeDemo.getters.getShowMenu
            }
        },
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        methods: {
            askData() {
                this.getRequest('/api/test', null, this.initData)
            },
            initData(data) {
            }
        },
        created() {
            this.askData()
        },
        mounted() {
            storeDemo.commit('RECEIVE_SHOW_MENU', 'haha')
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
