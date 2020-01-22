<template>
  <div class="mod-log">
    <div class="head-ed">
      <ul>
        <li>
          <span class="se-pl">和平村账户</span>
          <div class="inputes">
            <el-input placeholder="请输入" v-model="name" clearable style="width:185px;"></el-input>
          </div>
        </li>
        <li>
          <span class="se-pl">搜了农庄ID</span>
          <div class="inputes">
            <el-input placeholder="请输入" v-model="user_Id" clearable style="width:185px;"></el-input>
          </div>
        </li>
		<li>
		  <span class="se-pl">兑换商品ID</span>
		  <div class="inputes">
		    <el-input placeholder="请输入" v-model="productId" clearable style="width:185px;"></el-input>
		  </div>
		</li>
		
        <li>
          <div class="block">
            <span class="se-pl" style="margin-right:10px;">兑换日期</span>
            <el-date-picker
                    v-model="timer"
                    value-format="timestamp"
                    type="daterange"
                    placeholder="请选择"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </li>
        <li>
          <el-row class="inputes">
            <el-button @click="getList()">查询</el-button>
          </el-row>
        </li>
		<li>
		    <el-row class="inputes">
		        <el-button @click="reset()">重置</el-button>
		    </el-row>
		</li>
        <li>
          <el-row class="inputes">
            <el-button @click='export2Excel()' type='primary'>导出Excel表</el-button>
          </el-row>
        </li>
      </ul>
    </div>
	
	<div class="top-text">
		<h6 class="h-1" v-if="total>0">共{{total}}条记录，{{initData.pages}}页。当前为第{{form.page}}页</h6>
		<h6 class="h-2">合计：兑换总数：<span>{{totalMoney}}</span></h6>
	</div>
    
    <!-- <el-table :data="initData.list" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="user_id" header-align="center" align="center" label="搜了农庄ID" width="140">
      </el-table-column>
      <el-table-column prop="accounts" header-align="center" align="center" label="和平村账户" width="140">
      </el-table-column>
      <el-table-column prop="real_name" header-align="center" align="center" label="和平村真实姓名" width="140">
      </el-table-column>
      <el-table-column prop="phone" header-align="center" align="center" label="联系方式" width="180">
      </el-table-column>
      <el-table-column prop="product_id" header-align="center" align="center" label="兑换商品ID" width="200">
      </el-table-column>
	  <el-table-column prop="productName" header-align="center" align="center" label="兑换商品名" width="200">
	  </el-table-column>
      <el-table-column prop="give_number" header-align="center" align="center" label="兑换数量" width="140">
      </el-table-column>
      <el-table-column prop="update_time" header-align="center" align="center" label="兑换日期" width="200">
      </el-table-column>
    </el-table> -->
	<el-table 
	:data="initData.list" 
	v-loading="this.$store.getters.getLoadingBool"
	element-loading-text="拼命加载中..."
	border fit highlight-current-row style="width: 100%">
	  <el-table-column prop="user_id" header-align="center" align="center" label="搜了农庄ID" >
	  </el-table-column>
	  <el-table-column prop="accounts" header-align="center" align="center" label="和平村账户" min-width="100px">
	  </el-table-column>
	  <el-table-column prop="real_name" header-align="center" align="center" label="和平村真实姓名">
	  </el-table-column>
	  <el-table-column prop="phone" header-align="center" align="center" label="联系方式" min-width="110px">
	  </el-table-column>
	  <el-table-column prop="order_id" header-align="center" align="center" label="订单号" min-width="130px">
	  </el-table-column>
	  <el-table-column prop="product_id" header-align="center" align="center" label="兑换商品ID" min-width="90px">
	  </el-table-column>
	  <el-table-column prop="productName" header-align="center" align="center" label="兑换商品名" >
	  </el-table-column>
	  <el-table-column prop="give_number" header-align="center" align="center" label="兑换数量" >
	  </el-table-column>
	  <el-table-column prop="give_time" header-align="center" align="center" label="兑换日期" min-width="100px">
	  </el-table-column>
	</el-table>
    <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import qs from 'qs'
  export default {
    name: 'mixWine',
      components: { Pagination },
      data() {
        return {
          dialogFormVisible: false,
          form: {
            page: 1,
            limit: 10
          },
          name: '',
          user_Id:'',
          contact: '',
          money:'',
          agentCreateTime:'',
          endtime:'',
          confirmStartTime:'',
          confirmEndTime:'',
          id:'',
          userId:'',
          bankAccount:'',
          timer: [],
          confirmTimer: [],
          formLabelWidth: '120px',
          inList:[],
          initData:[],
          total:'',
          formData:{
            pay_money:'',
            pay_method:'',
            couponsNumber:'',
          },
          tableList:[],
		  totalMoney:0,
		  productId:'',//商品id
        }
      },
      mounted() {this.getList()},
      methods: {
        dialogFormShow(row){
          this.id=row.tr_n;
          this.userId=row.sl_user_id;
          this.bankAccount=row.bankAccount;
          this.dialogFormVisible=true;
        },
        getList(){
			this.$store.commit('setLoadingBool',true);
			  let Time = this.timer;
			  let Start = new Date(Time[0]);
			  let End = new Date(Time[1]);
			  this.agentCreateTime = Start.getTime(); //当前时间转换成long型
			  this.endtime = End.getTime()+Number(86399999); //当前时间转换成long型
			  if (Time[0] == null) {
				this.agentCreateTime ='';
				this.endtime ='';
			  }
			  var data={
				accounts:this.name,
				statTime:this.agentCreateTime,
				endTime:this.endtime,
				userId:this.user_Id,
				pageNum: this.form.page,
				pageSize:this.form.limit,
				productId:this.productId
			  };
			  this.axios({
				method: "post",
				url: this.$local.http+this.$api.financeExchangeList,
				data: qs.stringify(data),
			  }).then(res=>{
				  this.$store.commit('setLoadingBool',false);
				if (res.data.success) {
					this.initData=res.data.data;
					this.total=this.initData.total;
					this.getData();
				}else {
				  this.$message({message:res.data.msg, type: 'error'});
				  this.initData=[]
				}
			  }).catch(res=>{
				this.$message({message:res.data.msg, type: 'error'});
				this.initData=[]
			  })
        },
        // async getData() { //初始化
        getData() { //初始化
			// const loading = this.$loading({lock: true,text: '拼命加载中...'});
		  let Time = this.timer;
		  let Start = new Date(Time[0]);
		  let End = new Date(Time[1]);
		  this.agentCreateTime = Start.getTime(); //当前时间转换成long型
		  this.endtime = End.getTime()+Number(86399999); //当前时间转换成long型
		  if (Time[0] == null) {
			this.agentCreateTime ='';
			this.endtime ='';
		  }
          var data={
            accounts:this.name,
            statTime:this.agentCreateTime,
            endTime:this.endtime,
            userId:this.user_Id,
            pageNum: this.form.page,
            pageSize:this.total,
			productId:this.productId
          }
          // let res = await this.axios({
			this.axios({
				method: "post",
				url: this.$local.http + this.$api.financeExchangeList,
				data: qs.stringify(data),
			  }).then(res=>{
				if (res.data.success) {
				  this.tableList=res.data.data.list;
				  let m = 0;
				  res.data.data.list.forEach(item=>{
					m += item.give_number;
				  })
				  this.totalMoney =m;
					// loading.close();
				}else {
					this.tableList=[];
					this.$message({message:res.data.msg, type: 'error'});
				}
			}).catch(res=>{
				this.$message({message:res.data.msg, type: 'error'});
				this.initData=[]
			})
        },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      export2Excel() {
        this.$confirm('确定要导出表格数据么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
			require.ensure([], () => {
			  const { export_json_to_excel } = require('../../vendor/Export2Excel');
			  const tHeader = ['搜了农庄ID','和平村账户','和平村真实姓名','联系方式','订单号','兑换商品ID','兑换商品名','兑换数量','兑换日期'];
			  const filterVal = ['user_id','accounts','real_name','phone','order_id','product_id','productName','give_number','give_time'];
			  const list = this.tableList;
			  const data = this.formatJson(filterVal, list);
			  export_json_to_excel(tHeader, data,'匀贸兑酒记录');
			});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消导出'
          });
        });
      },
	  //重置
	  reset(){
		// if (!(this.timer[0] == null && this.user_Id=='' && this.name=='' && this.productId=='')) {
			
		// }
		this.user_Id = this.name = this.productId = '';
		this.timer = [null,null];
		this.getList();
		this.$message({
		    type: 'success',
		    message: this.$store.getters.getResetText
		});
	  },
    }
  }
</script>
<style scoped>
  .app-container{width: 100%;background-color: #fff;padding: 20px;}
  .inputes {display: inline-block !important;}
  .se-pl {margin-right: 10px;}
  .head-ed {margin-top: 10px;}
  .head-ed ul{overflow: hidden;padding: 0;}
  .head-ed ul li{float: left;margin: 15px 2% 0 0;}
  .el-select {width: 185px !important;}
  /deep/.el-dialog__footer{padding-bottom:30px!important;}
  /deep/.cell{padding: 0 5px!important;}
  .time{width:65%;float: left; }
  /deep/.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {width: 100%;padding: 3px 0;}
  .h-1,.h-2{padding: 10px 5px;font-size: 16px;}
  .top-text>.h-1{
	  float: left;
  }
  .top-text>.h-2{
  	  float: right;
  }
  .h-2 span{
	color: red;
  }
</style>

