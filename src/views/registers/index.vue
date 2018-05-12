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
        <diagnose
            v-if="showDiagnose"
            :editData="editData"
            @success="initSuccess"
            @close="showDiagnose = false">
        </diagnose>
        <receive
            v-if="showReceive"
            :editData="editData"
            @success="initSuccess"
            @close="showReceive = false">
        </receive>
    </div>
</template>

<script type="text/babel">
    import system from 'Vuex/store/system'
    import listHead from 'views/public/listHead'
    import listContent from 'views/public/listContent'
    import handler from './handler'
    import diagnose from './diagnose'
    import receive from './receive'

    export default {
        components: {listHead, listContent, handler, diagnose, receive},
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
                        {prop: 'student_name', label: '预约人'},
                        {prop: 'registerTime', label: '预约时间', width: '160'},
                        {prop: 'subject', label: '科目'},
                        {prop: 'register_disease', label: '病症'},
                        {prop: 'prescript', label: '药方'},
                        // {prop: 'register_spend', label: '药费'},
                        {prop: 'register_status', label: '状态'}
                    ],
                    data: [],
                    action: {label: '操作'}
                },                            // 表格配置
                pageIndex: 1,               // 当前页码
                pageSize: 15,               // 当前一页的信息条数
                total: 0,                   // 内容总数
                searchStr: '',              // 搜索的关键字
                showHandler: false,          // 显示添加/编辑右侧窗
                showDiagnose: false,          // 显示诊断右侧窗
                showReceive: false,          // 显示收款右侧窗
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
                    item.registerTime = item.register_time.getDateTime();
                    item.subject = item.register_subject === 1 ? '内科' : '外科';
                    item.register_prescript = item.register_prescript ? JSON.parse(item.register_prescript) : [];
                    item.prescript = item.register_prescript.map(medicine => medicine.name + medicine.num + medicine.unit).join('、');

                    item.action = [];
                    switch (this.userInfo.type) {
                        case 1:
                            if (item.register_status === '待报到') {
                                item.action = [
                                    {name: '编辑', event: 'edit'},
                                    {name: '取消', event: 'cancel'},
                                ];
                            }
                            break;
                        case 2:
                            switch (item.register_status) {
                                case '待报到':
                                    item.action = [{name: '报到', event: 'report'}];
                                    break;
                                case '就诊中':
                                    item.action = [{name: '诊断', event: 'diagnose'}];
                                    break;
                                case '待取药':
                                    item.action = [{name: '收款', event: 'receive'}];
                                    break;
                            }
                            break;
                        case 3:
                            item.action = [
                                {name: '编辑', event: 'edit'},
                                {name: '删除', event: 'delete'},
                            ];
                            break;
                    }
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
                        this.handlerType = 'edit';
                        this.showHandler = true;
                        break;
                    case 'delete':
                        this.delete();
                        break;
                    case 'cancel':
                        this.cancel();
                        break;
                    case 'report':
                        this.report();
                        break;
                    case 'diagnose':
                        this.showDiagnose = true;
                        break;
                    case 'receive':
                        this.showReceive = true;
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

            // 取消挂号
            cancel() {
                this.$confirm('确定要取消挂号吗？').then(() => {
                    let arg = {
                        id: this.editData.register_id
                    };
                    this.postRequest('registers_cancel', arg, this.finishHandle);
                }).catch(() => {});
            },

            // 挂号报到
            report() {
                this.$confirm('确定要对该挂号进行确认报到操作吗？').then(() => {
                    let arg = {
                        id: this.editData.register_id
                    };
                    this.postRequest('registers_report', arg, this.finishHandle);
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
                this.showDiagnose = false;
                this.showReceive = false;
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
