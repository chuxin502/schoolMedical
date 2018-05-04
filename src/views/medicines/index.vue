<template>
    <div>
        <listHead
            placeholder="请输入药品名称/编号/ID"
            :defaultSearch="searchStr"
            addBtn="添加药品"
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
        <handler
            v-if="showHandler"
            :type="handlerType"
            :editData="editData"
            @success="initSuccess"
            @close="showHandler = false">
        </handler>
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
                        {prop: 'medicine_id', label: 'ID'},
                        {prop: 'medicine_name', label: '药品名称'},
                        {prop: 'medicine_type', label: '药品编号'},
                        {prop: 'medicine_standard', label: '药品规格'},
                        {prop: 'medicine_range', label: '限制范围'},
                        {prop: 'medicine_stock', label: '库存'},
                        {prop: 'medicine_price', label: '药品售价'},
                        {prop: 'medicine_describe', label: '主要功效'},
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
                showHandler: false,          // 显示右侧窗
                editData: null,             // 正在编辑的数据
                handlerType: 'add',         // 右侧窗的类型
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
                this.getRequest('medicines_list', arg, this.initData);
            },

            // 初始化数据
            initData(data) {
                this.total = data.Data.length;
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
                        this.handlerType = 'edit';
                        this.showHandler = true;
                        break;
                    case 'delete':
                        this.delete();
                        break;
                }
            },

            // 添加信息
            add() {
                this.handlerType = 'add';
                this.showHandler = true;
            },

            // 删除信息
            delete() {
                this.$confirm('确定要删除该行信息吗？').then(_ => {
                    let arg = {
                        id: this.editData.medicine_id
                    };
                    this.postRequest('medicines_delete', arg, this.finishHandle);
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
            },

            initSuccess() {
                this.showHandler = false;
                this.finishHandle();
            }
        },
        created() {
            this.askData();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
