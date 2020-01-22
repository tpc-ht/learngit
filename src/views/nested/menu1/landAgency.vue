<template>
    <div class="AgencyFee">
        <h6>活动期</h6>
         <div class="AgencyFee_foot">
             县区级代理费=所属乡镇数量  *  每个
                <input type="text" :placeholder="init.land_activity_country_earnest_money||'10000'" v-model.trim='formData.land_activity_country_earnest_money'/> 元；
         </div>
         <div class="AgencyFee_foot">
             乡镇级代理费=所属村社数量  *  每个
             <input type="text" :placeholder="init.land_activity_town_earnest_money||'5000'"  v-model.trim='formData.land_activity_town_earnest_money'/> 元；
         </div>
         <div class="AgencyFee_foot">
                村社级收取代理费=
                <input type="text" :placeholder="init.land_activity_village_agent_fee||'3000'" v-model.trim='formData.land_activity_village_agent_fee'/> 元；
         </div>
        <h6>非活动期</h6>
        <div class="AgencyFee_foot">
            县区级代理费=所属乡镇数量  *  每个
            <input type="text" :placeholder="init.land_country_agent_fee||'3000'" class="" v-model.trim='formData.land_country_agent_fee'/>
            元
        </div>
        <div class="AgencyFee_foot">
            乡镇级代理费=所属村社数量  *  每个
            <input type="text" :placeholder="init.land_town_agent_fee||'1000'" class="" v-model.trim='formData.land_town_agent_fee'/> 元，
            *  其中甲方（平台）收取
            <input type="text" :placeholder="init.land_town_sl_get_fee_rate||'30%'" class="" v-model.trim='formData.land_town_sl_get_fee_rate'/>
            服务费用，剩余
            <input type="text" :placeholder="init.land_town_sl_agent_fee_rate||'70%'" class="" v-model.trim='formData.land_town_sl_agent_fee_rate'/>
            的费用由甲方支付给区域内上一级代理商（即：县区级合伙人计提乡镇级信息代理定金）；
        </div>
        <div class="AgencyFee_foot">
            村社级代理费=
            <input type="text" :placeholder="init.land_village_agent_fee||'5000'" class="" v-model.trim='formData.land_village_agent_fee'/> 元，
            *  其中甲方（平台）收取
            <input type="text" :placeholder="init.land_village_sl_get_fee_rate||'30%'" class="" v-model.trim='formData.land_village_sl_get_fee_rate'/>
            服务费用，剩余
            <input type="text" :placeholder="init.land_village_sl_agent_fee_rate||'70%'" class="" v-model.trim='formData.land_village_sl_agent_fee_rate'/>
            的费用由甲方支付给区域内上一级代理商（即：县区级合伙人计提乡镇级信息代理定金）；
        </div>
        <div class="AgencyFee_but pointer" @click="confirmEdit()">保存</div>
    </div>
</template>

<script>
    export default {
        name: "landAgency",
        data() {
            return {
                formData: {
                    land_activity_country_earnest_money: '',
                    land_activity_town_earnest_money: '',
                    land_activity_village_agent_fee:'',
                    land_country_agent_fee:'',
                    land_town_agent_fee:'',
                    land_town_sl_get_fee_rate:'',
                    land_town_sl_agent_fee_rate:'',
                    land_village_agent_fee:'',
                    land_village_sl_get_fee_rate:'',
                    land_village_sl_agent_fee_rate:'',
                },
                init:[],
            }
        },
        mounted() {
            this.initAgentFeeSet()
        },
        methods: {
            confirmEdit() {
                let this_ = this;
                var user=JSON.parse(sessionStorage.getItem('user'))
                const formDatas=new FormData()
                formDatas.append('land_activity_country_earnest_money',this_.formData.land_activity_country_earnest_money||this_.init.land_activity_country_earnest_money)//省
                formDatas.append('land_activity_town_earnest_money',this_.formData.land_activity_town_earnest_money||this_.init.land_activity_town_earnest_money)//市
                formDatas.append('land_activity_village_agent_fee',this_.formData.land_activity_village_agent_fee||this_.init.land_activity_village_agent_fee)//区
                formDatas.append('land_country_agent_fee',this_.formData.land_country_agent_fee||this_.init.land_country_agent_fee)//电话
                formDatas.append('land_town_agent_fee',this_.formData.land_town_agent_fee||this_.init.land_town_agent_fee)//法人姓名
                formDatas.append('land_town_sl_get_fee_rate',this_.formData.land_town_sl_get_fee_rate||this_.init.land_town_sl_get_fee_rate)//法人姓名
                formDatas.append('land_town_sl_agent_fee_rate',this_.formData.land_town_sl_agent_fee_rate||this_.init.land_town_sl_agent_fee_rate)//法人姓名
                formDatas.append('land_village_agent_fee',this_.formData.land_village_agent_fee||this_.init.land_village_agent_fee)//法人姓名
                formDatas.append('land_village_sl_get_fee_rate',this_.formData.land_village_sl_get_fee_rate||this_.init.land_village_sl_get_fee_rate)//法人姓名
                formDatas.append('land_village_sl_agent_fee_rate',this_.formData.land_village_sl_agent_fee_rate||this_.init.land_village_sl_agent_fee_rate)//法人姓名
                formDatas.append('user_id',user.id)//法人姓名
                this.axios({
                    method: "POST",
                    url: this.$local.http+this.$api.landAgentFeeSet,
                    data:formDatas,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    console.log(res)
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
                    this.$message.error(res.data.msg);

                })
            },
            initAgentFeeSet(){
                const formDatas=new FormData()
                this.axios({
                    method: "POST",
                    url: this.$local.http+this.$api.initLandAgentFeeSet,
                    data:formDatas,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    if (res.data.success) {
                        this.init=res.data.data
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
    .AgencyFee h6{font-size: 16px;color: #000;margin: 20px 0;}
    .AgencyFee_con ul li{overflow: hidden;padding: 10px 0;}
    .AgencyFee_con ul li p{font-size: 14px;line-height: 34px;padding: 0 15px;color: #000;width: 140px;}
    .AgencyFee_con ul li input{width: 300px;line-height: 30px;padding-left: 10px;}
    .AgencyFee_foot{font-size: 14px;color: #000;padding-bottom: 15px;text-indent: 2em;}
    .AgencyFee_foot input{width: 60px;line-height: 24px;padding-left: 10px;}
    .AgencyFee_but{width: 60px;line-height: 26px;text-align: center;border-radius: 5px;border: 1px solid #909399;margin-left: 5%;color: #000;}
</style>