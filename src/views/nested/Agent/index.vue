<template>
	<div style="padding:20px;">
		<div class="head-ed">
			<span class="se-pl">审批状态</span>
			<el-select v-model="shzt" clearable placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<span class="sp-df">姓名</span>
			<div class="inputes">
				<el-input v-model="name" placeholder="请输入内容" style="width:185px;"></el-input>
			</div>
			<span class="sp-df">联系方式</span>
			<div class="inputes">
				<el-input v-model="tel" placeholder="请输入内容" style="width:185px;"></el-input>
			</div>
			<div class="inputes">
				<div class="block">
					<span class="demonstration" style="margin-right:10px;margin-left: 40px;">代理时间</span>
					<el-date-picker v-model="timer" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
			</div>
			<el-row class="inputes" style="margin-left: 20px">
				<el-button @click="add_dl">新增代理商</el-button>
			</el-row>
		</div>
		<div class="head-ed">
			<span class="se-pl">签约形式</span>
			<el-select v-model="qyxs" clearable placeholder="请选择">
				<el-option v-for="item in losed" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<span class="se-pl-t">代理级别</span>
			<el-select v-model="dljb" clearable placeholder="请选择">
				<el-option v-for="item in opsed" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<span class="sp-df">代理类型</span>
			<el-select class="input-one" v-model="dltype" clearable placeholder="请选择">
				<el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<span class="f-pl-t">代理状态</span>
			<el-select v-model="dlzt" clearable placeholder="请选择">
				<el-option v-for="item in opted" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>
		<div class="sed-font-t">
			<div class="inputes sed-font">代理区域</div>
			<div style="margin-left:13px;">
				<div class="block">
					<el-cascader v-model="adderedOne" :options="selected" change-on-select clearable></el-cascader>
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
			<el-row class="inputes" style="margin-left: 20px">
				<el-button @click="cleach">查询</el-button>
			</el-row>
			<el-row class="inputes" style="margin-left: 20px;">
			    <el-button @click="reset">重置</el-button>
			</el-row>
		</div>
		<div>
			<h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>

			<el-table :data="tableData.list" border style="width: 100%">
				<el-table-column prop="agent_create_time" label="申请时间" width="150">
				</el-table-column>
				<el-table-column prop="real_name" label="姓名" width="120">
				</el-table-column>
				<el-table-column prop="phone" label="电话" width="120">
				</el-table-column>
				<el-table-column prop="id_card_number" label="身份证号" width="220">
				</el-table-column>
				<el-table-column prop="card_address" label="家庭地址" width="300">
				</el-table-column>
				<el-table-column prop="proxy_region" label="代理区域" width="300">
				</el-table-column>
				<el-table-column prop="typeid" label="代理业务" width="80">
					<template slot-scope="scope">
						<span v-if="scope.row.typeid==10">共享农场</span>
						<span v-if="scope.row.typeid==12">农庄租赁</span>
						<span v-else-if="scope.row.typeid==13">共享工厂</span>
						<span v-else-if="scope.row.typeid==14">农家餐饮</span>
						<span v-else-if="scope.row.typeid==15">旅游景点</span>
						<span v-else-if="scope.row.typeid==16">民宿客栈</span>
						<span v-else-if="scope.row.typeid==17">共享商城</span>
						<span v-else-if="scope.row.typeid==18">绿色扶持</span>
						<span v-else-if="scope.row.typeid==19">农庄租赁</span>
					</template>
				</el-table-column>
				<el-table-column prop="level" label="代理级别" width="100">
					<template slot-scope="scope">
						<span v-if="scope.row.level==1">省级代理商</span>
						<span v-else-if="scope.row.level==2">市级代理商</span>
						<span v-else-if="scope.row.level==3">县级代理商</span>
						<span v-else-if="scope.row.level==4">乡级代理商</span>
						<span v-else-if="scope.row.level==5">村级代理商</span>
					</template>
				</el-table-column>
				<el-table-column prop="end_time" label="代理结束时间" width="120">
				</el-table-column>
				<el-table-column prop="proxy_money" label="代理费用" width="100">
					<template slot-scope="scope">
						<span>￥{{scope.row.proxy_money}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="earnest_money" label="所需定金" width="100">
					<template slot-scope="scope">
						<span>￥{{scope.row.earnest_money}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="proxy_payed" label="实际缴费" width="100">
					<template slot-scope="scope">
						<span>￥{{scope.row.proxy_payed}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="agent_check_state" label="审批状态" width="100">
					<template slot-scope="scope">
						<span v-if="scope.row.agent_check_state==1">待审核</span>
						<span v-else-if="scope.row.agent_check_state==2">已拒绝</span>
						<span v-else-if="scope.row.agent_check_state==3">已通过</span>
					</template>
				</el-table-column>
				<el-table-column prop="proxy_status" label="代理状态" width="100">
					<template slot-scope="scope">
						<span v-if="scope.row.proxy_status==1">有效</span>
						<span v-else-if="scope.row.proxy_status==2">无效</span>
					</template>
				</el-table-column>
				<el-table-column prop="sign_type" label="签约形式" width="100">
				</el-table-column>
				<el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button @click="contentClick(scope)" type="text" size="small">查看合同</el-button>
						<el-button @click="passClick(scope.row,$event)" type="text" size="small" v-if="scope.row.agent_check_state==2||scope.row.agent_check_state==3 ? false : true">通过</el-button>
						<el-button @click="noClick(scope.row,$event)" type="text" size="small" v-if="scope.row.agent_check_state==2||scope.row.agent_check_state==3 ? false : true">拒绝</el-button>
						<el-button @click="djClick(scope.row,$event)" type="text" size="small" v-if="scope.row.proxy_status=='1'&& scope.row.agent_check_state==3">冻结</el-button>
						<el-button @click="djClickOne(scope.row,$event)" type="text" size="small" v-if="scope.row.proxy_status=='2' && scope.row.agent_check_state==3">取消冻结</el-button>
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
				Djshow: false,
				Tgshow: true,
				Jushow: true,
				opt: '',
				form: {
					page: 1,
					limit: 10
				},
				options: [{//审批状态
					value: '1',
					label: '待审批'
				}, {
					value: '3',
					label: '已通过'
				}, {
					value: '2',
					label: '已拒绝'
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
				losed: [{
					value: '线上',
					label: '线上'
				}, {
					value: '线下',
					label: '线下'
				}],
				shzt: '',//审批状态
				name: '',//姓名
				tel: '',//联系方式
				timer: [],//时间
				dljb: '',//代理级别
				dltype: '',//代理类型
				dlzt: '',//代理状态
				qyxs: '',//签约形式
				selected: adderss,
				adderedOne: [],//代理区域1
				adderedTwo: '',//代理区域2
				adderedThree: '',//代理区域3
				adderssM: [],
				adderssN: [],
				tableData: '',
				total:'',
				dataTime:'',
				dataTime1:'',
				//区域范围
				province: '',
				city: '',
				country: '',
			}
		},
		components: {
			Pagination
		},
		created() {
			this.getList();
			this.getYw();
		},
		mounted() {},
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
				this.cleach();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
			getList() {//初始化
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.agentList,
					data: qs.stringify({
						pageNum: this.form.page,
						pageSize: this.form.limit
					}),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					if(res.success==true){
						this.tableData = res.data;
						this.total=this.tableData.total;
					}else{
						 this.$message({message: res.msg,type: 'warning'});
						this.tableData =[]
						this.total=0;
					}
				})
			},
			cleach() { //查询
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
					if (v.code == this.adderedTwo){
						 h1=v.name;
					}
				}
				for (var v of ob) {
					if (v.code == this.adderedThree) {
						 h2=v.name;
					}
				}
				// console.log(h1)
				// console.log(h2)
				// console.log('---------------')
				let data = {
					agentCheckState: this.shzt,
					realName: this.name,
					phone: this.tel,
					agentCreateTime: this.dataTime,
					endtime: this.dataTime1,
					province: this.province,
					city: this.city,
					country: this.country,
					town: h1,
					village:h2,
					level: this.dljb,
					typeid: this.dltype,
					proxyStatus: this.dlzt,
					signType: this.qyxs,
					pageNum: this.form.page,
					pageSize:this.form.limit,
				};
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.agentLikeList,
					data: qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					if(res.success){
					   this.$message({
					       message:res.msg,
					       type: 'success'
					     });
						this.tableData = res.data;
						this.total=this.tableData.total;
					}else{
						 this.$message({
						    message: res.msg,
						    type: 'warning'
						  });
						this.tableData =[]
					}
				})
			},
			contentClick(scope) { //合同
			 if(scope.row.level==1&&scope.row.sign_type=='线下'){
				 this.$router.push({path: '/provinceContract',query:{real_name:scope.row.real_name,id_card_number:scope.row.id_card_number,
						 card_address:scope.row.card_address,phone:scope.row.phone, typeid:scope.row.typeid,proxy_region:scope.row.proxy_region,
						 level:scope.row.level,agent_create_time:scope.row.agent_create_time,
						 endtime:scope.row.end_time,proxy_money:scope.row.proxy_money,
						 earnest_money:scope.row.earnest_money,
					 }})
			 }else if(scope.row.level==3&&scope.row.sign_type=='线下'){
				 this.$router.push({path: '/cityContract',query:{real_name:scope.row.real_name,id_card_number:scope.row.id_card_number,
						 card_address:scope.row.card_address,phone:scope.row.phone, typeid:scope.row.typeid,proxy_region:scope.row.proxy_region,
						 level:scope.row.level,agent_create_time:scope.row.agent_create_time,
						 endtime:scope.row.end_time,proxy_money:scope.row.proxy_money,
						 earnest_money:scope.row.earnest_money,
					 }})
			 } else if(scope.row.sign_type=='线上' && scope.row.typeid==14) {
				 this.$router.push({path: '/contract',query:{real_name:scope.row.real_name,id_card_number:scope.row.id_card_number,
						 card_address:scope.row.card_address,phone:scope.row.phone, typeid:scope.row.typeid,proxy_region:scope.row.proxy_region,
						 level:scope.row.level,agent_create_time:scope.row.agent_create_time,
						 endtime:scope.row.end_time,proxy_money:scope.row.proxy_money,
						 earnest_money:scope.row.earnest_money,
					 }})
			 } else if(scope.row.sign_type=='线上' && scope.row.typeid==19) {
				 this.$router.push({path: '/landContract',query:{real_name:scope.row.real_name,id_card_number:scope.row.id_card_number,
						 card_address:scope.row.card_address,phone:scope.row.phone, typeid:scope.row.typeid,proxy_region:scope.row.proxy_region,
						 level:scope.row.level,agent_create_time:scope.row.agent_create_time,pay_method:scope.row.pay_method,
						 endtime:scope.row.end_time,proxy_money:scope.row.proxy_money,proxy_payed:scope.row.proxy_payed,
						 earnest_money:scope.row.earnest_money,active_type:scope.row.active_type,
					 }})
			 }
			},
			passClick(row, e) { //通过
				var dtas = row;
				var el = e.target;
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.contractOperation,
					data: qs.stringify({
						id: dtas.id,
						phone: dtas.phone,
						agentCheckState: 3,
						typeid:dtas.typeid,
					}),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if (res.data.success) {
						this.$message({
							message:res.data.msg,
							type: 'success'
						});
						this.cleach();
					}else {
						this.$message({
							message:res.data.msg,
							type: 'warning'
						})

					}
				}).catch(res=>{
					this.$message({
						message:res.data.msg,
						type: 'error'
					})
				})
			},
			noClick(row) { //不通过
				var dtas = row;
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.contractOperation,
					data: qs.stringify({
						id: dtas.id,
						phone: dtas.phone,
						agentCheckState: 2,
						typeid:dtas.typeid,
					}),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if (res.data.success) {
						this.$message({
							message:res.data.msg,
							type: 'success'
						});
						this.cleach();
					}else {
						this.$message({
							message:res.data.msg,
							type: 'warning'
						})

					}
				}).catch(res=>{
					this.$message({
						message:res.data.msg,
						type: 'error'
					})
				})
			},
			add_dl() { //代理申请
				this.$router.push({
					path: '/delisted'
				})
			},
			djClick(row) { //冻结
				var dtas = row;
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.freezeStatus,
					data: qs.stringify({
						id: dtas.id,
						freezeType:1,
					}),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					if (res.success == true) {
						this.getList()
					}
				})
			},
			djClickOne(row) { //取消冻结
				var dtas = row;
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.freezeStatus,
					data: qs.stringify({
						id: dtas.id,
						freezeType:2,
					}),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					if (res.success == true) {
						this.getList()
					}
				})
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
					let arrey = [];
					let obj = {};
					if (res.success) {
						for (var v of arr) {
							obj = {
								value: v.id,
								label: v.typeName
							};
							arrey.push(obj);
						}
						this.opt = arrey;
					}
				})
			},
		},
		watch: {
			adderedOne: function(val, old) {
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
					};
					this.axios({
						method: "post",
						url: this.$local.http + this.$api.getAid2018ByCode,
						data: qs.stringify(data),
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(data => {
						let res = data.data;
						this.adderssM = res.data;
					})
				} else {
					console.log('位数不够！');
					this.province = '';
					this.city = '';
					this.country = '';
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
					this.adderssN = res.data;
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
	}

	.sed-font-t {
		margin-bottom: 15px;
		overflow: hidden;
		margin-top: 10px;
	}

	.sed-font-t>div {
		float: left;
	}

	.fen-df {
		margin-top: 20px;
	}
</style>
