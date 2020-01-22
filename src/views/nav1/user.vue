<template>
	<div style="padding:20px;">
		<div class="head-ed">
			<span style="margin-right:10px;">联系方式</span>
			<div class="inputes">
				<el-input v-model="tel" placeholder="请输入内容" style="width:185px;"></el-input>
			</div>
			<span class="sp-df">姓名</span>
			<div class="inputes">
				<el-input v-model="name" placeholder="请输入内容" style="width:185px;"></el-input>
			</div>
			<span class="se-pl" style="margin-left:26px;">总结款状态</span>
			<el-select v-model="shzt" clearable placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<div class="inputes" style="margin-left: 20px">
				<div class="block">
					<span class="demonstration" style="margin-right:10px;">代理时间</span>
					<el-date-picker v-model="timer" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
			</div>
		</div>
		<div class="head-ed">
			<span class="se-pl">代理级别</span>
			<el-select v-model="dljb" clearable placeholder="请选择">
				<el-option v-for="item in opsed" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<span class="se-pl-t">代理类型</span>
			<el-select class="input-one" v-model="dltype" clearable placeholder="请选择">
				<el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.label">
				</el-option>
			</el-select>
			<span class="f-pl-t">代理状态</span>
			<el-select v-model="dlzt" clearable placeholder="请选择">
				<el-option v-for="item in opted" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-row class="inputes" style="margin-left: 20px">
				<el-button type="primary" @click="getList">查询</el-button>
			</el-row>
			<el-row class="inputes" style="margin-left: 20px;">
			    <el-button @click="reset">重置</el-button>
			</el-row>
		</div>
		<div class="sed-font-t">
			<div class="inputes sed-font">代理区域</div>
			<div style="margin-top:12px;margin-left:13px;">
				<div class="block">
					<el-cascader v-model="adderedOne" :options="selected" change-on-select></el-cascader>
					<el-select v-model="adderedTwo" clearable placeholder="请选择">
						<el-option v-for="item in adderssM" :key="item.code" :label="item.name" :value="item.code">
						</el-option>
					</el-select>
					<el-select v-model="adderedThree" clearable placeholder="请选择">
						<el-option v-for="item in adderssN" :key="item.code" :label="item.name" :value="item.code">
						</el-option>
					</el-select>
				</div>
			</div>
		</div>
		<div>
			<h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
			<el-row class="h6_right">
				<el-button @click="add_dl">查看支出明细</el-button>
			</el-row>
			<el-table :data="tableData.list" border style="width: 100%">
				<el-table-column  type="index" align="center" label="序号"  width="50">
				</el-table-column>
				<el-table-column prop="real_name" align="center" label="姓名" width="90">
				</el-table-column>
				<el-table-column prop="phone" align="center" label="电话" width="120">
				</el-table-column>
				<el-table-column prop="id_card_number" align="center" label="身份证号" width="200">
				</el-table-column>
				<el-table-column prop="card_address" align="center" label="家庭地址" width="300">
				</el-table-column>
				<el-table-column prop="proxy_region" align="center" label="代理区域" width="400">
				</el-table-column>
				<el-table-column prop="type_name" align="center" label="代理类型" width="80">
				</el-table-column>
				<el-table-column prop="level" align="center" label="代理级别" width="120">
				</el-table-column>
				<el-table-column prop="agent_create_time" align="center" label="代理时间" width="150">
				</el-table-column>
				<el-table-column prop="proxy_status" align="center" label="代理状态" width="100">
					<template slot-scope="scope">
						<span v-if="scope.row.proxy_status==1">有效</span>
						<span v-else-if="scope.row.proxy_status==2">无效</span>
					</template>
				</el-table-column>
				<el-table-column prop="totalIsNotMyOrderFee" align="center" label="区域交易量代理费提成" width="100">
					<template slot-scope="scope">
						<span>￥{{scope.row.totalIsNotMyOrderFee||0}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="totalIsMyOrderFee" align="center" label="自主开发交易量提成" width="100">
					<template slot-scope="scope">
						<span>￥{{scope.row.totalIsMyOrderFee||0}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="totalMyOrderFee" align="center" label="总代理费提成" width="130">
					<template slot-scope="scope">
						<span>￥{{scope.row.totalMyOrderFee||0}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="totalMyAlreadyOrderFee" align="center" label="实际结款" width="100">
					<template slot-scope="scope">
						<span>￥{{scope.row.totalMyAlreadyOrderFee||0}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="returnState" align="center" label="结款状态" width="100">
				</el-table-column>
				<el-table-column label="操作" align="center" width="100">
					<template slot-scope="scope">
						<el-button @click="djClick(scope)" type="text" size="small">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit"
		 @pagination="getList" />
	</div>
</template>
<script>
	import adderss from '@/api/adderss'
	import Pagination from '@/components/Pagination'
	import qs from 'qs'
	export default {
		data() {
			return {
				opt: '',
				form: {
					page: 1,
					limit: 10
				},
				options: [ {
					value: '1',
					label: '已结清'
				}, {
					value: '2',
					label: '未结清'
				}],
				opsed: [{
						value: '1',
						label: '省级'
					},
					{
						value: '2',
						label: '市级'
					},
					{
						value: '3',
						label: '县区级'
					}, {
						value: '4',
						label: '乡镇级'
					}, {
						value: '5',
						label: '村社级'
					}
				],
				opted: [{
					value: '1',
					label: '有效'
				}, {
					value: '2',
					label: '无效'
				}],
				shzt: '',
				name: '',
				tel: '',
				timer: [],
				dljb: '',
				dltype: '',
				dlzt: '',
				selected: adderss,
				adderedOne: [],
				adderedTwo: '',
				adderedThree: '',
				adderssM: [],
				adderssN: [],
				tableData: '',
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
			this.getYw();
		},
		mounted() {

		},
		methods: {
			//重置
			reset(){
				// if (!(
				// this.timer[0] == null && 
				// this.shzt==''  && 
				// this.name==''  && 
				// this.tel==''  && 
				// this.dljb==''  && 
				// this.dltype=='' && 
				// this.dlzt=='' && 
				// this.qyxs=='' && 
				// this.adderedOne=='' && 
				// this.adderedTwo=='' && 
				// this.adderedThree=='')) {
					
				// }
				this.shzt = '';//审批状态
				this.name = '';//姓名
				this.tel = '';//联系方式
				this.timer = [null,null];//时间
				this.dljb = '';//代理级别
				this.dltype = '';//代理类型
				this.dlzt = '';//代理状态
				this.qyxs = '';//签约形式
				this.adderedOne = [];//代理区域1
				this.adderedTwo = '';//代理区域2
				this.adderedThree = '';//代理区域3
				this.province = '';
				this.city = '';
				this.country = '';
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
				let h1='',h2='';
                var obj=this.adderssM;
				var ob=this.adderssN;
				for (var v of obj) {
					if (v.code == this.adderedTwo) {
						 h1=v.name;
					}
				}
				for (var v of ob) {
					if (v.code == this.adderedThree) {
						 h2=v.name;
					}
				}
				var user = JSON.parse(sessionStorage.getItem('user'))
				console.log(user)
				let data = {
					// user_id:user.userId,
					user_id:user.id,
					pay_state: this.shzt,
					real_name: this.name,
					phone: this.tel,
					begin_time: this.dataTime,
					end_time: this.dataTime1,
					province_c: this.province,
					city_c: this.city,
					country_c: this.country,
					town_c: h1,
					village_c:h2,
					level: this.dljb,
					type_name: this.dltype,
					proxy_status: this.dlzt,
					pageNum: this.form.page,
					pageSize: this.form.limit,
				};
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.queryAgentOderList,
					data: qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if (res.data.success) {
						this.tableData=res.data.data;
						this.total=this.tableData.total;
						// this.timer=[];
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
			
			
			
			add_dl() { //查看明细
				this.$router.push({
					path: '/userfind'
				})
			},
			djClick(scope) { //查看详情
				this.$router.push({path:'/userSearch',query:{real_name:scope.row.real_name,phone:scope.row.phone,
						proxy_region:scope.row.proxy_region,type_name:scope.row.type_name,level:scope.row.level,
						agent_create_time:scope.row.agent_create_time,card_address:scope.row.card_address,
						id_card_number:scope.row.id_card_number,id:scope.row.agent_application_id,proxy_status:scope.row.proxy_status,
						proxyMoney:scope.row.totalMyOrderFee,pay_money:scope.row.totalMyAlreadyOrderFee,
					}})
			},
			getYw() { //查询业务
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.initAgentFeeSet,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					let arr = res.data.join_fee_list;
					console.log(arr)
					let arrey = [];
					let obj = {}
					if (res.success) {
						for (var v of arr) {
							obj = {
								value: v.id,
								label: v.typeName
							}
							arrey.push(obj);
						}
						this.opt = arrey;
					}
				})
			},
		},
		watch: {
			adderedOne: function(val, old) {
				console.log(val)
				var arr = val;
				var obj = this.selected;
				for (var v of obj) {
					if (v.value == arr[0]) {
						console.log(v.label)
						this.province = v.label;
						for (var h of v.children) {
							if (h.value == arr[1]) {
								this.city = h.label;
								for (var m of h.children) {
									if (m.value == arr[2]) {
										this.country = m.label;
									}
								}
							}
						}
					}
				}
				if (arr.length == 3) {
					var data = {
						code: arr[2]
					}
					console.log(data)
					this.axios({
						method: "post",
						url: this.$local.http + this.$api.getAid2018ByCode,
						data: qs.stringify(data),
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(data => {
						let res = data.data;
						console.log(res)
						this.adderssM = res.data;
					})
				} else {
					console.log('位数不够！');
				}
			},
			adderedTwo: function(val, old) {
				var val = val;
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.getAid2018ByCode,
					data: qs.stringify({
						code: val
					}),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					console.log(res)
					this.adderssN = res.data;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.h6 {
		float: left;
		padding: 10px 5px;
		font-size: 16px;
	}
	.h6_right{text-align: right;float: right;margin-bottom: 10px;}
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
