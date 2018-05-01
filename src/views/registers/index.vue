<template>
    <div>
        <listHead
            placeholder="请输入挂号ID"
            :defaultSearch="searchStr"
            addBtn="添加挂号"
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
    import system from 'Vuex/store/system'
    import listHead from 'views/public/listHead'
    import listContent from 'views/public/listContent'
    import handler from './handler'

    export default {
        components: {listHead, listContent, handler},
        computed: {
            userInfo() {
                return system.getters.getUserInfo;
            }
        },
        data() {
            return {
                tableSetting: {
                    align: 'center',
                    tableConfig: {},
                    colConfigs: [
                        {prop: 'register_id', label: 'ID'},
                        {prop: 'registerName', label: '预约人'},
                        {prop: 'registerTime', label: '预约时间', width: '160'},
                        {prop: 'subject', label: '科目'},
                        {prop: 'register_prescript', label: '药方'},
                        {prop: 'register_spend', label: '药费'},
                        {prop: 'register_status', label: '状态'}
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
                    filters: this.userInfo.type === 1 ? JSON.stringify({register_student_id: this.userInfo.id}) : null
                };
                this.getRequest('registers_list', arg, this.initData);
            },

            // 初始化数据
            initData(data) {
                this.total = data.Data.length;
                data.Data.forEach((item) => {
                    item.registerName = item.register.student_name;
                    item.registerTime = item.register_time.getDateTime();
                    item.subject = item.register_subject === 1 ? '内科' : '外科';
                });
                this.tableSetting.data = data.Data;

                let configs;
                switch (this.userInfo.type) {
                    case 1:
                        configs = [
                            {name: '编辑', event: 'edit'},
                            {name: '删除', event: 'delete'},
                        ];
                        break;
                    case 2:
                        configs = [
                            {name: '报到', event: 'report'},
                        ];
                        break;
                    case 3:
                        configs = [
                            {name: '报到', event: 'report'},
                            {name: '编辑', event: 'edit'},
                            {name: '删除', event: 'delete'},
                        ];
                        break;
                }
                this.tableSetting.handle.configs = configs;
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
                    case 'report':
                        this.report();
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
                        id: this.editData.register_id
                    };
                    this.postRequest('registers_delete', arg, this.finishHandle);
                }).catch(_ => {});
            },

            // 删除信息
            report() {
                this.$confirm('确定要对该挂号进行确认报到操作吗？').then(_ => {
                    let arg = {
                        id: this.editData.register_id
                    };
                    this.postRequest('registers_report', arg, this.finishHandle);
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
