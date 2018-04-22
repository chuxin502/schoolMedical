<template>
    <div id="app">
        <home></home>
    </div>
</template>

<script>
    import home from './views/public/home'

    export default {
        name: 'App',
        components: {home}
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
