<template>
    <div class="AgencyFee">
        <h6>每日买酒金额上限</h6>
        <div class="buylimit2">
            <div>
                <div class="buylimit1">团队长上限(单位：元)</div>
                <input type="text" :placeholder="initBuyLimit.wjs_headman_buy_limit||'请输入'" v-model.trim='formData.wjs_headman_buy_limit'/>
            </div>
            <div>
                <div class="buylimit1">普通会员上限(单位：元)</div>
                <input type="text" :placeholder="initBuyLimit.wjs_user_buy_limit||'请输入'" v-model.trim='formData.wjs_user_buy_limit'/>
            </div>
            <el-row class="buylimit3">
                <el-button  @click="saveBuyLimit()">保存购买上限修改</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ruleCommunication",
        data() {
            return {
                formData: {
                    wjs_headman_buy_limit:'',
                    wjs_user_buy_limit:'',
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
                    url: this.$local.http+this.$api.queryWjsBuyLimit,
                    data:"",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    if (res.data.success) {
                        this.initBuyLimit=res.data.data
                        console.log(this.initBuyLimit)
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
                formDatas.append('wjs_headman_buy_limit',this_.formData.wjs_headman_buy_limit||this_.initBuyLimit.wjs_headman_buy_limit)//团队长购买上限
                formDatas.append('wjs_user_buy_limit',this_.formData.wjs_user_buy_limit||this_.initBuyLimit.wjs_user_buy_limit)//普通会员购买上限
                this.axios({
                    method: "POST",
                    url: this.$local.http+this.$api.updateWjsBuyLimit,
                    data:formDatas,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    if (res.data.success) {
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        })
                    }else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    })
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