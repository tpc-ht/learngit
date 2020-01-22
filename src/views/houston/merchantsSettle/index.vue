<template>
	<!-- 商家入驻 -->
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
						<p class="fl">入驻时间</p>
						<el-date-picker v-model="form.value1" type="datetime" placeholder="选择日期时间">
						</el-date-picker>
					</li>

					<li>
						<p class="fl">店铺名称</p>
						<input type="text" placeholder="请输入" class="fl" v-model.trim='form.dpname' />
					</li>
					<li>
						<p class="fl">店铺状态</p>
						<el-row class="block-col-2">
							<el-col :span="12" class="daili">
								<el-select v-model="form.state" placeholder="请选择">
									<el-option label="有效" value="有效"></el-option>
									<el-option label="失效" value="失效"></el-option>
								</el-select>
							</el-col>
						</el-row>
					</li>
					<li>
						<p class="fl"></p>
					</li>
				</ul>
			</div>
			<div class="settled_nav_con fl pointer">
				<el-button @click="getList()">查询</el-button>
			</div>
			<div class="settled_nav_con fl pointer">
				 <el-button @click="reset()">重置</el-button>
			</div>
			<div class="settled_nav_right fr pointer">
				<el-button @click="toDetails()">查看进账明细</el-button>
			</div>
		</div>
		<h6 class="h6" v-if="total>0">共{{total}}条记录，{{initData.pages}}页。当前为第{{form.page}}页</h6>
		<el-table :data="initData.list" border fit highlight-current-row style="width: 100%">
			<el-table-column align="center" label="入驻时间">
				<template slot-scope="scope">
					<span>{{scope.row.business_create_time}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="姓名" width="100px">
				<template slot-scope="scope">
					<span>{{ scope.row.real_name }}</span>
				</template>
			</el-table-column>

			<el-table-column align="center" label="电话">
				<template slot-scope="scope">
					<span>{{ scope.row.phone }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="店铺名称">
				<template slot-scope="scope">
					<span>{{ scope.row.company_name}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="店铺地址">
				<template slot-scope="scope">
					<span>{{ scope.row.other_address }}</span>
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
			<el-table-column align="center" label="店铺状态">
				<template slot-scope="scope">
					<span>{{ scope.row.business_status}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="实际缴费">
				<template slot-scope="scope">
					<span>{{ scope.row.business_payed}}</span>
				</template>
			</el-table-column>
		</el-table>
		<pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit"
		 @pagination="getList" />
	</div>
</template>

<script>
	import Pagination from '@/components/Pagination'
	export default {
		name: 'index',
		components: {
			Pagination
		},
		data() {
			return {
				form: {
					name: '',
					phone: '',
					state: '',
					value1: '',
					dpname: '',
					page: 1,
					limit: 10
				},
				initData: '',
				dataTime: '',
				total:'',
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList() {
				if (this.form.value1 !='') {
					this.dataTime = (this.form.value1).getTime();
				}else {
					this.dataTime =''
				}
				let this_ = this;
				const formDatas = new FormData()
				formDatas.append('name', this_.form.dpname);
				formDatas.append('phone', this_.form.phone);
				formDatas.append('checkTime', this_.dataTime);
				formDatas.append('realName', this_.form.name);
				formDatas.append('status', this_.form.state);
				formDatas.append('pageNum', this_.form.page);
				formDatas.append('pageSize', this_.form.limit);
				console.log(this.$local.http + this.$api.merchantsInfo)
				this.axios({
					method: "POST",
					url: this.$local.http + this.$api.merchantsInfo,
					data: formDatas,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if (res.data.success) {
						this.initData = res.data.data;
						this.total=this.initData.total;
					} else {
						this.$message({message: res.data.msg, type: 'error'})
						this.initData =[]
					}
				}).catch(res => {
					this.$message({
						message: res.data.msg,
						type: 'error'
					})
				})
			},
			toDetails() {
				this.$router.push({
					path: '/merchantSb'
				})
			},
			//重置
				reset(){
					// if (!(this.form.value1 == '' && this.form.name=='' && this.form.phone=='' && this.form.dpname=='' && this.form.state=='' )) {
						
					// }
					this.form.name= this.form.phone= this.form.dpname= this.form.state=''
					this.form.value1 ='';
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
		width: 28%;
		padding: 10px 0;
	}

	.settled_nav_left ul li:nth-child(3) {
		float: left;
		width: 44%;
		padding: 10px 0;
	}

	/*.settled_nav_left ul li:nth-child(6){float: left;width: 44%;padding: 10px 0;}*/
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

	.settled_nav_con {
		width: 6%;
		margin: 50px auto 0;
	}
	.settled_nav_right {
		width: 14%;
		margin: 50px auto 0;
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
