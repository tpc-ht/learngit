<!-- 订单明细 -->	
<template>
    <div class="app-container">
		<div>
			<el-row :gutter="20">
				<el-col :span="8" >
				  <div class="grid-content bg-purple">用户ID：{{ userData.user_id }}</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">代理级别：{{$filterUtl.resellerLevel(userData.agent)}}</div>
					</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">真实姓名：{{ userData.real_name }}</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="8" >
				  <div class="grid-content bg-purple">银行卡号：{{ userData.bank_card }}</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">开户行：{{ userData.open_branch_bank }}</div>
					</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">联系方式：{{ userData.phone }}</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="8" >
				  <div class="grid-content bg-purple">是否符合结款：{{ userData.agent_state }}</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">买卖金额：{{ userData.orderPrice }}</div>
					</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">代理总提成：{{ userData.royaltyPrice }}</div>
				</el-col>
			</el-row>
		</div>
		<!--财务结账 -->
        <div class="head-ed">
            <ul>
				<li>
				    <span class="se-pl">买卖人姓名</span>
				    <div class="inputes">
				        <el-input placeholder="请输入" v-model="name" clearable style="width:185px;"></el-input>
				    </div>
				</li>
				<li>
				    <span class="se-pl">商品名称</span>
				    <div class="inputes">
				        <el-input v-model="commodityName" placeholder="请输入" style="width:185px;"></el-input>
				    </div>
				</li>
				
				<!-- <li>
				    <div class="block">
				        <span class="se-pl" style="margin-right:10px;">获得提成时间</span>
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
				</li> -->
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
        <h6 class="h6">详细列表<span v-if="total>0">:共{{total}}条记录，{{initData.pages}}页。当前为第{{form.page}}页</span></h6>
        <!-- <el-table :data="initData.list" border fit highlight-current-row style="width: 100%"> -->
		<el-table
		:data="initData.list" 
		border fit highlight-current-row 
		style="width: 100%"
		ref="multipleTable"
		tooltip-effect="dark"
		@selection-change="handleSelectionChange"
		v-loading="this.$store.getters.getLoadingBool"
		element-loading-text="拼命加载中"
		>
			<el-table-column
			  type="selection"
			  width="55">
			</el-table-column>
			<el-table-column  align="center" label="订单号" min-width="115px">
			    <template slot-scope="scope">
			        <span>{{scope.row.order_id}}</span>
			    </template>
			</el-table-column>
			<el-table-column  align="center" label="商品名称">
			    <template slot-scope="scope">
			        <span>{{scope.row.co_name}}</span>
			    </template>
			</el-table-column>
			<el-table-column  align="center" label="后台生成提成记录时间" min-width="150px">
			    <template slot-scope="scope">
			        <span>{{scope.row.ti}}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="买卖人姓名" >
			    <template slot-scope="scope">
			        <span>{{ scope.row.username }}</span>
			    </template>
			</el-table-column> 
			<el-table-column align="center" label="买卖人ID">
			    <template slot-scope="scope">
			        <span>{{ scope.row.order_user_id }}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="购买数量">
			    <template slot-scope="scope">
			        <span>{{ scope.row.qty }}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="结款时间" min-width="150px">
			    <template slot-scope="scope">
			        <span>{{scope.row.ti}}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="买卖总额">
			    <template slot-scope="scope">
			        <span>{{ scope.row.order_price }}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="买卖方向">
			    <template slot-scope="scope">
			        <span>{{ scope.row.ty}}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="提成">
			    <template slot-scope="scope">
			        <span>{{ scope.row.royalty_price}}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="是否结款">
			    <template slot-scope="scope">
			        <span>{{ scope.row.payment_state}}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="来源">
			    <template slot-scope="scope">
			        <span>{{ scope.row.order_type}}</span>
			    </template>
			</el-table-column>
        </el-table>
		<div style="margin-top: 20px">
			<h6 class="h6">共累计 ￥{{totalMoney1}} 提成，当前选择 {{multipleSelection.length}} 条数据, ￥{{totalMoney2}} 提成</h6>
		</div>
		<div style="margin-top: 20px">
		    <el-button @click="toggleSelection()" :disabled='multipleSelection.length===0'>确认打款</el-button>
		    <el-button @click="remitAll()" type="danger">全部打款</el-button>
		    <el-button @click="retreat()" type="info">返回</el-button>
		</div>
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    export default {
        components: { Pagination },
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    page: 1,
                    limit: 10
                },
                commodityName: '',//商品名称
                name: '',//姓名
                agentCreateTime:'',//交易开始时间
                endtime:'',//交易结束时间
				clearingStartTime:'',//结款开始时间
				clearingEndTime:'',//结款结束时间
				id:'',
                timer: [],
                initData:[],
                total:'',
                tableList:[],
				multipleSelection:[],//列表多选
				userData:{},//用户信息
				totalMoney1:0,//总提成
				totalMoney2:0,//选中提成
            }
        },
        mounted() {
			this.userData = this.$route.query;
			this.getList();
		},
        methods: {
			getList(){
				this.$store.commit('setLoadingBool',true);
			    // this.timeInit();
				var params={
					paymentUserId:this.$route.query.user_id,
					buyerName:this.name,
					productName:this.commodityName,
					pageNum: this.form.page,
					pageSize:this.form.limit,
					startTime: this.$route.query.agentCreateTime,
					endTime:this.$route.query.endtime,
				}
			    this.axios({
			        method: "post",
			        url: this.$local.http+this.$api.paymentOrderList,
			        params: params,
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
			
			getData() {//初始化
				var params={
					paymentUserId:this.$route.query.user_id,
					buyerName:this.name,
					productName:this.commodityName,
					pageNum: this.form.page,
					pageSize:this.total,
					startTime: this.$route.query.agentCreateTime,
					endTime:this.$route.query.endtime,
				};
				this.axios({
				    method: "post",
				    url: this.$local.http + this.$api.paymentOrderList,
				    params: params,
				}).then(res => {
					console.log(res);
				    if (res.data.success) {
				        this.tableList=res.data.data.list;
						let m = 0;
						res.data.data.list.forEach(item=>{
							m += item.royalty_price;
						})
						this.totalMoney1 =this.toDecimal(m);
				    }else {
				        this.tableList=[]
						this.$toast(res.data.msg);
				    }
				}).catch(res=>{
					console.log(res)
				    this.$message({
				        message:res.data.msg,
				        type: 'error'
				    });
				    this.tableList=[]
				})
			},
			//时间戳初始化
			timeInit(){
				let Time1 = this.timer;
				this.agentCreateTime = new Date(Time1[0]).getTime(); //当前时间转换成long型
				this.endtime = new Date(Time1[1]).getTime()+Number(86399999); //当前时间转换成long型
				if (Time1[0] == null) {
				    this.agentCreateTime ='';
				    this.endtime ='';
				}
			},
			//批量打款
			toggleSelection(row) {
				this.$confirm('确认打款, 是否继续?', '提示', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					  type: 'warning'
					}).then(() => {
					  const formDatas=new FormData();
					  formDatas.append('agentPaymentIdList',JSON.stringify(this.tableDataList));
					  this.axios({
						  method: "post",
						  url: this.$local.http + this.$api.agentRoyaltyPayment,
						  data: formDatas,
					  }).then(res => {
						  if (res.data.success) {
							  this.$message({message: res.data.msg, type: 'success'});
							  this.getList();
						  } else {
							  this.$message({message: res.data.msg, type: 'warning'});
						  }
					  })
					}).catch(() => {
					  this.$message({
						type: 'info',
						message: '已取消打款'
					  });          
					});	
			},
			//列表多选
			handleSelectionChange(val) {
				if(val.length===0)this.totalMoney3=0;
				this.multipleSelection = val;
				let arr = [];
				let m = 0;
				val.map(item => {
					arr.push(item.agentPaymentId);
					m += item.royalty_price;
				});
				this.tableDataList = arr;
				this.totalMoney2 =this.toDecimal(m);
				
			},
			//全部打款
			remitAll(){
				this.$confirm('确认全部打款, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  var params={
				  	paymentUserId:this.$route.query.user_id,
				  	startTime: this.$route.query.agentCreateTime,
				  	endTime:this.$route.query.endtime,
				  };
				  const formDatas=new FormData();
				  formDatas.append('paymentUserId',this.$route.query.user_id);
				  formDatas.append('startTime',this.$route.query.agentCreateTime);
				  formDatas.append('endTime',this.$route.query.endtime);
				  this.axios({
					  method: "post",
					  url: this.$local.http + this.$api.agentRoyaltyPaymentAll,
					  data: formDatas,
				  }).then(res => {
					  if (res.data.success) {
						  console.log(res);
						  this.$message({message: res.data.msg, type: 'success'});
						  this.getList();
					  } else {
						  this.$message({message: res.data.msg, type: 'warning'});
					  }
				  })
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消打款'
				  });          
				});
			},
			//ex 导出
			formatJson(filterVal, jsonData) {
			    return jsonData.map(v => filterVal.map(j => v[j]))
			},
			export2Excel() {
			    this.$confirm('确定要导出表格数据么？?','提示',{
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
			    }).then(() => {
					require.ensure([], () => {
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['订单号','商品名称','后台生成提成记录时间','买卖人姓名','买卖人ID','购买数量','买卖总额','买卖方向','提成','是否结款','来源'];
					    const filterVal = ['order_id','co_name','ti','username','order_user_id','qty','order_price','ty','royalty_price','payment_state','order_type'];
					    const list = this.tableList;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data,'财务结款明细');
					});
			    }).catch(() => {
			        this.$message({
			            type: 'info',
			            message: '已取消导出'
			        });
			    });
			},
			//处理浮点数相加
			toDecimal(x) {
				var val = Number(x)
				if(!isNaN(parseFloat(val))) {
					val = val.toFixed(2);
				}
				return Number(val);
			},
			//返回
			retreat(){
				this.$router.push({path:'/financeEndMoney',query:{
					agentCreateTime:this.$route.query.agentCreateTime,
					endtime:this.$route.query.endtime
				}});
			},
			//重置
			reset(){
				
				this.commodityName = this.name = '';
				this.getList();
			},
			
        }, 
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
    .el-dropdown-link {cursor: pointer;color: #409EFF;}
    .el-icon-arrow-down {font-size: 12px;}
    .demonstration {display: block;color: #8492a6;font-size: 14px;margin-bottom: 20px;}
    .daili{line-height: 34px;text-align: center;}
    .el-dropdown-link{color: #42b983;outline: none;}
    .p_foot{overflow: hidden;padding-top: 20px;}
    .p_one{float: left;font-size: 16px;font-weight: 600;line-height: 30px;}
    .p_div{float: left;padding-left: 20px;}
    .p_two {line-height: 30px;font-size: 16px;font-weight: 200;height: 30px;}

	.el-row {
	   margin-bottom: 20px;
	   &:last-child {
	     margin-bottom: 0;
	   }
	 }
	 .el-col {
	   border-radius: 4px;
	 }
	 .grid-content {
	   border-radius: 4px;
	   min-height: 36px;
	 }
	 .row-bg {
	   padding: 10px 0;
	 }
</style>

