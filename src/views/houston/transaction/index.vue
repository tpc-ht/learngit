<template>
	<div style="padding:20px;">
		<div class="head-ed">
			<div class="inputes">
				<div class="block">
					<span class="demonstration" style="margin-right:10px;">创建订单时间</span>
					<el-date-picker v-model="timer" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
			</div>
			<el-button @click="getList">查询</el-button>
			<el-button @click="reset()" style="margin-left: 20px;">重置</el-button>
		</div>
		<div class="head-ed">
			<h6 class="h6" v-if="tableData.total>0">共{{tableData.total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
			<el-table 
			:data="tableData.list"
			v-loading="this.$store.getters.getLoadingBool"
			element-loading-text="拼命加载中..."
			 border style="width: 100%">
				<el-table-column prop="serial_number" label="订单编号" width="200">
				</el-table-column>
				<el-table-column prop="payment_state" label="订单状态" width="120">
					<template slot-scope="scope">
						<span v-if="scope.row.payment_state==1">支付成功</span>
						<span v-if="scope.row.payment_state==2">待支付</span>
						<span v-else-if="scope.row.payment_state==102">申请售后</span>
						<span v-else-if="scope.row.payment_state==0">支付失败</span>
					</template>
				</el-table-column>
				<el-table-column prop="payment_channel" label="支付方式" width="150">
					<template slot-scope="scope">
						<span v-if="scope.row.payment_channel==1">微信</span>
						<span v-if="scope.row.payment_channel==2">支付宝</span>
						<span v-else-if="scope.row.payment_channel==3">paypa</span>
						<span v-else-if="scope.row.payment_channel==4">积分兑换</span>
					</template>
				</el-table-column>
				<el-table-column prop="create_time" label="订单创建时间" width="200">
				</el-table-column>
				<el-table-column prop="nick_name" label="用户昵称" width="100">
				</el-table-column>
				<el-table-column prop="name" label="店铺名称" width="200">
				</el-table-column>
				<el-table-column prop="product_name" label="商品名称" width="250">
				</el-table-column>
				<el-table-column prop="consigneeName" label="收货人" width="120">
				</el-table-column>
				<el-table-column prop="quantity" label="商品数量" width="100">
				</el-table-column>
				<el-table-column prop="sumresult" label="现金总价" width="100">
				</el-table-column>
				<el-table-column prop="post_fee" label="邮费" width="100">
				</el-table-column>
				<el-table-column prop="pay_time_stamp" label="支付时间" width="120">
					<template slot-scope="scope">
						<span>{{ scope.row.pay_time_stamp}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="noClick(scope.row,$event)" type="text" size="small">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<pagination v-if="tableData.total>0" :total="tableData.total" :page.sync="form.page" :limit.sync="form.limit"
		 @pagination="getList" />
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
				timer: [],
				tableData: '',
				dataTime:'',
				dataTime1:'',
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
			getList() { //初始化
				this.$store.commit('setLoadingBool',true);
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
					beginTime: this.dataTime,
					endTime: this.dataTime1,
					pageNum: this.form.page,
					pageSize: this.form.limit,
				}
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.successOrderInfoList,
					data: qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					this.$store.commit('setLoadingBool',false);
					if (res.success == true) {
						this.tableData = res.data;
					} else {
						this.$message({
							message: res.msg,
							type: 'warning'
						});
						this.tableData =[]
					}
				})
			},
			noClick(row) { //查看详情
			    let btid=row.serial_number;
				this.$router.push({
					path: '/tasednav',
					query:{
						btid:btid
					}
				})
			},
			//重置
			reset(){
				// if (!(this.timer[0] == null)) {
					
				// }
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

<style scoped lang="scss">
	.h6 {
		padding: 10px 5px;
		font-size: 16px;
	}

	.pt-o {
		margin-top: 20px;
		font-size: 16px;
		font-weight: bold;
	}

	.pt-t {
		margin-top: 20px;
		font-size: 14px;
	}

	.inputes {
		display: inline-block !important;
	}

	.sp-df {
		margin-left: 40px;
		margin-right: 10px;
	}

	.se-pl {
		margin-right: 10px;
	}

	.head-ed {
		margin-top: 20px;
	}

	.el-select {
		width: 185px !important;
	}

	.se-pl-t {
		margin-right: 10px;
		margin-left: 12px;
	}

	.f-pl-t {
		margin-right: 10px;
		margin-left: 40px;
	}

	.sed-font {
		height: 30px;
		line-height: 30px;
		position: relative;
		top: 20px;
	}

	.sed-font-t {
		margin-bottom: 45px;
		height: 30px;
	}

	.sed-font-t>div {
		float: left;
	}

	.fen-df {
		margin-top: 20px;
	}
</style>
