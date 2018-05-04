<template>
    <eleSide title="诊断" @close="close">
        <div slot="content">
            <el-form
                class="custom-el-form"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-position="top">
                <el-form-item label="病症" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入病症"></el-input>
                </el-form-item>
                <el-form-item label="药品" prop="medicine">
                    <i class="add-btn el-icon-circle-plus" @click="addMedicine"></i>
                    <el-table :data="ruleForm.prescript" border>
                        <el-table-column prop="name" label="药品" align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.medicine" placeholder="请选择药品" size="small" value-key="medicine_id">
                                    <el-option
                                        v-for="medicine in medicines"
                                        :key="medicine.medicine_id"
                                        :label="medicine.medicine_name"
                                        :value="medicine">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="unit" label="单位" align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.unit" placeholder="请选择单位" size="small">
                                    <el-option
                                        v-for="(unit,index) in units"
                                        :key="index"
                                        :label="unit"
                                        :value="unit">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="num" label="数量" align="center">
                            <template slot-scope="scope">
                                <el-input-number size="small" v-model="scope.row.num" :min="0"></el-input-number>
                            </template>
                        </el-table-column>
                    </el-table>
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
