<template>
  <div class="AgencyFee">
    <h6>代理结算</h6>
    <div class="AgencyFee_foot">
      甲方按照乙方代理区域内符合甲方业务流程要求的每笔商户订单甲方实提佣金为依据，支付乙方
      <input type="text" :placeholder="init.agent_get_order_rate||'10%'" v-model.trim='formData.agent_get_order_rate' class=""/>
      的费用做为区域维护费，每周结算一次。
    </div>
    <div class="AgencyFee_foot" style="padding-bottom: 30px;">
      由乙方独自开发的商户（以APP系统数据为准），甲方额外支付乙方对应每笔订单实提佣金的
      <input type="text" :placeholder="init.agent_get_own_order_rate||'50%'" v-model.trim='formData.agent_get_own_order_rate' class=""/>
      做为终端服务费。
    </div>
    <el-row class="inputes AgencyFee_but">
      <el-button @click="confirmEdit()">保存</el-button>
    </el-row>
  </div>
</template>
<script>


  export default {
    data() {
      return {
        formData:{
          agent_get_order_rate:'',
          agent_get_own_order_rate:'',
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
        var user = JSON.parse(sessionStorage.getItem('user'))
        const formDatas=new FormData()
        formDatas.append('agent_get_order_rate',this_.formData.agent_get_order_rate||this_.init.agent_get_order_rate)//省
        formDatas.append('agent_get_own_order_rate',this_.formData.agent_get_own_order_rate||this_.init.agent_get_own_order_rate)//市
        formDatas.append('user_id',user.id)//法人姓名
        this.axios({
          method: "POST",
          url: this.$local.http+this.$api.orderRateSet,
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
          this.$message({
            message:res.data.msg,
            type: 'error'
          })
        })
      },
      initAgentFeeSet(){
        var user = JSON.parse(sessionStorage.getItem('user'))
        const formDatas=new FormData()
        formDatas.append('user_id',user.id)//法人姓名
        this.axios({
          method: "POST",
          url:this.$local.http+this.$api.initAgentFeeSet,
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
  .AgencyFee_foot{font-size: 14px;color: #000;padding-bottom: 15px;text-indent: 2em;}
  .AgencyFee_foot input{width: 60px;line-height: 24px;padding-left: 10px;}
  .AgencyFee_but{position: absolute;right: 0;bottom: 10px;}
</style>
