<template>
    <eleSide :title="title" @close="close">
        <div slot="content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入活动名称"></el-input>
                </el-form-item>
            </el-form>
            <div class="hidden">
                <el-button type="primary" class="foot-btn">确定</el-button>
                <el-button class="foot-btn">取消</el-button>
            </div>
        </div>
    </eleSide>
</template>

<script type="text/babel">
    import eleSide from 'components/eleSide'

    export default {
        components: {eleSide},
        computed: {
            title() {
                return this.type === 'add' ? '添加学生' : '编辑学生';
            }
        },
        data() {
            return {
                ruleForm: {
                    name: '',
                },
                rules: {
                    name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
                }
            }
        },
        props: {
            type: String,
            editData: Object,
        },
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .foot-btn {
        width: 90px;
        float: right;
        &+& {
            margin-right: 10px;
        }
    }
</style>
