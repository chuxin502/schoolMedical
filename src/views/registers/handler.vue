<template>
    <eleSide :title="title" @close="close">
        <div slot="content">
            <el-form class="custom-el-form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
                <el-form-item label="预约学生" prop="student" v-if="userInfo.type !== 1">
                    <el-select v-model="ruleForm.student" placeholder="请选择预约学生">
                        <el-option
                            v-for="student in students"
                            :key="student.student_id"
                            :label="student.student_name"
                            :value="student.student_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="预约时间" prop="time">
                    <el-date-picker
                        v-model="ruleForm.time"
                        type="datetime"
                        placeholder="请选择预约时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="科目" prop="subject">
                    <el-radio-group v-model="ruleForm.subject">
                        <el-radio :label="1">内科</el-radio>
                        <el-radio :label="2">外科</el-radio>
                    </el-radio-group>
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
            // let checkEndTime = (rule, value, callback) => {
            //     if (!value) {
            //         return callback(new Error('请选择结束时间'));
            //     }
            //
            //     if (!this.ruleForm.startTime) {
            //         return callback();
            //     }
            //
            //     if (this.ruleForm.startTime.getTime() >= value.getTime()) {
            //         return callback(new Error('结束时间需晚于开始时间'));
            //     }
            //     callback();
            // };
            return {
                ruleForm: {
                    student: '',
                    time: '',
                    subject: '',
                },
                rules: {
                    student: [{ required: true, message: '请选择预约学生', trigger: 'change', type: 'number' }],
                    time: [{ required: true, message: '请选择预约时间', trigger: 'change', type: 'date' }],
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
    .foot-btn {
        width: 90px;
        float: right;
        &+& {
            margin-right: 10px;
        }
    }
</style>
