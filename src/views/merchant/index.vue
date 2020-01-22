<template>
	<div class="app-container">
		<div class="settled_nav">
			<div class="settled_nav_left fl">
				<ul>
					<li>
						<p class="fl">姓名</p>
						<input type="text" placeholder="请输入" class="fl" v-model.trim='form.name' />
					</li>
					<li>
						<p class="fl">联系方式</p>
						<input type="text" placeholder="请输入" class="fl" v-model.trim='form.phone' />
					</li>
					<li>
						<p class="fl">进账时间</p>
						<div class="time">
							<el-date-picker v-model="value1" value-format="timestamp" type="daterange" placeholder="请选择" range-separator="至"
							 start-placeholder="开始日期" end-placeholder="结束日期" @change="change"></el-date-picker>
						</div>
					</li>
					<li>
						<p class="fl">记录方式</p>
						<el-row class="block-col-2">
							<el-col :span="6" class="daili">
								<el-select v-model="form.Record" placeholder="请选择">
									<el-option label="线上支付" value="1"></el-option>
									<el-option label="人工记录" value="2"></el-option>
								</el-select>
							</el-col>
						</el-row>
					</li>
				</ul>
			</div>
			<div class="settled_nav_right fr pointer">
				<div @click="getList()">查询</div>
				<div @click="goBack()">返回</div>
			</div>
		</div>
		<h6 class="h6" v-show="initData.total>0">共{{initData.total}}条记录，{{initData.pages}}页。当前为第{{form.page}}页</h6>
		<el-table :data="initData.list" border fit highlight-current-row style="width: 100%">
			<el-table-column align="center" label="进账时间">
				<template slot-scope="scope">
					<span>{{scope.row.business_create_time}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="姓名">
				<template slot-scope="scope">
					<span>{{scope.row.real_name}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="电话">
				<template slot-scope="scope">
					<span>{{scope.row.phone}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="店铺地址">
				<template slot-scope="scope">
					<span>{{scope.row.other_address}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="店铺名称">
				<template slot-scope="scope">
					<span>{{scope.row.company_name}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="店铺类型">
				<template slot-scope="scope">
					<span v-if="scope.row.shop_type==1">共享商城</span>
					<span v-if="scope.row.shop_type==2">共享农场</span>
					<span v-else-if="scope.row.shop_type==3">共享工厂</span>
					<span v-else-if="scope.row.shop_type==4">民宿客栈</span>
					<span v-else-if="scope.row.shop_type==5">农家餐饮</span>
					<span v-else-if="scope.row.shop_type==6">综合农庄</span>
					<span v-else-if="scope.row.shop_type==7">旅游景点</span>
					<span v-else-if="scope.row.shop_type==8">农庄租赁</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="缴费金额">
				<template slot-scope="scope">
					<span>{{scope.row.business_payed}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="支付方式">
				<template slot-scope="scope">
					<span v-if="scope.row.record_way==1">线上</span>
					<span v-if="scope.row.record_way==2">人工</span>
				</template>
			</el-table-column>
		</el-table>
		<pagination v-show="initData.total>0" :total="initData.total" :page.sync="form.page" :limit.sync="form.limit"
		 @pagination="getList" />
	</div>
</template>

<script>
	import {
		formatDate
	} from '../../common/js/filters.js'
	import Pagination from '@/components/Pagination'
	export default {
		name: 'index',
		components: {
			Pagination
		},
		filters: {
			formatDate(time) {
				var data = new Date(time);
				return formatDate(data, 'yyyy-MM-dd');
			}
		},
		data() {
			return {
				form: {
					name: '',
					phone: '',
					Record: '',
					page: 1,
					limit: 10
				},
				value1: [],
				initData: [],
				dataTime: '',
				dataTime1: '',
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			//时间
			change() {
				this.dataTime = this.value1[0].getTime();
				this.dataTime1 = this.value1[1].getTime();
			},
			getList() {
				let this_ = this;
				const formDatas = new FormData()
				formDatas.append('realName', this_.form.name)
				formDatas.append('phone', this_.form.phone)
				formDatas.append('beginTime', this_.dataTime)
				formDatas.append('endTime', this_.dataTime1)
				formDatas.append('recordWay', this_.form.Record)
				formDatas.append('pageNum', this_.form.page)
				formDatas.append('pageSize', this_.form.limit)
				this.axios({
					method: "POST",
					url: this.$local.http + this.$api.receiptsDetail,
					data: formDatas,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					console.log(res)
					if (res.data.success) {
						this.initData = res.data.data;
						this.dataTime = '';
						this.dataTime1 = '';
						this.value1 = [];
					}
				}).catch(res => {
					this.$message({
						message: res.data.msg,
						type: 'error'
					})
				})
			},
			goBack() { //返回
				this.$router.push({
					path: '/merchantsSettle'
				})
			}
		}
	}
</script>

<style scoped>
	.app-container {
		width: 100%;
		background-color: #fff;
		padding: 20px;
	}

	.edit-input {
		padding-right: 100px;
	}

	.cancel-btn {
		position: absolute;
		right: 15px;
		top: 10px;
	}

	/deep/.el-dialog__footer {
		padding-bottom: 30px !important;
	}

	/deep/.cell {
		padding: 0 5px !important;
	}

	.time {
		width: 65%;
		float: left;
	}

	/deep/.el-date-editor--datetimerange.el-input,
	.el-date-editor--datetimerange.el-input__inner {
		width: 100%;
		padding: 3px 0;
	}

	.h6 {
		padding: 10px 5px;
		font-size: 16px;
	}

	.p {
		font-size: 14px;
		padding: 10px 5px;
	}

	.settled_nav {
		overflow: hidden;
	}

	.settled_nav_left {
		width: 80%;
	}

	.settled_nav_left ul {
		overflow: hidden;
	}

	.settled_nav_left ul li {
		float: left;
		width: 50%;
		padding: 10px 0;
	}

	.settled_nav_left ul li:nth-child(1) p {
		padding-right: 42px;
	}

	/*.settled_nav_left ul li:nth-child(6) p{font-size: 14px;line-height: 34px;padding: 0 15px;color: #000;width: 20%;float: left;}*/
	.settled_nav_left ul li p {
		font-size: 14px;
		line-height: 34px;
		padding: 0 15px;
		color: #000;
		float: left;
		text-align: right;
	}

	.settled_nav_left ul li input {
		width: 50%;
		line-height: 30px;
		padding-left: 10px;
		float: left;
		border: 1px solid #DCDFE6;
	}

	.settled_nav_right div {
		width: 60px;
		line-height: 26px;
		text-align: center;
		border-radius: 5px;
		border: 1px solid #DCDFE6;
		margin: 50px 0;
		display: inline-block;
	}

	.settled_nav_right {
		width: 20%
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #409EFF;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	.demonstration {
		display: block;
		color: #8492a6;
		font-size: 14px;
		margin-bottom: 20px;
	}

	.daili {
		line-height: 34px;
		text-align: center;
	}

	.el-dropdown-link {
		color: #42b983;
		outline: none;
	}
</style>
