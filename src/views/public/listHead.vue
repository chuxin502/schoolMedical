<template>
    <div class="list-head">
        <el-button type="primary" @click="add" size="small">添加学生</el-button>
        <el-input
            class="search-input"
            v-model="searchStr"
            v-bind="$attrs"
            size="small"
            suffix-icon="el-icon-search"
            @change="search">
        </el-input>
    </div>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                searchStr: ''
            }
        },
        props: {
            defaultSearch: String,
        },
        methods: {
            add() {
                this.$emit('add');
            },
            search(str) {
                console.log(str);
                this.$emit('search', str);
            },
        },
        created() {
            this.searchStr = this.defaultSearch;
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .list-head {
        padding-bottom: 20px;
        overflow: hidden;
    }
    .search-input {
        width: 230px;
        float: right;
    }
</style>
