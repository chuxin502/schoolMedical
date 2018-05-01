<template>
    <div>
        <leftBox></leftBox>
        <div class="right-box">
            <systemHead></systemHead>
            <!--<div class="content"></div>-->
            <router-view class="content"/>
        </div>
    </div>
</template>

<script type="text/babel">
    import systemHead from './systemHead'
    import leftBox from './leftBox'

    export default {
        components: {systemHead, leftBox},
        data() {
            return {}
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .right-box {
        min-width: 1100px;
        position: absolute;
        left: 232px;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .content {
        width: 100%;
        background-color: white;
        position: absolute;
        top: 60px;
        bottom: 0;
        border: 20px solid rgb(242,242,242);
        padding: 20px;
    }
</style>
