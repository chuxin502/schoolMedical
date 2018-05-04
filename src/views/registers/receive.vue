<template>
    <eleSide title="收款" @close="close">
        <div slot="content">
            <el-table :data="editData.register_prescript" border>
                <el-table-column prop="name" label="药品" align="center"></el-table-column>
                <el-table-column prop="num" label="数量" align="center"></el-table-column>
                <el-table-column prop="price" label="单价" align="center"></el-table-column>
                <el-table-column prop="total" label="总价" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.num * scope.row.price}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <p class="total">总计：{{total}}元</p>
            <div class="side-foot">
                <el-button type="primary" class="foot-btn" @click="save">确认收款</el-button>
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
            },
            total() {
                return this.editData.register_prescript.map(medicine => medicine.num * medicine.price).reduce((a, b) => a + b);
            }
        },
        data() {
            return {
            }
        },
        props: {
            editData: Object,
        },
        methods: {
            close() {
                this.$emit('close');
            },

            save() {
                let arg = {
                    id: this.editData.register_id,
                };
                console.log(arg);
                this.postRequest('registers_receive', arg, this.initSave);
            },

            initSave() {
                this.$emit('success');
            }
        },
        created() {
            console.log(this.editData);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .side-foot {
        margin-top: 50px;
        overflow: hidden;
    }
    .total {
        margin-top: 30px;
        text-align: right;
        margin-right: 20px;
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
