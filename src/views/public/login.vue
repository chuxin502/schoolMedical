<template>
    <div class="login">
        <div class="login-head">
            <img src="../../assets/img/logo.png">
            <div class="login-head-text">
                <div>广东技术师范学院</div>
                <div>校园医疗信息系统(HIS)</div>
            </div>
        </div>
        <div class="login-content">
            <div class="left-box"></div>
            <div class="right-box">
                <p>用户登录</p>
                <el-form
                    class="custom-el-form"
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="60px">
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="ruleForm.account" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pw">
                        <el-input v-model="ruleForm.pw" placeholder="请输入密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="type" class="account-type">
                        <el-radio-group class="login-radio" v-model="ruleForm.type">
                            <el-radio :label="1">学生</el-radio>
                            <el-radio :label="2">医生</el-radio>
                            <el-radio :label="3">管理员</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-button class="login-btn" type="primary" @click="login">登录</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                ruleForm: {
                    account: '',
                    pw: '',
                    type: '',
                },
                rules: {
                    account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                    pw: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                    type: [{ required: true, message: '请选择用户类型', trigger: 'change' }],
                },
                notices: [],                // 公告列表
            }
        },
        methods: {
            // 请求数据
            askData() {
                let arg = {
                    pageSize: 5,
                };
                this.getRequest('notices_list', arg, this.initData);
            },

            // 初始化数据
            initData(data) {
                data.Data.forEach((item) => {
                    item.notice_update_time = item.notice_update_time.getDate();
                });
                this.notices = data.Data;
            },

            goHome() {
                this.$message({
                    showClose: true,
                    message: '登录成功！',
                    type: 'success'
                });
                this.$router.push('/');
            },

            login() {
                this.$refs.ruleForm.validate((valid) => {
                    if (!valid) return;

                    let arg = {
                        account: this.ruleForm.account,
                        pw: this.ruleForm.pw,
                        type: this.ruleForm.type,
                    };
                    this.postRequest('auth_sign_in', arg, this.goHome);
                });
            },
        },
        created() {
            this.askData();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .login {
        min-width: 1300px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
        z-index: 1000;
        padding: 0;
        border: 0;
        background: url("../../assets/img/bg.png") no-repeat;
        background-size: 100% 100%;
    }
    .login-head {
        color: white;
        font-size: 20px;
        text-align: center;
        margin-top: 100px;
        img {
            width: 120px;
            position: relative;
            top: 10px;
            margin-left: 20px;
        }
        .login-head-text {
            display: inline-block;
            text-align: left;
            div:first-child {
                font-size: 42px;
            }
            div:last-child {
                font-size: 48px;
            }
        }
    }
    .login-content {
        width: 990px;
        height: 510px;
        border-radius: 15px;
        background-color: white;
        /*margin-top: 40px;*/
        text-align: center;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        overflow: hidden;
    }
    .left-box {
        width: 50%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: url("../../assets/img/Stethoscope.jpg") no-repeat;
    }
    .right-box {
        width: 50%;
        padding: 80px;
        float: right;
        margin-left: 24px;
        display: inline-block;
        vertical-align: top;
        p {
            font-size: 26px;
            color: #409EFF;
            font-weight: bold;
            text-align: center;
            margin-bottom: 40px;
            letter-spacing: 1px;
        }
    }
    .login-btn {
        width: 80%;
        border-radius: 25px;
        margin-top: 20px;
    }
    .account-type {
        text-align: left;
    }
</style>
<style lang="scss" rel="stylesheet/scss">
    .login {
        .el-radio+.el-radio {
            margin-left: 10px;
        }
    }
</style>
