<template>
    <div class="hidden">
        <eleTable :setting="setting" @btnEvents="handleBtnEvents"></eleTable>
        <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script type="text/babel">
    import eleTable from 'components/eleTable'

    export default {
        components: {eleTable},
        data() {
            return {
                pageSizes: [15, 30, 50, 100],
            }
        },
        props: {
            setting: Object,
            pageIndex: Number,
            pageSize: Number,
            total: Number,
        },
        methods: {
            handleSizeChange(size) {
                this.$emit('changePageSize', size);
            },
            handleCurrentChange(index) {
                this.$emit('changePageIndex', index);
            },
            handleBtnEvents(row, event) {
                this.$emit('btnEvents', row, event);
            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .pagination {
        float: right;
        margin-top: 20px;
    }
</style>
