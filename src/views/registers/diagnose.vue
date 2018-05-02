<template>
    <eleSide title="诊断" @close="close">
        <div slot="content">
            <el-form
                class="custom-el-form"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-position="top">
                <el-form-item label="疾病名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入疾病名称"></el-input>
                </el-form-item>
                <el-form-item label="药品" prop="student">
                    <el-select v-model="ruleForm.student" placeholder="请选择预约学生" class="full-width">
                        <el-option
                            v-for="student in students"
                            :key="student.student_id"
                            :label="student.student_name"
                            :value="student.student_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remake">
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入备注"
                        v-model="ruleForm.remake">
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="side-foot">
                <el-button type="primary" class="foot-btn" @click="save">确定</el-button>
                <el-button class="foot-btn" @click="close">取消</el-button>
            </div>
        </div>
    </eleSide>
</template>

<script type="text/babel">
    import system from 'Vuex/store/system'
    import eleSide from 'components/eleSide'

    export default {
        components: {eleSide},
        computed: {
            title() {
                return this.type === 'add' ? '添加挂号' : '编辑挂号';
            },
            userInfo() {
                return system.getters.getUserInfo;
            }
        },
        data() {
            return {
                ruleForm: {
                    student: '',
                    time: '',
                    subject: '',
                },
                rules: {
                    student: [{ required: true, message: '请选择预约学生', trigger: 'change', type: 'number' }],
                    name: [{ required: true, message: '请选择预约时间', trigger: 'blur', type: 'date' }],
                    subject: [{ required: true, message: '请选择科目', trigger: 'change', type: 'number' }],
                },
                students: []
            }
        },
        props: {
            type: String,
            editData: Object,
        },
        methods: {
            askStudents() {
                let arg = {
                    pageIndex: 1,
                    pageSize: 100000,
                };
                this.getRequest('students_list', arg, this.initStudents);
            },

            initStudents(data) {
                this.students = data.Data;
            },

            initData() {
                this.ruleForm = {
                    student: this.editData.register_student_id,
                    time: this.editData.register_time.getDateObj(),
                    subject: this.editData.register_subject,
                };
                console.log(this.ruleForm.time);
            },

            close() {
                this.$emit('close');
            },

            save() {
                this.$refs.ruleForm.validate((valid) => {
                    if (!valid) return;

                    let arg = {
                        id: this.type === 'edit' ? this.editData.register_id : null,
                        register_time: this.ruleForm.time.getTime(),
                        register_subject: this.ruleForm.subject,
                        register_student_id: this.userInfo.type === 1 ? this.userInfo.id : this.ruleForm.student,
                    };
                    this.postRequest('registers_save', arg, this.initSave);
                });
            },

            initSave() {
                this.$emit('success');
            }
        },
        created() {
            this.askStudents();
            if (this.type === 'edit') {
                this.initData();
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .side-foot {
        margin-top: 50px;
        overflow: hidden;
    }
    .foot-btn {
        width: 90px;
        float: right;
        &+& {
            margin-right: 10px;
        }
    }
</style>
