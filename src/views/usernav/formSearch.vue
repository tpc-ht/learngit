<template>
	<div style="padding:20px;">
		<div class="head-ed">
			<div class="p_one">
				<div class="se-pl">姓名：{{real_name}}</div>
				<div class="se-pl" style="margin-left:20%;width: 40%;">代理时间：{{agent_create_time}}至{{end_time}}</div>
			</div>
			<div class="p_one">
				<div class="se-pl">电话：{{phone}}</div>
				<div class="se-pl" style="margin-left:20%;width: 40%;">代理状态：{{proxy_status}}</div>
			</div>
			<div class="p_one">
				<span class="se-pl">身份证号：{{id_card_number}}</span>
			</div>
			<div class="p_one">
				<span class="se-pl">家庭住址：{{card_address}}</span>
			</div>
			<div class="p_one">
				<span class="se-pl">代理区域：{{proxy_region}}</span>
			</div>
			<div class="p_one">
				<span class="se-pl">代理类型：{{type_name}}</span>
			</div>
			<div class="p_one">
				<span class="se-pl">代理级别：{{level}}</span>
			</div>
		</div>
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="区域交易量代理费" name="first">
				<div class="show_one">
					<div class="head-ed">
						<div class="inputes">
							<div class="block">
								<span class="demonstration" style="margin-right:10px;">订单创建时间</span>
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
						</div>
						<el-row class="inputes">
							<el-button @click="getList">查询</el-button>
						</el-row>
					</div>
					<div>
						<h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
						<el-table :data="tableData.list" border style="width: 100%">
							<el-table-column prop="serial_number" label="订单编号" width="220">
							</el-table-column>
							<el-table-column prop="payment_state" label="订单状态" width="80">
							</el-table-column>
							<el-table-column prop="payment_channel" label="支付方式" width="80">
							</el-table-column>
							<el-table-column prop="create_time" label="订单创建时间" width="200">
							</el-table-column>
							<el-table-column prop="nick_name" label="用户昵称" width="90">
							</el-table-column>
							<el-table-column prop="shop_name" label="店铺名称" width="150">
							</el-table-column>
							<el-table-column prop="product_name" label="商品名称" width="180">
							</el-table-column>
							<el-table-column prop="user_name" label="收货人" width="100">
							</el-table-column>
							<el-table-column prop="quantity" label="商品数量" width="80">
							</el-table-column>
							<el-table-column prop="total_amount" label="现金总价" width="100">
								<template slot-scope="scope">
									<span>￥{{scope.row.total_amount||0}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="post_fee" label="邮费" width="80">
								<template slot-scope="scope">
									<span>￥{{scope.row.post_fee||0}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="pay_time" label="订单支付时间" width="200">
							</el-table-column>
							<el-table-column prop="slGetOrderFee" label="平台抽成" width="100">
								<template slot-scope="scope">
									<span>￥{{scope.row.slGetOrderFee||0}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="agentGetOrderFee" label="代理商抽成" width="100">
								<template slot-scope="scope">
									<span>￥{{scope.row.agentGetOrderFee||0}}</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<!-- 分页 -->

					<pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit"
								@pagination="getList" />
				</div>
			</el-tab-pane>
			<el-tab-pane label="自主开发交易量" name="second">
				<div class="show_two">
					<div class="head-ed">
						<div class="inputes">
							<div class="block">
								<span class="demonstration" style="margin-right:10px;">订单创建时间</span>
								<el-date-picker
										v-model="timerData"
										value-format="timestamp"
										type="daterange"
										placeholder="请选择"
										range-separator="至"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
								></el-date-picker>
							</div>
						</div>
						<el-row class="inputes">
							<el-button @click="getLowerAgentData">查询</el-button>
						</el-row>
					</div>
					<div>
						<h6 class="h6" v-if="totalOne>0">共{{totalOne}}条记录，{{tableList.pages}}页。当前为第{{form.page}}页</h6>

						<el-table :data="tableList.list" border style="width: 100%">
							<el-table-column prop="serial_number" label="订单编号" width="220">
							</el-table-column>
							<el-table-column prop="payment_state" label="订单状态" width="110">
							</el-table-column>
							<el-table-column prop="payment_channel" label="支付方式" width="110">
							</el-table-column>
							<el-table-column prop="create_time" label="订单创建时间" width="110">
							</el-table-column>
							<el-table-column prop="nick_name" label="用户昵称" width="110">
							</el-table-column>
							<el-table-column prop="shop_name" label="店铺名称" width="110">
							</el-table-column>
							<el-table-column prop="product_name" label="商品名称" width="110">
							</el-table-column>
							<el-table-column prop="user_name" label="收货人" width="110">
							</el-table-column>
							<el-table-column prop="quantity" label="商品数量" width="110">
							</el-table-column>
							<el-table-column prop="total_amount" label="现金总价" width="110">
							</el-table-column>
							<el-table-column prop="post_fee" label="邮费" width="110">
							</el-table-column>
							<el-table-column prop="pay_time" label="订单支付时间" width="110">
							</el-table-column>
							<el-table-column prop="slGetOrderFee" label="平台抽成" width="110">
								<template slot-scope="scope">
									<span>￥{{scope.row.slGetOrderFee||0}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="agentGetOrderFee" label="代理商抽成" width="110">
								<template slot-scope="scope">
									<span>￥{{scope.row.agentGetOrderFee||0}}</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<!-- 分页 -->
					<pagination v-if="totalOne>0" :total="totalOne" :page.sync="form.page" :limit.sync="form.limit"
								@pagination="getLowerAgentData" />
				</div>
			</el-tab-pane>
		</el-tabs>
		<div>
			<p class="p_two" style="text-align:center;">
				<el-popover ref="popover4" placement="right" width="300" trigger="click">
					<div>
						<span>结款金额：</span>
						<div class="inputes" style="width:185px;">
							<el-input v-model="money" placeholder="请输入内容"></el-input>
						</div>
					</div>
					<div style="margin-top:20px;">
						<span>结款方式：</span>
						<el-select v-model="stype" placeholder="请选择">
							<el-option v-for="item in sptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
					<div style="text-align: center;margin-top:20px;">
						<el-row class="inputes" style="margin:0 auto;">
							<el-button @click="bton">结款</el-button>
						</el-row>
					</div>
				</el-popover>
				<el-button v-popover:popover4 style="margin:0 auto;">马上结款</el-button>
			</p>
			<p class="p_two">
				代理费提成：￥{{proxyMoney||0}}
			</p>
			<p class="p_two">
				已结清：￥{{pay_money||0}}
			</p>
			<p class="p_two">
				未结清：￥{{parseFloat(proxyMoney-pay_money).toFixed(2)||0}}
			</p>
		</div>
	</div>
</template>
<script>
	import adderss from '@/api/adderss'
	import Pagination from '@/components/Pagination'
	import qs from 'qs'
	export default {
		data() {
			return {
				activeName: 'first',
				form: {
					page: 1,
					limit: 10
				},
				options: [{
					value: '1',
					label: '已结清'
				}, {
					value: '2',
					label: '未结清'
				}],
				sptions: [{
						value: '1',
						label: '支付宝'
					}, {
						value: '2',
						label: '微信'
					},
					{
						value: '3',
						label: '银行卡'
					}
				],
				timer: [],
				timerData:[],
				stype:'',
				money:'',
				tableData:[],
				tableList:[],
				real_name:this.$route.query.real_name,
				phone:this.$route.query.phone,
				proxy_region:this.$route.query.proxy_region,
				type_name:this.$route.query.type_name,
				level:this.$route.query.level,
				agent_create_time:this.$route.query.agent_create_time,
				end_time:this.$route.query.end_time,
				card_address:this.$route.query.card_address,
				id_card_number:this.$route.query.id_card_number,
				id:this.$route.query.id,
				proxy_status:this.$route.query.proxy_status,
				proxyMoney:this.$route.query.proxyMoney,
				pay_money:this.$route.query.pay_money,
				dataTime:'',
				dataTime1:'',
				dataTime2:'',
				dataTime3:'',
				user:JSON.parse(sessionStorage.getItem('user')),
				total:'',
				totalOne:'',
			}
		},
		components: {
			Pagination
		},
		created() {
			this.getList();
		},
		mounted() {

		},
		methods: {
			handleClick(tab) {
				if(tab.index==0){
					this.getList();
				}else if(tab.index==1){
					this.getLowerAgentData();
				}
			},
			getList() { //初始化
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
					begin_time: this.dataTime,
					end_time: this.dataTime1,
					agent_application_id:this.id,//代理商ID
					myOrder:0,//是否自主开发，0区域交易量代理费,1自主开发交易量
					pageNum: this.form.page,
					pageSize: this.form.limit,
				};
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.queryAgentOderDetailList,
					data: qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if (res.data.success) {
						this.tableData=res.data.data;
						this.total=this.tableData.total;
						this.$message({
							message:res.data.msg,
							type: 'success'
						})
					}else {
						this.$message({
							message:res.data.msg,
							type: 'warning'
						})
						this.tableData=[]
					}
				}).catch(res=>{
					this.$message({
						message:res.data.msg,
						type: 'error'
					})
					this.tableData=[]
				})
			},
			getLowerAgentData() { //查询
				let Time = this.timerData;
				let Start = new Date(Time[0]);
				let End = new Date(Time[1]);
				this.dataTime2 = Start.getTime(); //当前时间转换成long型
				this.dataTime3 = End.getTime()+Number(86399999); //当前时间转换成long型
				if (Time[0] == null) {
					this.dataTime2 ='';
					this.dataTime3 ='';
				}
				let data = {
					user_id:this.user.id,
					begin_time: this.dataTime2,
					end_time: this.dataTime3,
					agent_application_id:this.id,//代理商ID
					myOrder:1,//是否自主开发，0区域交易量代理费,1自主开发交易量
					pageNum: this.form.page,
					pageSize: this.form.limit,
				}
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.queryAgentOderDetailList,
					data: qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if (res.data.success) {
						this.tableList=res.data.data;
						this.totalOne=this.tableList.total;
						this.$message({
							message:res.data.msg,
							type: 'success'
						})
					}else {
						this.$message({
							message:res.data.msg,
							type: 'warning'
						})
						this.tableList=[]
					}
				}).catch(res=>{
					this.$message({
						message:res.data.msg,
						type: 'error'
					})
					this.tableList=[]
				})
			},
			bton() { //提交
				let data = {
					record_user_id:this.user.id,
					pay_method: this.stype,
					pay_money: this.money,
					agent_application_id:this.id,//代理商ID
				}
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.payAgentOderFee,
					data: qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if (res.data.success) {
						this.$message({
							message: res.data.msg,
							type: 'success'
						})
						this.$router.push({path:'/userfind'})
					}
				}).catch(res=>{
					this.$message({
						message:res.data.msg,
						type: 'error'
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.h6 {
		padding: 10px 5px;
		font-size: 16px;
	}
    .active{
		background: #59a7e4;
		color:#ffffff;
	}
	.inputes {
		display: inline-block !important;
	}

	.sp-df {
		margin-left: 400px;
		margin-right: 10px;
	}

	.se-pl {
		margin-right: 10px;
		font-size: 16px;
		font-weight: 200px;
		width: 10%;
	}

	.head-ed {
		margin-top: 10px;
	}

	.head-ed>div {
		height: 40px;
	}

	.el-select {
		width: 185px !important;
	}

	.p_one>div {
		float: left;
	}

	.se-pl-t {
		margin-right: 10px;
	}

	.p_two {
		padding-top: 20px;
		font-size: 16px;
		font-weight: 200;
		height: 30px;
	}
</style>
