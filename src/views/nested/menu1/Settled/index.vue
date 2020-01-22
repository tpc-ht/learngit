<template>
  <div class="AgencyFee">
    <h6>商家入驻费</h6>
    <div class="AgencyFee_con">
      <ul>
        <li>
          <h5 class="h5">（入驻类型）</h5>
          <h5 class="h51">（入驻费用）</h5>
        </li>
        <li v-for="(item,$index) in init.join_fee_list" :key="$index">
          <p class="fl">{{item.typeName}}</p>
          <input type="text" :placeholder="(item.joinFee||'0')||'请输入'" :name=item.typeName class="fl" v-model.trim='item.joinFee'/>
        </li>
        <!--<li>-->
          <!--<p class="fl">{{init.join_fee_list[1].typeName}}</p>-->
          <!--<input type="text" :placeholder="init.join_fee_list[1].joinFee||'请输入'" class="fl" v-model.trim='data.joinFee1'/>-->
        <!--</li>-->
        <!--<li>-->
          <!--<p class="fl">{{init.join_fee_list[2].typeName}}</p>-->
          <!--<input type="text" :placeholder="init.join_fee_list[2].joinFee||'请输入'" class="fl" v-model.trim='data.joinFee2'/>-->
        <!--</li>-->
        <!--<li>-->
          <!--<p class="fl">{{init.join_fee_list[3].typeName}}</p>-->
          <!--<input type="text" :placeholder="init.join_fee_list[3].joinFee||'请输入'" class="fl" v-model.trim='data.joinFee3'/>-->
        <!--</li>-->
        <!--<li>-->
          <!--<p class="fl">{{init.join_fee_list[4].typeName}}</p>-->
          <!--<input type="text" :placeholder="init.join_fee_list[4].joinFee||'请输入'" class="fl" v-model.trim='data.joinFee4'/>-->
        <!--</li>-->
        <!--<li>-->
          <!--<p class="fl">{{init.join_fee_list[5].typeName}}</p>-->
          <!--<input type="text" :placeholder="init.join_fee_list[5].joinFee||'请输入'" class="fl" v-model.trim='data.joinFee5'/>-->
        <!--</li>-->
        <!--<li>-->
          <!--<p class="fl">{{init.join_fee_list[6].typeName}}</p>-->
          <!--<input type="text" :placeholder="init.join_fee_list[6].joinFee||'请输入'" class="fl" v-model.trim='data.joinFee6'/>-->
        <!--</li>-->
        <!--<li>-->
          <!--<p class="fl">{{init.join_fee_list[7].typeName}}</p>-->
          <!--<input type="text" :placeholder="init.join_fee_list[7].joinFee||'请输入'" class="fl" v-model.trim='data.joinFee7'/>-->
        <!--</li>-->
        <!--<li>-->
          <!--<p class="fl">{{init.join_fee_list[8].typeName}}</p>-->
          <!--<input type="text" :placeholder="init.join_fee_list[8].joinFee||'请输入'" class="fl" v-model.trim='data.joinFee8'/>-->
        <!--</li>-->
      </ul>
    </div>
    <h6>代理结算</h6>
    <div class="AgencyFee_foot">
      甲方按照乙方代理区域内每个商户入驻平台交纳的技术研发费为依据，支付乙方
      <input type="text" :placeholder="init.agent_get_shop_rate||'10%'" v-model.trim='formData.agent_get_shop_rate'/>
       的费用做为区域服务费，每周结算一次。
    </div>
    <div class="AgencyFee_foot" style="padding-bottom: 30px;">
      由乙方独自开发的商户（以APP系统数据为准），甲方额外支付乙方对应每笔技术研发费的
      <input type="text" :placeholder="init.agent_get_own_shop_rate||'50%'" v-model.trim='formData.agent_get_own_shop_rate'/>
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
          agent_get_shop_rate:'',
          agent_get_own_shop_rate:'',
        },
        data:{
          id:'',
          joinFee:'',
          // joinFee1:'',
          // joinFee2:'',
          // joinFee3:'',
          // joinFee4:'',
          // joinFee5:'',
          // joinFee6:'',
          // joinFee7:'',
          // joinFee8:'',
        },
        init:[],
        dataList:{},
      }
    },
    mounted() {
      this.initAgentFeeSet()

    },
    methods: {
      add(){
        this.dataList.push('tomato');
      },
      confirmEdit() {
        let this_ = this;
        let H = []
        this_.init.join_fee_list.forEach((item, i) => {
          H.push({
              id: item.id,
              joinFee: item.joinFee
            })
        });
        var obj={}
        for (var j in H){
          obj[H[j].id] = ""+H[j].joinFee+"";
        };
         console.log('660',obj)

        var user = JSON.parse(sessionStorage.getItem('user'))
        const formDatas=new FormData()
        formDatas.append('join_fee_list',JSON.stringify(obj))//省
        formDatas.append('agent_get_shop_rate',this_.formData.agent_get_shop_rate||this_.init.agent_get_shop_rate)//省
        formDatas.append('agent_get_own_shop_rate',this_.formData.agent_get_own_shop_rate||this_.init.agent_get_own_shop_rate)//省
        formDatas.append('user_id',user.id)//法人姓名
        this.axios({
          method: "POST",
          url: this.$local.http+this.$api.joinFeeSet,
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
  .AgencyFee_con ul li{overflow: hidden;border: 1px solid #909399;border-top: 0;width: 60%;}
  .AgencyFee_con ul li:nth-child(1){border-top: 1px solid #909399;}
  .h5{font-size: 14px;color: #000;float: left;width: 200px;text-align: center;line-height: 40px;border-right: 1px solid #909399;}
  .h51{font-size: 14px;color: #000;float: left;width: 200px;text-align: center;line-height: 40px;}
  .AgencyFee_con ul li p{font-size: 14px;line-height: 34px;text-align: center;color: #000;width: 200px;border-right: 1px solid #909399;}
  .AgencyFee_con ul li input{width: 50%;line-height: 34px;padding-left: 10px;border: 0;}
  .AgencyFee_foot{font-size: 14px;color: #000;padding-bottom: 15px;text-indent: 2em;}
  .AgencyFee_foot input{width: 60px;line-height: 24px;padding-left: 10px;}
  .AgencyFee_but{position: absolute;right: 0;bottom: 10px;}
</style>
