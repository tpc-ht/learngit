<template>
	<div style="padding:20px;">
		<div class="head-ed">
			<span class="blsed">代理商信息</span>
		</div>
		<div class="head-ed">
			<div class="p_one" style="margin-top: 10px;">
				<span class="se-pl">代理类型：{{type_name}}</span>
			</div>
			<div class="p_one">
				<div class="se-pl">姓名：{{real_name}}</div>
			</div>
			<div class="p_one">
				<div class="se-pl">电话：{{phone}}</div>
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
				<span class="se-pl">代理级别：
					<span v-if="level==1">省级代理商</span>
					<span v-else-if="level==2">市级代理商</span>
					<span v-else-if="level==3">县级代理商</span>
					<span v-else-if="level==4">乡级代理商</span>
					<span v-else-if="level==5">村级代理商</span>
				</span>
			</div>
			<div class="p_one">
				<span class="se-pl">代理开始时间：{{agent_create_time}}</span>
			</div>
			<div class="p_one">
				<span class="se-pl">代理返利：￥{{returnJoinFee}}</span>
			</div>
		</div>
		<div class="head-ed">
			<span class="blsed">下级代理商</span>
		</div>
		<div class="head-ed">
			<h6 class="h6" v-show="tableData.total>0">共{{tableData.total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
			<el-table :data="tableData.list" border style="width: 100%">
				<el-table-column prop="real_name" label="姓名" width="150">
				</el-table-column>
				<el-table-column prop="phone" label="联系方式" width="150">
				</el-table-column>
				<el-table-column prop="proxy_region" label="代理区域" width="400">
				</el-table-column>
				<el-table-column prop="type_name" label="代理类型" width="150">
				</el-table-column>
				<el-table-column prop="level" label="代理级别" width="150">
					<template slot-scope="scope">
						<span v-if="scope.row.level==1">省级代理商</span>
						<span v-else-if="scope.row.level==2">市级代理商</span>
						<span v-else-if="scope.row.level==3">县级代理商</span>
						<span v-else-if="scope.row.level==4">乡级代理商</span>
						<span v-else-if="scope.row.level==5">村级代理商</span>
					</template>
				</el-table-column>
				<el-table-column prop="agent_create_time" label="加盟时间" width="150">
				</el-table-column>
				<el-table-column prop="returnJoinFee" label="加盟返利" width="150">
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<pagination v-show="tableData.total>0" :total="tableData.total" :page.sync="form.page" :limit.sync="form.limit"
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
				tableData: '',
				real_name:this.$route.query.real_name,
				phone:this.$route.query.phone,
				proxy_region:this.$route.query.proxy_region,
				type_name:this.$route.query.type_name,
				level:this.$route.query.level,
				agent_create_time:this.$route.query.agent_create_time,
				returnJoinFee:this.$route.query.returnJoinFee,
				card_address:this.$route.query.card_address,
				id_card_number:this.$route.query.id_card_number,
				agent_user_id:this.$route.query.agent_user_id,
			}
		},
		components: {
			Pagination
		},
		mounted() {
			this.getList();
		},
		methods: {
			getList() { //初始化
				let Time = this.agent_create_time;
				let Start = new Date(Time);
				let agentCreateTime = Start.getTime() //当前时间转换成long型
				if (Time == '') {
					agentCreateTime = '';
				}
				let data = {
					user_id:this.agent_user_id,
					real_name:'',
					phone:'',
					type_name:'',
					begin_time:'',
					end_time: '',
					level:'',
					pageNum:this.form.page,
					pageSize:this.form.limit,
				}

				this.axios({
					method: "post",
					url: this.$local.http + this.$api.agentUserFee,
					data: qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					console.log(res)
					if(res.success==true){
						this.tableData = res.data.dataList;
						this.$message({
							message:res.msg,
							type: 'success'
						})
					}else{
						this.$message({
							message: res.msg,
							type: 'warning'
						});
					}
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
    .blsed{
		font-size:18px;
		font-weight:bold;
	}
	.active {
		background: #59a7e4;
		color: #ffffff;
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
		font-weight: 200;
		width: 10%;
	}

	.head-ed {
		margin-top: 10px;
	}

	.head-ed>div {
		line-height: 40px;
	}

	.el-select {
		width: 185px !important;
	}

	/*.p_one>div {*/
		/*float: left;*/
	/*}*/

	.se-pl-t {
		margin-right: 10px;
	}

	.p_two {
		font-size: 16px;
		font-weight: 200px;
		height: 30px;
	}
</style>
