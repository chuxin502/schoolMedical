<template>
    <div>
        <listHead
            placeholder="请输入公告标题/ID"
            :defaultSearch="searchStr"
            addBtn="添加公告"
            @search="askData"
            @add="add">
        </listHead>
        <listContent
            :setting="tableSetting"
            :pageSize="pageSize"
            :pageIndex="pageIndex"
            :total="total"
            @btnEvents="handleBtnEvents"
            @changePageIndex="changePageIndex"
            @changePageSize="changePageSize">
        </listContent>
    </div>
</template>

<script type="text/babel">
    import listHead from 'views/public/listHead'
    import listContent from 'views/public/listContent'
    import handler from './handler'

    export default {
        components: {listHead, listContent, handler},
        data() {
            return {
                tableSetting: {
                    align: 'center',
                    tableConfig: {},
                    colConfigs: [
                        {prop: 'notice_id', label: 'ID'},
                        {prop: 'notice_title', label: '标题'},
                        {prop: 'notice_create_time', label: '创建时间'},
                        {prop: 'notice_update_time', label: '更新时间'},
                    ],
                    data: [],
                    action: {
                        label: '操作',
                        configs: [
                            {name: '编辑', event: 'edit'},
                            {name: '删除', event: 'delete'},
                        ]
                    }
                },                            // 表格配置
                pageIndex: 1,               // 当前页码
                pageSize: 15,               // 当前一页的信息条数
                total: 0,                   // 内容总数
                searchStr: '',              // 搜索的关键字
                editData: null,             // 正在编辑的数据
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
                this.tableSetting.data = data.Data;
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

            // 表格按钮事件
            handleBtnEvents(row, event) {
                this.editData = row;
                switch (event) {
                    case 'edit':
                        this.$router.push({path: '/handleNotice', query: {id: this.editData.notice_id}});
                        break;
                    case 'delete':
                        this.delete();
                        break;
                }
            },

            // 添加信息
            add() {
                this.$router.push('/handleNotice');
            },

            // 删除信息
            delete() {
                this.$confirm('确定要删除该行信息吗？').then(_ => {
                    let arg = {
                        id: this.editData.notice_id
                    };
                    this.postRequest('notices_delete', arg, this.finishHandle);
                }).catch(_ => {});
            },

            // 处理成功后的提示
            finishHandle() {
                this.$message({
                    showClose: true,
                    message: '操作成功！',
                    type: 'success'
                });
                this.askData();
            }
        },
        created() {
            this.askData();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
