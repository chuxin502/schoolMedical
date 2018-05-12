<template>
    <div class="notice-handler">
        <div class="notice-head">
            <span class="title">{{title}}</span>
            <router-link to="/notices" class="back">返回>></router-link>
        </div>
        <div class="notice-content">
            <el-form class="custom-form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="ruleForm.title" placeholder="请输入公告标题"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <wang-editor v-model="ruleForm.content"></wang-editor>
                </el-form-item>
            </el-form>
            <div class="hidden">
                <el-button type="primary" class="foot-btn" @click="save">确定</el-button>
                <el-button class="foot-btn" @click="close">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import eleSide from 'components/eleSide'
    import wangEditor from 'components/wangEditor'

    export default {
        components: {eleSide, wangEditor},
        computed: {
            title() {
                return this.$route.query.id ? '编辑公告' : '添加公告';
            }
        },
        data() {
            return {
                ruleForm: {
                    title: '',
                    content: '',
                },
                rules: {
                    title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
                    content: [{ required: true, message: '请输入公告内容', trigger: 'change' }],
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
            },

            save() {
                this.$refs.ruleForm.validate((valid) => {
                    if (!valid) return;

                    let arg = {
                        id: this.type === 'edit' ? this.editData.notice_id : null,
                        notice_title: this.ruleForm.title,
                        notice_content: this.ruleForm.content,
                    };
                    this.postRequest('notices_save', arg, this.initSave);
                });
            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .notice-handler {
        padding: 0;
    }
    .notice-head {
        border-bottom: 20px solid #f2f2f2;
        line-height: 40px;
        padding-left: 20px;
        font-size: 14px;
        .title {
            margin-right: 15px;
        }
        .back {
            font-size: 12px;
            color: #b8b8b8;
        }
    }
    .notice-content {
        width: 800px;
        padding-top: 30px;
        .custom-form {
            padding-bottom: 40px;
        }
    }
    .foot-btn {
        width: 90px;
        float: right;
        &+& {
            margin-right: 10px;
        }
    }
</style>
