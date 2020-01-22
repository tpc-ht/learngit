<template>
	<div style="padding:20px;">
		<div class="head-ed">
			<div class="inputes">
				<div class="block">
					<span class="demonstration" style="margin-right:10px;">支出时间</span>
					<el-date-picker
							v-model="timer"
							value-format="timestamp"
							type="daterange"
							placeholder="请选择"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							@change="change"
					></el-date-picker>
				</div>
			</div>
		</div>
		<div class="head-ed">
			<h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>

			<el-table :data="tableData.list" border style="width: 100%">
				<el-table-column prop="pay_time" label="支出时间">
				</el-table-column>
				<el-table-column prop="real_name" label="收款人姓名">
				</el-table-column>
				<el-table-column prop="phone" label="收款人联系方式">
				</el-table-column>
				<el-table-column prop="pay_money" label="支出金额">
					<template slot-scope="scope">
						<span>￥{{scope.row.pay_money||0}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="pay_method" label="支出方式">
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->

		<pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit"
					@pagination="getList" />
		<div>
			<p class="t-se">当前筛选统计结果</p>
			<p class="t-sf">支出总金额 ￥{{money||0}}</p>
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
				timer: [],
				tableData: [],
				money:'',
                total:'',
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
			change(){
				this.getList()
			},
			getList() { //初始化
				var user = JSON.parse(sessionStorage.getItem('user'))
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
					begin_time: this.dataTime,
					end_time: this.dataTime1,
					pageNum: this.form.page,
					pageSize: this.form.limit,
					user_id:user.id,
				}
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.payAgentOderFeeDetail,
					data: qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if (res.data.success) {
						this.tableData=res.data.data.dataList;
						this.total=this.tableData.total;
						this.money=res.data.data.total_pay_money
						this.$message({
							message:res.data.msg,
							type: 'success'
						});
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
					});
					this.tableData=[]
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
		margin-top: 10px;
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
	.t-se{
		font-size:16px;
		font-weight:bold;
		margin-top:20px;
	}
	.t-sf{
		margin-top:40px;
	}
</style>
