<template>
    <eleSide title="修改密码" @close="close">
        <div slot="content">
            <el-form class="custom-el-form" :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top">
                <el-form-item label="原密码" prop="oldPW">
                    <el-input v-model="ruleForm.oldPW" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPW">
                    <el-input v-model="ruleForm.newPW" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="repeatPW">
                    <el-input v-model="ruleForm.repeatPW" placeholder="请重复新密码"></el-input>
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
            userInfo() {
                return system.getters.getUserInfo;
            }
        },
        data() {
            let checkPW = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请重复新密码'));
                }

                if (!this.ruleForm.newPW) {
                    return callback();
                }

                if (value !== this.ruleForm.newPW) {
                    return callback(new Error('两次密码输入不一致'));
                }

                callback();
            };

            return {
                ruleForm: {
                    oldPW: '',
                    newPW: '',
                    repeatPW: '',
                },
                rules: {
                    oldPW: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
                    newPW: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
                    repeatPW: [{ required: true, trigger: 'blur', validator: checkPW }],
                },
                students: []
            }
        },
        props: {
        },
        methods: {
            close() {
                this.$emit('close');
            },

            save() {
                this.$refs.ruleForm.validate((valid) => {
                    if (!valid) return;

                    let arg = {
                        oldPW: this.ruleForm.oldPW,
                        newPW: this.ruleForm.newPW,
                    };
                    this.postRequest('auth_edit_pw', arg, this.initSave);
                });
            },

            initSave() {
                this.$emit('success');
            }
        },
        created() {
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
