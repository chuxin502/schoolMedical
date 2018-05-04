<template>
    <eleSide :title="title" @close="close">
        <div slot="content">
            <el-form class="custom-el-form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="学号" prop="no">
                    <el-input v-model="ruleForm.no" placeholder="请输入学号"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="pw" v-if="type === 'add'">
                    <el-input v-model="ruleForm.pw" placeholder="若不填则默认为学号" type="password"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex">
                        <el-radio label="male">男</el-radio>
                        <el-radio label="female">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="二级学院" prop="college">
                    <el-input v-model="ruleForm.college" placeholder="请输入二级学院"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
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
                return this.type === 'add' ? '添加学生' : '编辑学生';
            }
        },
        data() {
            return {
                ruleForm: {
                    name: '',
                    no: '',
                    pw: '',
                    sex: '',
                    college: '',
                    phone: '',
                },
                rules: {
                    no: [{ required: true, message: '请输入学号', trigger: 'blur' }],
                    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
                    college: [{ required: true, message: '请输入二级学院', trigger: 'blur' }],
                    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
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
                    name: this.editData.student_name,
                    no: this.editData.student_no,
                    pw: this.editData.student_pw,
                    sex: this.editData.student_sex,
                    college: this.editData.student_college,
                    phone: this.editData.student_phone,
                };
            },

            close() {
                this.$emit('close');
            },

            save() {
                this.$refs.ruleForm.validate((valid) => {
                    if (!valid) return;

                    let arg = {
                        id: this.type === 'edit' ? this.editData.student_id : null,
                        student_name: this.ruleForm.name,
                        student_no: this.ruleForm.no,
                        student_pw: this.type === 'add' ? (this.ruleForm.pw || this.ruleForm.no) : null,
                        student_sex: this.ruleForm.sex,
                        student_college: this.ruleForm.college,
                        student_phone: this.ruleForm.phone,
                    };
                    this.postRequest('students_save', arg, this.initSave);
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
