<template>
    <eleSide :title="title" @close="close">
        <div slot="content">
            <el-form class="custom-el-form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
                <el-form-item label="药品名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入药品名称"></el-input>
                </el-form-item>
                <el-form-item label="药品编号" prop="type">
                    <el-input v-model="ruleForm.type" placeholder="请输入药品编号"></el-input>
                </el-form-item>
                <el-form-item label="药品规格" prop="standard">
                    <el-input v-model="ruleForm.standard" placeholder="请输入药品规格"></el-input>
                </el-form-item>
                <el-form-item label="限制范围" prop="range">
                    <el-input v-model="ruleForm.range" placeholder="请输入限制范围"></el-input>
                </el-form-item>
                <el-form-item label="库存" prop="stock">
                    <el-input v-model="ruleForm.stock" placeholder="请输入库存"></el-input>
                </el-form-item>
                <el-form-item label="药品售价" prop="price">
                    <el-input v-model="ruleForm.price" placeholder="请输入药品售价"></el-input>
                </el-form-item>
                <el-form-item label="主要功效" prop="describe">
                    <el-input v-model="ruleForm.describe" placeholder="请输入主要功效"></el-input>
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
                return this.type === 'add' ? '添加药品' : '编辑药品';
            }
        },
        data() {
            return {
                ruleForm: {
                    name: '',
                    type: '',
                    standard: '',
                    range: '',
                    stock: '',
                    price: '',
                    describe: '',
                },
                rules: {
                    name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    type: [{required: true, message: '请输入药品编号', trigger: 'blur'}],
                    standard: [{required: true, message: '请输入药品规格', trigger: 'blur'}],
                    range: [{required: true, message: '请输入限制范围', trigger: 'blur'}],
                    stock: [{required: true, message: '请输入库存', trigger: 'blur'}],
                    price: [{required: true, message: '请输入药品售价', trigger: 'blur'}],
                    describe: [{required: true, message: '请输入主要功效', trigger: 'blur'}],
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
                    name: this.editData.medicine_name,
                    type: this.editData.medicine_type,
                    standard: this.editData.medicine_standard,
                    range: this.editData.medicine_range,
                    stock: this.editData.medicine_stock,
                    price: this.editData.medicine_price,
                    describe: this.editData.medicine_describe,
                };
            },

            close() {
                this.$emit('close');
            },

            save() {
                this.$refs.ruleForm.validate((valid) => {
                    if (!valid) return;

                    let arg = {
                        id: this.type === 'edit' ? this.editData.medicine_id : null,
                        medicine_name: this.ruleForm.name,
                        medicine_type: this.ruleForm.type,
                        medicine_standard: this.ruleForm.standard,
                        medicine_range: this.ruleForm.range,
                        medicine_stock: this.ruleForm.stock,
                        medicine_price: this.ruleForm.price,
                        medicine_describe: this.ruleForm.describe,
                    };
                    console.log(arg);
                    this.postRequest('medicines_save', arg, this.initSave);
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
