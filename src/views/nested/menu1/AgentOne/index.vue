<template>
  <div class="AgencyFee">
     <h6>省县乡村代理费用</h6>
     <div class="AgencyFee_con">
       <ul>
         <li>
           <p class="fl">村代理费</p>
           <input type="text" :placeholder="init.village_agent_fee||'请输入'" class="fl" v-model.trim='formData.village_agent_fee'/>
         </li>
         <li>
           <p class="fl">抽成百分比</p>
           <input type="text" :placeholder="init.royalty_rate||'请输入'" class="fl" v-model.trim='formData.royalty_rate'/>
         </li>
         <li>
           <p class="fl">所需缴纳定金</p>
           <input type="text" :placeholder="init.agent_earnest_money||'请输入'" class="fl" v-model.trim='formData.agent_earnest_money'/>
         </li>
       </ul>
     </div>
     <h6>代理费结算</h6>
       <div class="AgencyFee_foot">
         甲方按照乙方代理区域内符合甲方业务流程要求的下一层级代理商实缴代理费为依据，支付乙方
         <input type="text" :placeholder="init.lower_levelagent_fee_rate||'80%'" class="" v-model.trim='formData.lower_levelagent_fee_rate'/>
         的费用做为区域代理管理费（例：县区级代理商计提乡镇级代理费、乡镇级代理商计提村社级代理费），每周结算一次。
       </div>
       <div class="AgencyFee_foot" style="padding-bottom: 30px;">
         若乙方下一层级代理商成功开发自身下一层级代理商，甲方可向乙方支付对应实缴费用的
         <input type="text" :placeholder="init.lower_lower_levelagent_fee_rate||'10%'" class="" v-model.trim='formData.lower_lower_levelagent_fee_rate'/>
         做为区域统筹管理费
     </div>
    <el-row class="inputes AgencyFee_but">
      <el-button @click="confirmEdit()">保存代理修改</el-button>
    </el-row>
     <!--<div class="AgencyFee_but pointer" @click="confirmEdit()">保存</div>-->

  </div>
</template>
<script>
  export default {
    data() {
      return {
        formData: {
          village_agent_fee: '',
          royalty_rate: '',
          agent_earnest_money:'',
          lower_levelagent_fee_rate:'',
          lower_lower_levelagent_fee_rate:'',
        },
        init:[],
      }
    },
    mounted() {
      this.initAgentFeeSet();
    },
    methods: {
      confirmEdit() {
        let this_ = this;
        var user = JSON.parse(sessionStorage.getItem('user'))
        const formDatas=new FormData()
        formDatas.append('village_agent_fee',this_.formData.village_agent_fee||this_.init.village_agent_fee)//省
        formDatas.append('royalty_rate',this_.formData.royalty_rate||this_.init.royalty_rate)//市
        formDatas.append('agent_earnest_money',this_.formData.agent_earnest_money||this_.init.agent_earnest_money)//代理保证金
        formDatas.append('lower_levelagent_fee_rate',this_.formData.lower_levelagent_fee_rate||this_.init.lower_levelagent_fee_rate)//电话
        formDatas.append('lower_lower_levelagent_fee_rate',this_.formData.lower_lower_levelagent_fee_rate||this_.init.lower_lower_levelagent_fee_rate)//法人姓名
        formDatas.append('user_id',user.id)//法人姓名
        this.axios({
              method: "POST",
              url: this.$local.http+this.$api.agentFeeSet,
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
        var user = JSON.parse(sessionStorage.getItem('user'))
        const formDatas=new FormData()
        formDatas.append('user_id',user.id)//法人姓名
        this.axios({
          method: "POST",
          url: this.$local.http+this.$api.initAgentFeeSet,
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
  .AgencyFee_but{left: 38%;bottom: 10px;}

</style>
