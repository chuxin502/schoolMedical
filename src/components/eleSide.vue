<template>
    <div class="ele-side">
        <div class="side-content">
            <div class="side-head">
                <span>{{title}}</span>
                <div class="close-btn el-icon-close" @click="close"></div>
            </div>
            <slot name="content"></slot>
        </div>
        <div class="side-bg" @click="close"></div>
    </div>
</template>

<script type="text/babel">
    export default {
        data() {
            return {}
        },
        props: {
            title: String
        },
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .ele-side {
    }
    .side-content {
        width: 480px;
        background-color: white;
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 101;
        padding: 20px;
    }
    .side-head {
        margin-bottom: 20px;
    }
    .close-btn {
        font-size: 24px;
        float: right;
        cursor: pointer;
    }
    .side-bg {
        background-color: rgba(0,0,0,0.5);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: fixed;
        z-index: 100;
    }
</style>
