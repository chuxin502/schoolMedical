<template>
    <div class="login">
        <div class="login-head">
            <img src="../../assets/img/logo.png">
            <div>校园医疗信息系统</div>
        </div>
        <div class="login-content">
            <div class="notice">
                <div class="notice-head">
                    <span class="notice-title">通知公告</span>
                    <span class="notice-more">more>></span>
                </div>
                <div class="notice-box">
                    <div class="notice-info">胃溃疡</div>
                    <div class="notice-date">2018-04-12</div>
                </div>
            </div>
            <div class="login-box">
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
                        <el-input v-model="ruleForm.pw" placeholder="请输入密码"></el-input>
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
                }
            }
        },
        methods: {
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
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .login {
        min-width: 1300px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
        z-index: 1000;
        padding: 0;
        border: 0;
    }
    .login-head {
        height: 80px;
        line-height: 80px;
        color: white;
        font-size: 20px;
        background-color: rgb(236,50,71);
        img {
            width: 70px;
            margin-top: 5px;
            margin-left: 20px;
        }
        div {
            vertical-align: top;
            display: inline-block;
        }
    }
    .login-content {
        margin-top: 40px;
        overflow: hidden;
        text-align: center;
    }
    .notice {
        width: 770px;
        height: 280px;
        border: 1px solid #cccccc;
        box-shadow: 0 0 10px #cccccc;
       display: inline-block;
        vertical-align: top;
        padding: 20px;
        text-align: left;
        border-radius: 5px;
    }
    .notice-more {
        float: right;
        cursor: pointer;
    }
    .notice-head {
        line-height: 26px;
        margin-bottom: 10px;
    }
    .notice-title {
        font-size: 20px;
        color: rgb(236,50,71);
    }
    .notice-box {
        border-bottom: 1px dashed #cccccc;
        overflow: hidden;
        height: 30px;
        line-height: 30px;
    }
    .notice-info {
        width: 600px;
        font-size: 17px;
        float: left;
    }
    .notice-date {
        float: right;
        font-size: 14px;
    }
    .login-box {
        width: 370px;
        height: 320px;
        border: 1px solid rgb(236,50,71);
        padding: 20px;
        margin-left: 24px;
        display: inline-block;
        vertical-align: top;
        p {
            text-align: left;
            font-size: 18px;
            color: #324057;
            margin-bottom: 20px;
        }
    }
    .login-btn {
        width: 100%;
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
