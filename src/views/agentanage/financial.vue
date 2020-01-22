<template>
	<div style="padding:20px;">
		<div class="head-ed">
			<div class="inputes">
				<div class="block">
					<span class="demonstration" style="margin-right:10px;">支付时间</span>
					<el-date-picker v-model="timer" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
					<el-row class="inputes">
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button @click="reset">重置</el-button>
					</el-row>
				</div>

			</div>
		</div>
		<div class="content">
			<h6 class="h6" v-if="tableData.total>0">共{{tableData.total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
			<el-table :data="tableData.list" border style="width: 100%">
				<el-table-column  type="index" align="center" label="序号"  width="50">
				</el-table-column>
				<el-table-column prop="pay_time" align="center" label="支付时间">
				</el-table-column>
				<el-table-column prop="pay_method" align="center" label="支付方式">
				</el-table-column>
				<el-table-column prop="pay_money" align="center" label="支付金额">
					<template slot-scope="scope">
						<span>￥{{scope.row.pay_money||0}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="agent_user_id" align="center" label="支付人ID">
				</el-table-column>
				<el-table-column prop="income_type" align="center" label="款项类型">
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<pagination v-if="tableData.total>0" :total="tableData.total" :page.sync="form.page" :limit.sync="form.limit"
		 @pagination="getList" />
		 <div>
		 	<p class="t-se">当前筛选统计结果</p>
		 	<p class="t-sf">支出总金额  ￥{{totalMoney||0}}</p>
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
				tableData: '',
				user:JSON.parse(sessionStorage.getItem('user')),
				totalMoney:'',
				dataTime:'',
				dataTime1:'',
			}
		},
		components: {
			Pagination
		},
		mounted() {
			this.getList();//初始化
		},
		methods: {
			//重置
			reset(){
				// if (!(
				// this.timer[0] == null)) {
					
				// }
				this.timer = [null,null];//时间
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
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
					pageNum: this.form.page,
					pageSize: this.form.limit
				}
				console.log(data)
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.getMoneyRecord,
					data: qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					this.totalMoney=res.data.totalMoney
					if(res.success==true){
					   this.$message({
					       message:res.msg,
					       type: 'success'
					     })
						this.tableData = res.data.list;
					}else{
						 this.$message({
						    message: res.msg,
						    type: 'warning'
						  });
					}
				}).catch(data=>{
					console.log(data)
					this.$message({
						message: data.data.msg,
						type: 'error'
					});
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
	.t-se {
		font-size: 16px;
		font-weight: bold;
		margin-top: 20px;
	}
	
	.t-sf {
		margin-top: 40px;
	}
    .content{
		margin-top:20px;
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
</style>
