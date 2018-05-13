<template>
    <div>
        <el-collapse v-model="activeNames">
            <el-collapse-item :name="index" v-for="(notice,index) in notices" :key="index">
                <template slot="title">
                    <span>{{notice.notice_title}}</span>
                    <!--<el-tag type="success" class="tag">已读</el-tag>-->
                </template>
                <div v-html="notice.notice_content"></div>
            </el-collapse-item>
        </el-collapse>
        <el-pagination
            class="pagination"
            @size-change="changePageSize"
            @current-change="changePageIndex"
            :current-page="pageIndex"
            :page-sizes="[15, 30, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script type="text/babel">
    import listHead from 'views/public/listHead'
    import listContent from 'views/public/listContent'

    export default {
        components: {listHead, listContent},
        data() {
            return {
                activeNames: [],         // 当前展开的面板
                pageIndex: 1,               // 当前页码
                pageSize: 15,               // 当前一页的信息条数
                total: 0,                   // 内容总数
                notices: [],                // 公告列表
            }
        },
        methods: {
            // 请求数据
            askData(search) {
                if (!this._.isNil(search)) {
                    this.searchStr = search;
                }

                let arg = {
                    search: this.searchStr,
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                };
                this.getRequest('notices_list', arg, this.initData);
            },

            // 初始化数据
            initData(data) {
                this.total = data.Data.length;
                data.Data.forEach((item) => {
                    item.notice_create_time = item.notice_create_time.getDateTime();
                    item.notice_update_time = item.notice_update_time.getDateTime();
                });
                this.notices = data.Data;
            },

            // 切页
            changePageIndex(index) {
                this.pageIndex = index;
                this.askData();
            },

            // 调整一页的信息数量
            changePageSize(size) {
                this.pageSize = size;
                this.askData();
            },
        },
        created() {
            this.askData();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .tag {
        height: 26px;
        line-height: 24px;
        margin-left: 10px;
    }
    .pagination {
        float: right;
        margin-top: 40px;
    }
</style>
