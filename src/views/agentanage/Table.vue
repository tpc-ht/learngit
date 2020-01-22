<template>
	<div class="box">
		<div class="head clearbox">
			<div class="head-o m2">
				<div class="t-ef3">
					<p>区域商户数</p>
				</div>
				<p class="t-ef_p">{{titleData.totalNoOwnShopNum||0}}</p>
			</div>
			<div class="head-o m2">
				<div class="t-ef4">
					<p>开发商户数</p>
				</div>
				<p class="t-ef_p">{{titleData.totalOwnShopNum||0}}</p>
			</div>
			<div class="head-o m2">
				<div class="t-ef">
					<p>入驻返利</p>
				</div>
				<p class="t-ef_p">￥{{titleData.allShopFee||0}}</p>
			</div>
			<div class="head-o m2">
				<div class="t-ef1">
					<p>平台已返利</p>
				</div>
				<p class="t-ef_p">￥{{titleData.alreadyGetShopFee||0}}</p>
			</div>
			<div class="head-o m2">
				<div class="t-ef2">
					<p>未结款</p>
				</div>
				<p class="t-ef_p1">￥{{titleData.noGetShopFee||0}}</p>
			</div>
		</div>
		<div class="agentNav">
			<ul>
				<li>
					代理商区域：<p>{{initData.proxy_region}}</p>
				</li>
				<li>
					代理级别：<p>{{initData.level}}</p>
				</li>
				<li>
					代理时间：<p>{{initData.agent_create_time}} 至 {{initData.end_time}}</p>
				</li>
				<li>
					状态：<p v-if="initData.proxy_status==1">有效</p>
					<p v-if="initData.proxy_status==2">无效</p>
				</li>
			</ul>
		</div>
		<div class="content">
			<div class="head-ed">
				<ul>
					<li>
						<p class="se-pl">店铺名称</p>
						<div class="inputes">
							<el-input v-model="shop" placeholder="请输入内容" style="width:185px;"></el-input>
						</div>
					</li>
					<li>
						<p class="sp-df">联系人</p>
						<div class="inputes">
							<el-input v-model="name" placeholder="请输入内容" style="width:185px;"></el-input>
						</div>
					</li>
					<li>
						<p class="sp-df">联系方式</p>
						<div class="inputes">
							<el-input v-model="tel" placeholder="请输入内容" style="width:185px;"></el-input>
						</div>
					</li>
					<li>
						<p class="sp-df">是否自主研发</p>
						<el-select v-model="myself" clearable placeholder="请选择" style="width:185px;">
							<el-option v-for="item in opsed" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>
					<li>
						<p class="sp-df">入驻时间</p>
						<div class="inputes">
							<el-date-picker v-model="timer" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</div>

					</li>
					<el-row class="AgencyFee_but">
						<el-button @click="getList">查询</el-button>
						<el-button @click="reset">重置</el-button>
					</el-row>
				</ul>
			</div>
		</div>
		<div class="bvodry">
			<h6 class="h6" v-if="tableData.total>0">共{{tableData.total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
				<el-table :data="tableData.list" border style="width: 100%">
					<el-table-column  type="index" align="center" label="序号"  width="50">
					</el-table-column>
					<el-table-column :formatter="this.formatTime"  align="center" label="入驻时间" width="200">
					</el-table-column>
					<el-table-column prop="shop_name" align="center" label="店铺名称" width="200">
					</el-table-column>
					<el-table-column prop="shop_type" align="center" label="店铺类型"  width="120">
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
					<el-table-column prop="real_name" align="center" label="联系人" width="160" >
					</el-table-column>
					<el-table-column prop="phone" align="center" label="联系方式" width="160">
					</el-table-column>
					<el-table-column prop="address" align="center" label="所属地址" min-width>
					</el-table-column>
					<el-table-column prop="business_payed" align="center" label="入驻费用" width="120">
					</el-table-column>
					<el-table-column prop="my_shop" align="center" label="是否自主研发"  width="120">
					</el-table-column>
					<el-table-column prop="returnMoney" align="center" label="入驻返利" width="120">
					</el-table-column>
				</el-table>
			<!-- 分页 -->
			<pagination v-if="tableData.total>0" :total="tableData.total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
		</div>
		<div>
			<p class="t-se">当前筛选统计结果</p>
			<p class="t-sf">入驻总返利 ￥{{totalShopFee||0}}</p>
			<p class="t-sf">已结算总额 ￥{{titleData.alreadyGetShopFee||0}}</p>
			<p class="t-sf">未结算 ￥{{titleData.noGetShopFee||0}}</p>
		</div>
	</div>
</template>

<script>
	import Pagination from '@/components/Pagination'
	import { Message } from 'element-ui';
	import qs from 'qs'
	export default {
		data() {
			return {
				form: {
					page: 1,
					limit: 10
				},
				opsed: [{
						value: '1',
						label: '是'
					},
					{
						value: '0',
						label: '否'
					}
				],
				myself:'',
				shop:'',
				name: '',
				tel: '',
				tableData:[],
				titleData:{},
				totalShopFee:'',
				initData:{},
				timer:[],
				user:JSON.parse(sessionStorage.getItem('user')),
				dataTime:'',
				dataTime1:'',
			}
		},
		components: {
			Pagination
		},
		created() {
			this.getData()
			this.getList();
			this.getInit()
		},
		mounted() {
			
		},
		methods: {
			//重置 shop name tel myself timer
			reset(){
				// if (!(
				// this.timer[0] == null && 
				// this.name==''  &&
				// this.shop==''  && 
				// this.tel==''  && 
				// this.myself=='')) {
					
				// }
				this.name = '';//姓名
				this.tel = '';//联系方式
				this.shop = '';
				this.myself = '';
				this.timer = [null,null];//时间
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
            formatTime(row, column, cellValue){//格式化列created_at
                return this.formatterTime(row.created_at);
			},
            formatterTime(a){//时间格式转换器：2019-6-4 15:13:16
                if(a=="" || a==null || a==undefined){
                    return "暂无数据";
                }
                var time = new Date(a);
                var yyyy = time.getFullYear();
                var month = this.add0(time.getMonth()+1);
                var dd = this.add0(time.getDay());
                var hh = this.add0(time.getHours());
                var mm = this.add0(time.getMinutes());
                var ss = this.add0(time.getSeconds());
                return yyyy +"-"+month+"-"+dd+" "+hh+":"+mm+":"+ss;
            },
            add0(m){//月和天小于10要补0
                return m<10?('0'+m):m;
            },
			getInit() { //初始化
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.queryAgentUserInfo,
					data: qs.stringify({
						user_id:this.user.id
					}),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					if(res.success==true){
						this.initData = res.data;
					}else{
						this.$message({message: res.msg, type: 'warning'});
					}
				})
			},
			getData() { //初始化
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.agentShopFeeStatistics,
					data: qs.stringify({
						user_id:this.user.id
					}),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					if(res.success==true){
						this.titleData = res.data;
					}else{
						this.$message({message: res.msg, type: 'warning'});
					}
				})
			},
			getList() { //查询
				
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
					shopName: this.shop,
					shopContentname: this.name,
					phone: this.tel,
					startTime: this.dataTime,
					endTime: this.dataTime1,
					myShop: this.myself,
					pageNum: this.form.page,
					pageSize:this.form.limit,
				};
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.agentShopFee,
					data: qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					if(res.success==true){
					   this.$message({message:res.msg, type: 'success'});
						this.tableData = res.data.dataList;
					   this.totalShopFee=res.data.totalShopFee;
					}else{
						this.$message({message: res.msg, type: 'warning'});
						this.tableData =[];
						this.totalShopFee=''
					}
				}).catch(res=>{
					this.$message({message:res.data.msg, type: 'error'});
					this.tableData =[];
					this.totalShopFee=''
				})
			}
		}
	}
</script>
<style scoped="scoped" lang="scss">
	.h6{line-height: 30px;font-size: 14px;}
	.clearbox::after{
		content:'';
		display:block;
		visibility:hidden;
		height:0;
		clear:both;
	}
	.box{
		padding:30px;
		.head>div{
			float: left;
			margin-top: 15px;
		}
		.head-o>p{
			font-size:18px;
			font-weight:bold;
			line-height:30px;
		}
		.t-ef{
			width:128px;
			height:128px;
			text-align: center;
			background-color: #fdd631;
			border-radius: 8px;
			line-height: 128px;
			font-size: 16px;
			color: #fff;
			display: inline-block;
		}
		.t-ef_p{
			font-size: 20px;
			color: #18c79c;
			line-height: 128px;
			display: inline-block;
			width: 128px;
			text-align: center;
			word-wrap:break-word;
		}
		.t-ef_p1{
			font-size: 20px;
			color: #ef776d;
			line-height: 128px;
			display: inline-block;
			width: 128px;
			text-align: center;
			word-wrap:break-word;
		}
		.t-ef1{
			width:128px;
			height:128px;
			text-align: center;
			background-color: #1fc6f3;
			border-radius: 8px;
			line-height: 128px;
			font-size: 16px;
			color: #fff;
			display: inline-block;
		}
		.t-ef2{
			width:128px;
			height:128px;
			text-align: center;
			background-color: #34c874;
			border-radius: 8px;
			line-height: 128px;
			font-size: 16px;
			color: #fff;
			display: inline-block;
		}
		.t-ef3{
			width:128px;
			height:128px;
			text-align: center;
			background-color: #49c9c8;
			border-radius: 8px;
			line-height: 128px;
			font-size: 16px;
			color: #fff;
			display: inline-block;
		}
		.t-ef4{
			width:128px;
			height:128px;
			text-align: center;
			background-color: #ff6e5b;
			border-radius: 8px;
			line-height: 128px;
			font-size: 16px;
			color: #fff;
			display: inline-block;
		}
		.m2{
			margin-right: 1%;
		}
		.inputes{
			display: inline-block;
		}
		.head-ed{
			margin-top:20px;
		}
		.head-ed ul{padding: 0 0 15px 0;overflow: hidden;}
		.head-ed ul li{float: left;margin-right: 3%;margin-top: 15px;}
		.sp-df{margin: 0 10px 0 0;display: inline-block}
		.se-pl{margin: 0 10px 0 0;display: inline-block}
		.bvodry{
			margin-top:20px;
		}
		.t-se{
			font-size:16px;
			font-weight:bold;
			margin-top:20px;
		}
		.t-sf{
			margin-top:20px;
		}
		.blone{
			text-align: center;
			font-size:16px;
			font-weight:bold;
			margin-top:20px;
		}
	}
	.AgencyFee_but{float: right;margin-top: 15px;}
	.agentNav{width: 100%;padding-top: 10px;}
	.agentNav ul{overflow: hidden;padding: 0;}
	.agentNav ul li{float: left;width: 40%;font-size: 14px;color: #333;line-height: 30px;}
	.agentNav ul li p{color: #18c79c;display: inline-block;}
</style>