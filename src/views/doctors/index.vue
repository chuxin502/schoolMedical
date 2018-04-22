<template>
    <div>
        <listHead
            placeholder="请输入学生姓名/学号"
            :defaultSearch="searchStr"
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
                        {prop: 'doctor_id', label: 'ID'},
                        {prop: 'doctor_name', label: '姓名'},
                        {prop: 'doctor_subject', label: '科目'},
                        {prop: 'doctor_university', label: '毕业院校'},
                        {prop: 'doctor_summary', label: '医生简介'},
                        {prop: 'doctor_work_time', label: '上班时间'},
                    ],
                    data: [],
                    handle: {
                        label: '操作',
                        configs: [
                            {name: '编辑', event: 'edit'},
                            {name: '删除', event: 'delete'},
                        ]
                    }
                },                            // 表格配置
                pageIndex: 1,               // 当前页码
                pageSize: 15,               // 当前一页的信息条数
                total: 100,                   // 内容总数
                searchStr: '',              // 搜索的关键字
                showHandler: false,          // 显示右侧窗
                editData: null,             // 正在编辑的数据
                handlerType: 'add',         // 右侧窗的类型
            }
        },
        methods: {
            // 请求数据
            askData(search) {
                if (search) {
                    this.searchStr = search;
                }

                let arg = {
                    search: this.searchStr,
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                };
                console.log(arg);
                // this.getRequest('', arg, this.initData);
            },

            // 初始化数据
            initData(data) {
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
                    let arg = {};
                    this.postRequest('', arg, this.finishHandle);
                }).catch(_ => {});
            },

            // 处理成功后的提示
            finishHandle() {
                this.$message({
                    showClose: true,
                    message: '操作成功！',
                    type: 'success'
                });
            }
        },
        created() {
            // this.askData();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
