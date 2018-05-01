<template>
    <eleSide :title="title" @close="close">
        <div slot="content">
            <el-form class="custom-el-form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="登录账号" prop="account">
                    <el-input v-model="ruleForm.account" placeholder="请输入登录账号"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="pw" v-if="type === 'add'">
                    <el-input v-model="ruleForm.pw" placeholder="请输入登录密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="专业科目" prop="subject">
                    <el-input v-model="ruleForm.subject" placeholder="请输入专业科目"></el-input>
                </el-form-item>
                <el-form-item label="医生类型" prop="type">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio :label="1">看病医生</el-radio>
                        <el-radio :label="2">药房医生</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="毕业院校" prop="university">
                    <el-input v-model="ruleForm.university" placeholder="请输入毕业院校"></el-input>
                </el-form-item>
                <el-form-item label="医生简介" prop="summary">
                    <el-input v-model="ruleForm.summary" placeholder="请输入医生简介"></el-input>
                </el-form-item>
                <el-form-item label="上班时间" prop="workTime">
                    <el-input v-model="ruleForm.workTime" placeholder="请输入上班时间"></el-input>
                </el-form-item>
            </el-form>
            <div class="hidden">
                <el-button type="primary" class="foot-btn" @click="save">确定</el-button>
                <el-button class="foot-btn" @click="close">取消</el-button>
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
                return this.type === 'add' ? '添加医生' : '编辑医生';
            }
        },
        data() {
            return {
                ruleForm: {
                    name: '',
                    pw: '',
                    subject: '',
                    type: '',
                    university: '',
                    summary: '',
                    workTime: '',
                },
                rules: {
                    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    account: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
                    pw: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
                    subject: [{ required: true, message: '请输入专业科目', trigger: 'blur' }],
                    type: [{required: true, message: '请输入医生类型', trigger: 'change', type: 'number'}],
                    university: [{ required: true, message: '请输入毕业院校', trigger: 'blur' }],
                    summary: [{ required: true, message: '请输入医生简介', trigger: 'blur' }],
                    workTime: [{ required: true, message: '请输入上班时间', trigger: 'blur' }],
                }
            }
        },
        props: {
            type: String,
            editData: Object,
        },
        methods: {
            initData() {
                this.ruleForm = {
                    name: this.editData.doctor_name,
                    account: this.editData.doctor_account,
                    pw: this.editData.doctor_pw,
                    subject: this.editData.doctor_subject,
                    type: this.editData.doctor_type,
                    university: this.editData.doctor_university,
                    summary: this.editData.doctor_summary,
                    workTime: this.editData.doctor_work_time,
                };
            },

            close() {
                this.$emit('close');
            },

            save() {
                this.$refs.ruleForm.validate((valid) => {
                    if (!valid) return;

                    let arg = {
                        id: this.type === 'edit' ? this.editData.doctor_id : null,
                        doctor_name: this.ruleForm.name,
                        doctor_account: this.ruleForm.account,
                        doctor_pw: this.type === 'add' ? this.ruleForm.pw : null,
                        doctor_subject: this.ruleForm.subject,
                        doctor_type: this.ruleForm.type,
                        doctor_university: this.ruleForm.university,
                        doctor_summary: this.ruleForm.summary,
                        doctor_work_time: this.ruleForm.workTime,
                    };
                    console.log(arg);
                    this.postRequest('doctors_save', arg, this.initSave);
                });
            },

            initSave() {
                this.$emit('success');
            }
        },
        created() {
            if (this.type === 'edit') {
                this.initData();
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
