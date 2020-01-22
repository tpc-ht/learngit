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
				<span class="se-pl">代理级别：
					<span v-if="level==1">省级代理商</span>
						<span v-else-if="level==2">市级代理商</span>
						<span v-else-if="level==3">县级代理商</span>
						<span v-else-if="level==4">乡级代理商</span>
						<span v-else-if="level==5">村级代理商</span></span>
			</div>
		</div>

		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="区域内所有入驻商家" name="first">
				<div class="show_one">
					<div class="head-ed">
						<div class="inputes">
							<div class="block">
								<span class="demonstration" style="margin-right:10px;">代理时间</span>
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
						<h6 class="h6" v-if="tableData.total>0">共{{tableData.total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
						<el-table :data="tableData.list" border style="width: 100%">
							<el-table-column prop="created_at" label="入驻时间" >
							</el-table-column>
							<el-table-column prop="name" label="店铺名称" >
							</el-table-column>
							<el-table-column prop="real_name" label="姓名" >
							</el-table-column>
							<el-table-column prop="phone" label="电话">
							</el-table-column>
							<el-table-column prop="shop_type" label="店铺类型">
								<template slot-scope="scope">
								<span v-if="scope.row.shop_type==1">共享商城</span>
								<span v-else-if="scope.row.shop_type==2">共享农场</span>
									<span v-else-if="scope.row.shop_type==3">共享工厂</span>
									<span v-else-if="scope.row.shop_type==4">民宿客栈</span>
								<span v-else-if="scope.row.shop_type==5">农家餐饮</span>
									<span v-else-if="scope.row.shop_type==6">综合农庄</span>
								<span v-else-if="scope.row.shop_type==7">旅游景点</span>
									<span v-else-if="scope.row.shop_type==8">农庄租赁</span>
								</template>
							</el-table-column>
							<el-table-column prop="address" label="店铺地址">
							</el-table-column>
							<el-table-column prop="proxyFeeRoyalty" label="代理费提成">
								<template slot-scope="scope">
									<span>￥{{scope.row.proxyFeeRoyalty||0}}</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<!-- 分页 -->

					<pagination v-if="tableData.total>0" :total="tableData.total" :page.sync="form.page" :limit.sync="form.limit"
								@pagination="getList" />
				</div>
			</el-tab-pane>
			<el-tab-pane label="自主开发入驻商家" name="second">
				<div class="show_two">
					<div class="head-ed">
						<div class="inputes">
							<div class="block">
								<span class="demonstration" style="margin-right:10px;">代理时间</span>
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
						<h6 class="h6" v-if="tableList.total>0">共{{tableList.total}}条记录，{{tableList.pages}}页。当前为第{{form.page}}页</h6>

						<el-table :data="tableList.list" border style="width: 100%">
							<el-table-column prop="created_at" label="入驻时间" >
							</el-table-column>
							<el-table-column prop="name" label="店铺名称" >
							</el-table-column>
							<el-table-column prop="real_name" label="姓名" >
							</el-table-column>
							<el-table-column prop="phone" label="电话">
							</el-table-column>
							<el-table-column prop="shop_type" label="店铺类型">
								<template slot-scope="scope">
									<span v-if="scope.row.shop_type==1">共享商城</span>
									<span v-else-if="scope.row.shop_type==2">共享农场</span>
									<span v-else-if="scope.row.shop_type==3">共享工厂</span>
									<span v-else-if="scope.row.shop_type==4">民宿客栈</span>
									<span v-else-if="scope.row.shop_type==5">农家餐饮</span>
									<span v-else-if="scope.row.shop_type==6">综合农庄</span>
									<span v-else-if="scope.row.shop_type==7">旅游景点</span>
									<span v-else-if="scope.row.shop_type==8">农庄租赁</span>
								</template>
							</el-table-column>
							<el-table-column prop="address" label="店铺地址">
							</el-table-column>
							<el-table-column prop="proxyFeeRoyalty" label="代理费提成">
								<template slot-scope="scope">
									<span>￥{{scope.row.proxyFeeRoyalty||0}}</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<!-- 分页 -->
					<pagination v-if="tableList.total>0" :total="tableList.total" :page.sync="form.page" :limit.sync="form.limit"
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
				未结清：￥{{proxyMoney-pay_money||0}}
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
				province:this.$route.query.province,
				city:this.$route.query.city,
				country:this.$route.query.country,
				town:this.$route.query.town,
				village:this.$route.query.village,
				typeid:this.$route.query.typeid,
				shopTypeId:this.$route.query.shopTypeId,
				dataTime:'',
				dataTime1:'',
				dataTime2:'',
				dataTime3:'',
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
					startDate: this.dataTime,
					endDate: this.dataTime1,
					agent_id:this.id,//代理商ID
					level:this.level,
					province:this.province,
					city:this.city,
					country:this.country,
					town:this.town,
					village:this.village,
					typeid:this.typeid,
					shopTypeId:this.shopTypeId,
					pageNum: this.form.page,
					pageSize: this.form.limit,
				};
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.queryRegionBusinnessByAgentId,
					data: qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if (res.data.success) {
						this.tableData=res.data.data;
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
					startDate: this.dataTime2,
					endDate: this.dataTime3,
					agent_id:this.id,//父级ID（和父级的父级ID选传一个）
					level:this.level,//父级的父级ID（和父级ID选传一个）
					province:this.province,
					city:this.city,
					country:this.country,
					town:this.town,
					village:this.village,
					typeid:this.typeid,
					shopTypeId:this.shopTypeId,
					pageNum: this.form.page,
					pageSize: this.form.limit,
				}
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.queryAutoBusinnessByAgentId,
					data: qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if (res.data.success) {
						this.tableList=res.data.data;
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
					var user = JSON.parse(sessionStorage.getItem('user'))
					this.axios({
						method: "post",
						url: this.$local.http + this.$api.insertProxyPay,
						data: qs.stringify({
							agent_application_id:this.id,
							record_user_id:user.id,
							pay_method: this.stype,
							pay_money: this.money,
							income_type:2,
						}),
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(res => {
						if (res.data.success) {
							this.$message({
								message: res.data.msg,
								type: 'success'
							})
							this.$router.push({path:'/tanfind'})
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
