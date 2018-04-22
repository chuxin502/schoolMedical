<template>
    <el-table :data="setting.data" v-bind="setting.tableConfig" highlight-current-row border stripe>
        <el-table-column
            v-bind="config"
            :align="setting.align"
            v-for="(config,index) in setting.colConfigs"
            :key="index">
        </el-table-column>
        <el-table-column fixed="right" :label="setting.handle.label" width="100" align="center">
            <template slot-scope="scope">
                <el-button
                    @click="handleClick(scope.row, config.event)"
                    type="text"
                    size="small"
                    v-for="(config,index) in setting.handle.configs"
                    :key="index">
                    {{config.name}}
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                tableSetting: {
                    align: 'center',
                    tableConfig: {},
                    colConfigs: [
                        {prop: 'name', label: '姓名'},
                        {prop: 'name', label: '学号'},
                        {prop: 'name', label: '性别'},
                        {prop: 'name', label: '学院'},
                        {prop: 'name', label: '民族'},
                        {prop: 'name', label: '专业'},
                        {prop: 'name', label: '手机号码'},
                        {prop: 'name', label: '身份证号'},
                        {prop: 'name', label: '籍贯'},
                    ],
                    data: [
                        {name: 'haha'},
                        {name: 'hehe'},
                    ],
                    handle: {
                        label: '操作',
                        configs: [
                            {name: '编辑', event: 'edit'},
                            {name: '删除', event: 'delete'},
                        ]
                    }
                },
            }
        },
        props: {
            setting: Object
        },
        methods: {
            handleClick(row, event) {
                this.$emit('btnEvents', row, event);
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
