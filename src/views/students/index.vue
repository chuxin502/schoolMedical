<template>
    <div>
        <listHead
            placeholder="请输入学生姓名/学号/ID"
            :defaultSearch="searchStr"
            addBtn="添加学生"
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
                        {prop: 'student_id', label: 'ID'},
                        {prop: 'student_no', label: '学号'},
                        {prop: 'student_name', label: '姓名'},
                        {prop: 'student_sex', label: '性别'},
                        // {prop: 'student_insurance', label: '医保号'},
                        {prop: 'student_college', label: '二级学院'},
                        // {prop: 'student_major', label: '专业'},
                        {prop: 'student_phone', label: '手机号码'},
                        // {prop: 'student_idcard', label: '身份证号'},
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
                this.getRequest('students_list', arg, this.initData);
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
                        id: this.editData.student_id
                    };
                    this.postRequest('students_delete', arg, this.finishHandle);
                }).catch(() => {});
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
