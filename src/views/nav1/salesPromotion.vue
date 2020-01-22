<template>
	<!-- 寄存销售分润 -->
  <div class="mod-log">
    <div class="head-ed">
      <ul>
        <li>
          <div class="block">
            <span class="se-pl" style="margin-right:10px;">消费时间</span>
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
          <span class="se-pl">搜了用户ID</span>
          <div class="inputes">
            <el-input placeholder="请输入" v-model="name" clearable style="width:185px;"></el-input>
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
    <h6 class="h6" v-if="total>0">共{{total}}条记录，{{initData.pages}}页。当前为第{{form.page}}页</h6>
    <el-table 
	:data="initData.list" 
	v-loading="this.$store.getters.getLoadingBool"
	element-loading-text="拼命加载中..."
	border fit highlight-current-row style="width: 100%">
      <el-table-column prop="sl_user_id" header-align="center" align="center" label="搜了农庄用户ID" width="120">
      </el-table-column>
      <el-table-column prop="real_name" header-align="center" align="center" label="真实姓名" width="100">
      </el-table-column>
      <el-table-column prop="accounts" header-align="center" align="center" label="和平村账号" width="100">
      </el-table-column>
      <el-table-column prop="bank_number" header-align="center" align="center" label="银行卡号" width="180">
      </el-table-column>
      <el-table-column prop="open_bank_add" header-align="center" align="center" label="开户支行" width="300">
      </el-table-column>
      <el-table-column prop="card_number" header-align="center" align="center" label="身份证号" width="200">
      </el-table-column>
      <el-table-column prop="tol" header-align="center" align="center" label="下级买卖总额" width="150">
      </el-table-column>
	  <el-table-column prop="lowerLevel" header-align="center" align="center" label="下级提成金额" width="150">
	  </el-table-column>
	  <el-table-column prop="totalMoney" header-align="center" align="center" label="和平村消费总金额" width="150">
	  </el-table-column>
 <!--     <el-table-column prop="qty" header-align="center" align="center" label="是否有资格获得千分之一提成" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.qty >= 10">是</span>
          <span v-if="scope.row.qty < 10">否</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="sold_out" header-align="center" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="dialogFormShow(scope)">结款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
    
	<el-dialog title="结款" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form :model="formData">
        <el-form-item label="结款金额" :label-width="formLabelWidth">
          <el-input v-model="formData.pay_money" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogForm()" :disabled="!dialogBool">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import qs from 'qs'
  export default {
    name: 'salesPromotion',
    components: { Pagination },
    data () {
      return {
        dialogFormVisible: false,
        dialogBool: false,
        form: {
          page: 1,
          limit: 10
        },
        formLabelWidth: '120px',
        name: '',
        contact: '',
        money:'',
        agentCreateTime:'',
        endtime:'',
        formData:{
          pay_money:'',
        },
        orderId:'',
        userId:'',
        bankNum:'',
        bankAccount:'',
        timer: [],
        initData:[],
        total:'',
        tableList:[],
      }
    },
    created () {
      this.getList()
    },
    methods: {
      dialogFormShow(scope){
        this.orderId=scope.row.order_id;
        this.userId=scope.row.sl_user_id;
        this.bankNum=scope.row.bank_number;
        this.bankAccount=scope.row.open_bank_add;
        this.dialogFormVisible=true;
		this.dialogBool = true;
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
          startTime:this.agentCreateTime,
          endTime:this.endtime,
          userId:this.name,
          pageNum: this.form.page,
          pageSize:this.form.limit,
        };
        this.axios({
          method: "post",
          url: this.$local.http+this.$api.queryHpcDetailsSummary,
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
      async getData() { //初始化
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
          startTime:this.agentCreateTime,
          endTime:this.endtime,
          userId:this.name,
          pageNum: this.form.page,
          pageSize:this.total,
        }
        let res = await this.axios({
          method: "post",
          url: this.$local.http + this.$api.queryHpcDetailsSummary,
          data: qs.stringify(data),
        })
		if (res.data.success) {
		  this.tableList=res.data.data.list;
		 
		}else {
		  this.tableList=[]
		  this.$message({
		    message:res.data.msg,
		    type: 'error'
		  });
		}
      },
	  //数据导出
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      export2Excel() {
        this.$confirm('确定要导出表格数据么？?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
			require.ensure([], () => {
			  // for (var i in this.tableList) {
			  //   if (this.tableList[i].qty >= 10) {
			  //     this.tableList[i].qty = '是'
			  //   } else if (this.tableList[i].qty < 10) {
			  //     this.tableList[i].qty = '否'
			  //   }
			  // }
			  const { export_json_to_excel } = require('../../vendor/Export2Excel');
			  const tHeader = ['搜了农庄用户ID','真实姓名','和平村账号','银行卡号','开户支行','身份证号','下级买卖总额','下级提成金额','文交所消费总金额'];
			  const filterVal = ['sl_user_id','real_name','accounts','bank_number','open_bank_add','card_number','tol','lowerLevel','totalMoney'];
			  const list = this.tableList;
			  const data = this.formatJson(filterVal, list);
			  export_json_to_excel(tHeader, data,'寄存销售分润');
			});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消导出'
          });
        });
      },
	  //提交结款
      dialogForm(){
		let this_ = this;
		
		let Time = this.timer;
		let Start = new Date(Time[0]);
		let End = new Date(Time[1]);
		this.agentCreateTime = Start.getTime(); //当前时间转换成long型
		this.endtime = End.getTime()+Number(86399999); //当前时间转换成long型
		if (Time[0] == null) {
			this.agentCreateTime ='';
			this.endtime ='';
		}
		// if (Time[0] == null) {
		// 	this.agentCreateTime ='';
		// 	this.endtime ='';
		// 	this.$message.error('请选择消费时间范围在进行打款操作！！');
		// }else{
		// var data={
		// 	startTime:this.agentCreateTime,
		// 	endTime:this.endtime,
		// 	money:this_.formData.pay_money,
		// 	orderId:this.orderId,
		// 	userId:this.userId,
		// 	bankNum:this.bankNum,
		// 	openBank:this.bankAccount,
		// };	
		// }
		var data={
			money:this_.formData.pay_money,
			orderId:this.orderId,
			userId:this.userId,
			bankNum:this.bankNum,
			openBank:this.bankAccount,
		};
		if(this.dialogBool){
			this.dialogBool =false;
			this.axios({
			  method: "POST",
			  url: this.$local.http+this.$api.hidhpcDownMoney,
			  data:qs.stringify(data),
			}).then(res=>{
			  if (res.data.success) {
			    this.dialogFormVisible=false;
			    this.$message({message:res.data.msg, type: 'success'});
				this.formData.pay_money = '';
			    this.getList()
			  }else {
			    this.$message({message:res.data.msg, type: 'error'})
				this.dialogFormVisible=false;
			  }
			}).catch(res=>{
			  this.$message({message:res.data.msg, type: 'error'})
			  this.dialogFormVisible=false;
			})
		}
        
        
      },
	  //重置
	  reset(){ 
		this.name = '';
		this.timer = [null,null];
		this.getList();
		this.$message({
		    type: 'success',
		    message: this.$store.getters.getResetText
		});
	  }
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
  .h6{padding: 10px 5px;font-size: 16px;}
</style>

