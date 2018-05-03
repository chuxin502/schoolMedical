<template>
    <eleSide title="收款" @close="close">
        <div slot="content">
            <el-table :data="editData.register_prescript" border>
                <el-table-column prop="name" label="药品" align="center"></el-table-column>
                <el-table-column prop="num" label="数量" align="center"></el-table-column>
                <el-table-column prop="price" label="单价" align="center"></el-table-column>
                <el-table-column prop="total" label="总计" align="center">
                    <template slot-scope="scope">
                        <el-input-number size="small" v-model="scope.row.num" :min="0"></el-input-number>
                    </template>
                </el-table-column>
            </el-table>
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
                    name: '',
                    prescript: [],
                    remake: '',
                },
                rules: {
                    name: [{required: true, message: '请输入病症', trigger: 'blur'}],
                },
                medicines: [],                      // 药品
                units: ['粒', '瓶', '盒', '包'],          // 药品单位
            }
        },
        props: {
            editData: Object,
        },
        methods: {
            askMedicines() {
                let arg = {
                    pageIndex: 1,
                    pageSize: 100000,
                };
                this.getRequest('medicines_list', arg, this.initMedicines);
            },

            initMedicines(data) {
                this.medicines = data.Data;
            },

            close() {
                this.$emit('close');
            },

            addMedicine() {
                this.ruleForm.prescript.push({medicine: null, unit: '', num: 0});
            },

            save() {
                this.$refs.ruleForm.validate((valid) => {
                    if (!valid) return;

                    let prescript = this.ruleForm.prescript.map((item) => {
                        return {
                            name: item.medicine.medicine_name,
                            price: item.medicine.medicine_price,
                            unit: item.unit,
                            num: item.num,
                        };
                    });
                    let arg = {
                        id: this.editData.register_id,
                        register_disease: this.ruleForm.name,
                        register_prescript: JSON.stringify(prescript),
                        register_remake: this.ruleForm.remake
                    };
                    console.log(arg);
                    this.postRequest('registers_diagnose', arg, this.initSave);
                });
            },

            initSave() {
                this.$emit('success');
            }
        },
        created() {
            this.askMedicines();
            console.log(this.editData);
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
    .add-btn {
        top: -29px;
        left: 34px;
        cursor: pointer;
        position: absolute;
        font-size: 18px;
    }
</style>
