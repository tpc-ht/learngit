<template>
    <div class="AgencyFee">
        <div class="buylimit2">
            <div>
                <div class="buylimit1">搜了贝抵扣金额</div>
                <input type="text" :placeholder="initBuyLimit.slb_price||'请输入'" v-model.trim='formData.wjs_headman_buy_limit'/>
            </div>
            <div>
                <div class="buylimit1">搜了贝抵扣数量</div>
                <input type="text" :placeholder="initBuyLimit.slb_pay_num||'请输入'" v-model.trim='formData.slb_pay_num'/>
            </div>
            <div>
                <div class="buylimit1">积分抵扣金额</div>
                <input type="text" :placeholder="initBuyLimit.sl_integral_price||'请输入'" v-model.trim='formData.wjs_user_buy_limit'/>
            </div>
            <div>
                <div class="buylimit1">积分抵扣数量</div>
                <input type="text" :placeholder="initBuyLimit.sl_integral_num||'请输入'" v-model.trim='formData.sl_integral_num'/>
            </div>
            <el-row class="buylimit3">
                <el-button  @click="saveBuyLimit()">保存</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "paymentDeduction",
        data() {
            return {
                formData: {
                    wjs_headman_buy_limit:'',
                    wjs_user_buy_limit:'',
                    slb_pay_num:'',
                    sl_integral_num:'',
                },
                initBuyLimit:[],
            }
        },
        mounted() {
            this.initBuyLimitSet();
        },
        methods: {
            //初始化购买上限数据
            initBuyLimitSet(){
                this.axios({
                    method: "POST",
                    url: this.$local.http+this.$api.queryRuleInfo,
                    data:"",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    if (res.data.success) {
                        this.initBuyLimit=res.data.data;
                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    })
                })
            },
            //保存购买上限
            saveBuyLimit(){
                let this_ = this;
                const formDatas=new FormData()
                formDatas.append('slb_price',this_.formData.wjs_headman_buy_limit||this_.initBuyLimit.slb_price);//SLB兑换价格
                formDatas.append('sl_integral_price',this_.formData.wjs_user_buy_limit||this_.initBuyLimit.sl_integral_price);//积分兑换价格
                formDatas.append('slb_pay_num',this_.formData.slb_pay_num||this_.initBuyLimit.slb_pay_num);//SLB兑换数量
                formDatas.append('sl_integral_num',this_.formData.sl_integral_num||this_.initBuyLimit.sl_integral_num);//积分兑换数量
                this.axios({
                    method: "POST",
                    url: this.$local.http+this.$api.updateRuleInfo,
                    data:formDatas,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    if (res.data.success) {
                        this.$message({message:res.data.msg, type: 'success'});
                        this.initBuyLimitSet();
                    }else {
                        this.$message({message: res.data.msg, type: 'warning'});
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'})
                })
            },
        }
    }
</script>

<style scoped>
    .AgencyFee{width: 100%;background-color: #fff;padding: 20px;}
    h6{font-size: 16px;color: #000;margin: 20px 0;}
    .buylimit1{
        font-size: 14px;
        line-height: 34px;
        padding:15px 20px 15px 0;
        color: #000;
        width: 200px;

    }
    .buylimit2 input{
        width: 300px;
        line-height: 30px;
        padding-left: 10px;
    }
    .buylimit3{
        margin-top: 20px;
    }
</style>