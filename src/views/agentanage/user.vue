<template>
	<div class="box">
		<div class="head clearbox">
			<ul class="head-o">
				<li>
					<div class="t-ef3">区域订单<br/>成交总额</div>
					<p class="t-ef_p">￥{{titleData.allOrderFee||0}}</p>
				</li>
				<li>
					<div class="t-ef4">开发商户<br/>成交总额</div>
					<p class="t-ef_p">￥{{titleData.allOrderFee ||0}}</p>
				</li>
				<li>
					<div class="t-ef">结款返利</div>
					<p class="t-ef_p">￥{{titleData.allOrderFee ||0}}</p>
				</li>
				<li>
					<div class="t-ef1">平台已返利</div>
					<p class="t-ef_p">￥{{titleData.alreadyGetOrderFee ||0}}</p>
				</li>
				<li>
					<div class="t-ef2">未结款</div>
					<p class="t-ef_p1">￥{{titleData.noGetOrderFee||0}}</p>
				</li>
			</ul>
		</div>
		<div class="agentNav">
			<ul>
				<li>
					代理商区域：<p>{{initData.proxy_region}}</p>
				</li>
				<li>
					代理级别：<p>{{initData.level}}</p>
				</li>
				<li>
					代理时间：<p>{{initData.agent_create_time}} 至 {{initData.end_time}}</p>
				</li>
				<li>
					状态：<p v-if="initData.proxy_status==1">有效</p>
					<p v-if="initData.proxy_status==2">无效</p>
				</li>
			</ul>
		</div>
		<div class="content">
			<div class="head-ed">
				<ul>
					<li>
						<p class="se-pl">订单支付时间</p>
						<div class="inputes">
							<el-date-picker v-model="timer" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</div>
					</li>
					<li>
						<p class="sp-df">所属店铺</p>
						<div class="inputes">
							<el-input v-model="name" placeholder="请输入内容" style="width:185px;"></el-input>
						</div>
					</li>
					<li>
						<p class="sp-df">自主研发</p>
						<el-select v-model="myself" clearable placeholder="请选择" style="width:185px;">
							<el-option v-for="item in opsed" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>
					<el-row class="AgencyFee_but">
						<el-button @click="getList">查询</el-button>
						<el-button @click="reset">重置</el-button>
					</el-row>
				</ul>
			</div>
		</div>
		<div class="bvodry">
			<h6 class="h6" v-show="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
			<el-table :data="tableData.list" border style="width: 100%">
				<el-table-column  type="index" align="center" label="序号"  width="50">
				</el-table-column>
				<el-table-column prop="serial_number" align="center" label="订单编号">
				</el-table-column>
				<el-table-column prop="pay_time" align="center" label="订单支付时间">
				</el-table-column>
				<el-table-column prop="nick_name" align="center" label="用户昵称">
				</el-table-column>
				<el-table-column prop="shop_name" align="center" label="店铺名称">
				</el-table-column>
				<el-table-column prop="product_name" align="center" label="商品名称">
				</el-table-column>
				<el-table-column prop="user_name" align="center" label="收货人">
				</el-table-column>
				<el-table-column prop="total_amount" align="center" label="现金总价">
				</el-table-column>
				<el-table-column prop="myOrder" align="center" label="是否自主研发">
				</el-table-column>
				<el-table-column prop="returnMoney" align="center" label="结果返利">
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<pagination v-show="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit"
			 @pagination="getList" />
		</div>
		<div>
			<p class="t-se">当前筛选统计结果</p>
			<p class="t-sf">结果返利总额 ￥{{totalJoinFee||0}}</p>
		</div>
	</div>
</template>

<script>
	import Pagination from '@/components/Pagination'
	import qs from 'qs'
	export default {
		data() {
			return {
				form: {
					page: 1,
					limit: 10
				},
				opsed: [{
						value: '1',
						label: '是'
					},
					{
						value: '2',
						label: '否'
					}
				],
				total:0,
				timer:'',
				name: '',
				myself:'',
				tableData:[],
				titleData:{},
				initData:{},
				user:JSON.parse(sessionStorage.getItem('user')),
				totalJoinFee:'',
				dataTime:'',
				dataTime1:'',
			}
		},
		components: {
			Pagination
		},
		mounted() {
			this.getList();
			this.getData()
			this.getInit()
		},
		methods: {
			//重置
			reset(){
				// if (!(
				// this.timer[0] == null && 
				// this.name==''  && 
				// this.myself=='')) {
					
				// }
				this.name = '';//姓名
				this.timer = [null,null];//时间
				this.myself = '';
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
			getData() { //初始化
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.agentOrderFeeStatistics,
					data: qs.stringify({
						user_id:this.user.id
					}),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					console.log(res)
					if(res.success==true){
						this.titleData = res.data;
					}else{
						this.$message({
							message: res.msg,
							type: 'warning'
						});
					}
				})
			},
			getInit() { //初始化
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.queryAgentUserInfo,
					data: qs.stringify({
						user_id:this.user.id
					}),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					console.log(res)
					if(res.success==true){
						this.initData = res.data;
					}else{
						this.$message({
							message: res.msg,
							type: 'warning'
						});
					}
				})
			},
			getList() { //查询
				let Time = this.timer;
				let Start = new Date(Time[0]);
				let End = new Date(Time[1]);
				this.dataTime = Start.getTime(); //当前时间转换成long型
				this.dataTime1 = End.getTime()+Number(86399999); //当前时间转换成long型
				if (Time[0] == null) {
					this.dataTime ='';
					this.dataTime1 ='';
				}
				let data = {
					user_id:this.user.id,
					shop_name: this.name,
					begin_time: this.dataTime,
					end_time: this.dataTime1,
					myOrder: this.myself,
					pageNum: this.form.page,
					pageSize: this.form.limit
				}
				console.log(data)
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.agentOrderFee,
					data: qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if(res.data.success){
						this.$message({
							message:res.data.msg,
							type: 'success'
						})
						this.tableData = res.data.data.dataList;
						this.total = this.tableData.total
						this.totalJoinFee=res.data.data.totalOrderFee;
					}else{
						this.$message({
							message: res.data.msg,
							type: 'warning'
						});
						this.tableData =[];
					}
				}).catch(res=>{
					this.$message({
						message: res.data.msg,
						type: 'error'
					});
					this.tableData =[];
				})
			}
		}
	}
</script>
<style scoped="scoped" lang="scss">
	.h6{font-size: 14px;line-height: 30px;}
	.clearbox::after {
		content: '';
		display: block;
		visibility: hidden;
		height: 0;
		clear: both;
	}

	.box {
		padding: 20px;
		.head ul{

			overflow: hidden;
		}
		.head-o li{
			float: left;
			margin-top: 15px;
			overflow: hidden;
			margin-right: 1%;
		}
		.head-o li div{
			float: left;

		}
		.t-ef{
			width:128px;
			height:128px;
			text-align: center;
			background-color: #fdd631;
			border-radius: 8px;
			padding-top: 50px;
			font-size: 16px;
			color: #fff;
		}
		.t-ef_p{
			font-size: 20px;
			color: #18c79c;
			padding-top: 50px;
			float: left;
			width: 130px;
			text-align: center;
			word-wrap:break-word;
		}
		.t-ef_p1{
			font-size: 20px;
			color: #ef776d;
			padding-top: 50px;
			float: left;
			width: 130px;
			text-align: center;
			word-wrap:break-word;
		}
		.t-ef1{
			width:128px;
			height:128px;
			text-align: center;
			background-color: #1fc6f3;
			border-radius: 8px;
			padding-top: 50px;
			font-size: 16px;
			color: #fff;
		}
		.t-ef2{
			width:128px;
			height:128px;
			text-align: center;
			background-color: #34c874;
			border-radius: 8px;
			padding-top: 50px;
			font-size: 16px;
			color: #fff;
		}
		.t-ef3{
			width:128px;
			height:128px;
			text-align: center;
			background-color: #49c9c8;
			border-radius: 8px;
			padding-top: 50px;
			font-size: 16px;
			color: #fff;
		}
		.t-ef4{
			width:128px;
			height:128px;
			text-align: center;
			background-color: #ff6e5b;
			border-radius: 8px;
			padding-top: 50px;
			font-size: 16px;
			color: #fff;
		}
		.inputes{
			display: inline-block;
		}
		.head-ed{
			margin-top:20px;
		}
		.head-ed ul{padding: 0 0 15px 0;overflow: hidden;}
		.head-ed ul li{float: left;margin-right: 3%;margin-top: 15px;}
		.sp-df{margin: 0 10px 0 0;display: inline-block}
		.se-pl{margin: 0 10px 0 0;display: inline-block}

		.bvodry {
			margin-top: 20px;
		}

		.t-se {
			font-size: 16px;
			font-weight: bold;
			margin-top: 20px;
		}

		.t-sf {
			margin-top: 40px;
		}

		.blone {
			text-align: center;
			font-size: 16px;
			font-weight: bold;
			margin-top: 20px;
		}
	}
	.AgencyFee_but{float: right;margin-top: 15px;}
	.agentNav{width: 100%;padding-top: 10px;}
	.agentNav ul{overflow: hidden;padding: 0;}
	.agentNav ul li{float: left;width: 40%;font-size: 14px;color: #333;line-height: 30px;}
	.agentNav ul li p{color: #18c79c;display: inline-block;}
</style>
