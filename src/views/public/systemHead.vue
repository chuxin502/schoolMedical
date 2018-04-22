<template>
    <div class="header">
        <div class="pull-right">
            <div class="head-btn fa fa-cog"></div>
            <div class="head-btn fa fa-commenting-o"></div>
            <div class="head-btn fa fa-file-text-o"></div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        data() {
            return {}
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .header {
        height: 60px;
        box-shadow: 0 0 10px #cccccc;
        position: relative;
        z-index: 1;
    }
    .head-btn {
        width: 60px;
        height: 60px;
        font-size: 28px;
        display: inline-block;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        color: #C0C4CC;
        border-top: 6px solid transparent;
        &:hover {
            background-color: black;
            color: white;
            border-color: rgb(235,58,78);
        }
    }
</style>
