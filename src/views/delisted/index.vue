<template>
	<div style="padding:20px;">
		<div class="head-ed">
			登记区域代理商
		</div>
		<div class="head-sd">
			<table class="sed-tab">
				<tr>
					<td class="td-o">
						姓名：
					</td>
					<td class="td-t">
						<el-input class="input-one" v-model="name" placeholder="填写姓名"></el-input>
					</td>
				</tr>
				<tr>
					<td class="td-o">
						身份证号：
					</td>
					<td class="td-t">
						<el-input class="input-one" v-model="idcard" placeholder="填身份证号"></el-input>
					</td>
				</tr>
				<tr>
					<td class="td-o">
						通讯地址：
					</td>
					<td class="td-t">
						<el-input class="input-one" v-model="adderss" placeholder="填写通讯地址"></el-input>

					</td>
				</tr>
				<tr>
					<td class="td-o">
						电话：
					</td>
					<td class="td-t">
						<el-input class="input-one" v-model="tel" placeholder="填写电话"></el-input>

					</td>
				</tr>
				<tr>
					<td class="td-o">
						业务代理：
					</td>
					<td class="td-t">
						<el-select class="input-one" v-model="yw" clearable placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="td-o">
						签约形式：
					</td>
					<td class="td-t">
						<el-select class="input-one" v-model="xs" clearable placeholder="请选择" @change="obtainValue">
							<el-option key="线上" label="线上" value="线上">线上</el-option>
							<el-option key="线下" label="线下" value="线下" v-if="yw==14">线下</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="td-o">
						代理区域：
					</td>
					<td class="td-t">
						<div style="margin-left:20px;margin-top:10px;" class="sedf">
							<div class="town">
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
					</td>
				</tr>
				<tr>
					<td class="td-o">
						代理级别：
					</td>
					<td class="td-t">
						<el-select class="input-one" v-model="qxvalue" clearable placeholder="请选择" v-show="hShow">
							<el-option v-for="item in qx" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<el-select class="input-one" v-model="qxvalue" clearable placeholder="请选择" v-show="fShow">
							<el-option v-for="item in xz" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td class="td-o">
						代理开始时间：
					</td>
					<td class="td-t">
						<div class="input-one-rt" style="margin-left:30px;">
							<div class="block">
								<el-date-picker v-model="Timer" type="date" placeholder="选择日期">
								</el-date-picker>
							</div>
						</div>
					</td>
				</tr>
				<tr v-if="yw==14">
					<td class="td-o">
						所需代理费用：
					</td>
					<td class="td-t">
						<el-input class="input-one" v-model="dl_pice" placeholder="填写金额"></el-input>
					</td>
				</tr>
				<tr v-if="yw==14">
					<td class="td-o">
						所需定金：
					</td>
					<td class="td-t">
						<el-input class="input-one" v-model="dj_pice" placeholder="填写金额"></el-input>
					</td>
				</tr>
				<tr v-if="yw==14">
					<td class="td-o">
						实际缴费：
					</td>
					<td class="td-t">
						<el-input class="input-one" v-model="sj_pice" placeholder="填写金额"></el-input>
					</td>
				</tr>
				<tr v-if="yw==19">
					<td class="td-o">
						收费模式：
					</td>
					<td class="td-t">
						<div class="radio_div">
							<el-radio-group v-model="radio" @change="change">
								<el-radio :label="1">活动期</el-radio>
								<el-radio :label="2">非活动期</el-radio>
							</el-radio-group>
						</div>
					</td>
				</tr>
				<tr v-if="yw==19">
					<td class="td-o"></td>
					<td class="td-t">
						<div class="tr_div" v-show="radioShow">
							<p v-if="qxvalue==3">县区级代理免收代理费，收取定金{{Money.countryMoney_active||0}}元</p>
							<p v-if="qxvalue==4">乡镇级代理免收代理费，收取定金{{Money.townMoney_active||0}}元</p>
							<p v-if="qxvalue==5">村社级收取代理费{{Money.villageMoney_active||0}}元</p>
							<p>付款方式&nbsp;&nbsp;&nbsp;&nbsp;
								<el-radio-group v-model="radioData">
									<el-radio :label="3">现金</el-radio>
									<el-radio :label="1">微信</el-radio>
									<el-radio :label="2">支付宝</el-radio>
									<el-radio :label="4">转账</el-radio>
									<el-radio :label="5">汇款</el-radio>
								</el-radio-group>
							</p>
							<p>双方在签此合同当日，乙方向甲方一次性付款
								<input v-model="proxy_pice" placeholder="填写金额"/> 元
							</p>
							<p v-if="qxvalue==3">欠余款    ￥{{parseFloat(Money.countryMoney_active-proxy_pice).toFixed(2)||0}}</p>
							<p v-if="qxvalue==4">欠余款    ￥{{parseFloat(Money.townMoney_active-proxy_pice).toFixed(2)||0}}</p>
							<p v-if="qxvalue==5">欠余款    ￥{{parseFloat(Money.villageMoney_active-proxy_pice).toFixed(2)||0}}</p>
						</div>
						<div class="tr_div" v-show="radioShowOne">
							<p v-if="qxvalue==3">您选择的是【县区级代理】，需缴纳代理费￥{{Money.countryMoney}}</p>
							<p v-if="qxvalue==4">您选择的是【乡镇级代理】，需缴纳代理费￥{{Money.townMoney}}</p>
							<p v-if="qxvalue==5">您选择的是【村社级代理】，需缴纳代理费￥{{Money.villageMoney}}</p>
							<p>付款方式&nbsp;&nbsp;&nbsp;&nbsp;
								<el-radio-group v-model="radioData">
									<el-radio :label="3">现金</el-radio>
									<el-radio :label="1">微信</el-radio>
									<el-radio :label="2">支付宝</el-radio>
									<el-radio :label="4">转账</el-radio>
									<el-radio :label="5">汇款</el-radio>
								</el-radio-group>
							</p>
							<p>双方在签此合同当日，乙方向甲方一次性付款
								<input v-model="proxy_pice" placeholder="填写金额"/> 元
							</p>
							<p v-if="qxvalue==3">欠余款    ￥{{parseFloat(Money.countryMoney-proxy_pice).toFixed(2)||0}}</p>
							<p v-if="qxvalue==4">欠余款    ￥{{parseFloat(Money.townMoney-proxy_pice).toFixed(2)||0}}</p>
							<p v-if="qxvalue==5">欠余款    ￥{{parseFloat(Money.villageMoney-proxy_pice).toFixed(2)||0}}</p>
						</div>
					</td>
				</tr>
				<tr v-if="yw==14">
					<td colspan="2" class="td-h-t">
						<button class="bton" @click="bton">提交</button>
					</td>
				</tr>
				<tr v-if="yw==19">
					<td colspan="2" class="td-h-t">
						<button class="bton" @click="submit()">提交</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
	import adderss from '@/api/adderss'
	import qs from 'qs'
	export default {
		data() {
			return {
				hShow:true,
				fShow: false,
				options: '',
				xslist: [{
					value: '线上',
					label: '线上'
				}, {
					value: '线下',
					label: '线下'
				}],
				qx: [{
					value: '3',
					label: '县级'
				}, {
					value: '4',
					label: '乡镇级'
				}, {
					value: '5',
					label: '村社级'
				}],
				xz: [{
					value: '1',
					label: '省级'
				}, {
					value: '2',
					label: '区县级'
				}],
				name: '',
				idcard: '',
				adderss: '',
				tel: '',
				yw: '',
				xs: '',
				qxvalue: '',
				Timer: '',
				dl_pice: '',
				dj_pice: '',
				sj_pice: '',
				proxy_pice:'',
				proxy_money:'',
				selected: adderss,
				adderedOne: '',
				adderedTwo: '',
				adderedThree: '',
				adderssM: [],
				adderssN: [],
				adestd: [],
				m1:'',
				m2:'',
				m3:'',
				radio: 1,
				radioData:1,
				radioShow:true,
				radioShowOne:false,
				init:[],
				Money:{},
				activeType:'',

			}
		},
		created() {

		},
		mounted() {
			this.getYw();
            // this.initAgentFeeSet();
		},
		beforeDestroy() {

		},
		methods: {
			change(){
				if(this.radio==1){
					this.radioShow=true;
					this.radioShowOne =false;
					this.getSumLandMoney();
				}else if(this.radio==2) {
					this.radioShow=false;
					this.radioShowOne = true;
					this.getSumLandMoney();
				}
			},
			//提交农家餐饮
			bton() {
				var agentCreateTime;
			    if(this.Timer==''){
					 agentCreateTime='';
				}else{
					agentCreateTime = this.Timer.getTime(); //当前时间转换成long型 
				}
				var h1='',h2='';
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
				var user=sessionStorage.getItem('user');
				var userId=JSON.parse(user) ;
				let this_ = this;
				const formDatas=new FormData()
				formDatas.append('userId',userId.id);//省
				formDatas.append('typeid',this.yw);//省
				formDatas.append('province',this.province);//省
				formDatas.append('city',this.city);//省
				formDatas.append('country',this.country);//省
				formDatas.append('town',h1);//省
				formDatas.append('village',h2);//省
				formDatas.append('level',this.qxvalue);
				formDatas.append('realName',this.name);
				formDatas.append('phone',this.tel);//省
				formDatas.append('idCardNumber',this.idcard);//省
				formDatas.append('cardAddress',this.adderss);//省
				formDatas.append('proxyMoney',this.dl_pice);//省
				formDatas.append('earnestMoney',this.dj_pice);//省
				formDatas.append('proxyPayed',this.sj_pice);//省
				formDatas.append('signType',this.xs);
				formDatas.append('agentCreateTime',agentCreateTime);
				if(formDatas.province==undefined){
					formDatas.province='';
				}
				if(this.city==undefined){
					formDatas.city='';
				}
				if(this.country==undefined){
					formDatas.country='';
				}
				
				console.log(formDatas);
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.addProxtyInfo,
					data:formDatas,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					console.log(res)
					if(res.success==true){
					   this.$message({
					       message:res.msg,
					       type: 'success'
					     })
						
						 this.$router.push({
						 	path: '/Agent'
						 })
					}else{
						 this.$message({
						    message: res.msg,
						    type: 'warning'
						  });
					}
					
				})				
			},
			//土地租赁
			submit(){
				var agentCreateTime;
				if(this.Timer==''){
					agentCreateTime='';
				}else{
					agentCreateTime = this.Timer.getTime(); //当前时间转换成long型
				}
				var h1='',h2='';
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

                if(this.qxvalue==3&&this.radio==1){
                	this.proxy_money=this.Money.countryMoney_active
				}else if(this.qxvalue==4&&this.radio==1){
					this.proxy_money=this.Money.townMoney_active
				}else if(this.qxvalue==5&&this.radio==1){
					this.proxy_money=this.Money.villageMoney_active
				}else  if(this.qxvalue==3&&this.radio==2){
					this.proxy_money=this.Money.countryMoney
				}else if(this.qxvalue==4&&this.radio==2){
					this.proxy_money=this.Money.townMoney
				}else if(this.qxvalue==5&&this.radio==2){
					this.proxy_money=this.Money.villageMoney
				}
				var user=sessionStorage.getItem('user');
				var userId=JSON.parse(user) ;
				let this_ = this;
				const formDatas=new FormData()
				formDatas.append('userId',userId.id);//省
				formDatas.append('typeid',this.yw);//省
				formDatas.append('province',this.province);//省
				formDatas.append('city',this.city);//省
				formDatas.append('country',this.country);//省
				formDatas.append('town',h1);//省
				formDatas.append('village',h2);//省
				formDatas.append('level',this.qxvalue);
				formDatas.append('realName',this.name);
				formDatas.append('phone',this.tel);//省
				formDatas.append('idCardNumber',this.idcard);//身份证号码
				formDatas.append('cardAddress',this.adderss);//家庭地址(请拼接后在传)
				formDatas.append('proxyMoney',this.proxy_money);//代理费用
				formDatas.append('earnestMoney','0');//定金
				formDatas.append('proxyPayed',this.proxy_pice);//实际缴纳费用
				formDatas.append('payMethod',this.radioData);//支付方式：0.未支付1.微信2.支付宝3.现金4.转账5.汇款
				formDatas.append('signType',this.xs);//签约形式:线上/线下
				formDatas.append('agentCreateTime',agentCreateTime);//代理商申请时间
				formDatas.append('activeType',this.radio);//代理商申请时间

				if(formDatas.province==undefined){
					formDatas.province='';
				}
				if(this.city==undefined){
					formDatas.city='';
				}
				if(this.country==undefined){
					formDatas.country='';
				}

				console.log(formDatas);
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.addLandProxtyInfo,
					data:formDatas,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					console.log(res)
					if(res.success==true){
						this.$message({
							message:res.msg,
							type: 'success'
						})

						this.$router.push({
							path: '/Agent'
						})
					}else{
						this.$message({
							message: res.msg,
							type: 'warning'
						});
					}

				})
			},
			obtainValue(value) { //线上 线下判断
				if (value == '线上') {
					this.hShow = true;
					this.fShow = false;
				} else {
					this.fShow = true;
					this.hShow = false;
				}
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
					let obj = {}
					if (res.success) {
						for (let v of arr) {
							obj = {
								value: v.id,
								label: v.typeName
							}
							arrey.push(obj);
						}
						this.options = arrey;
					}
				})
			},
			dlPrice(){
				let data = {
					province: this.m1,
					city: this.m2,
					country: this.m3,
					town: this.adderedTwo,
					village: this.adderedThree,
					level: this.qxvalue,
					agentType:1,
					// activeType:0,
				}
				console.log(data)
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.sumMoney,
					data: qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					if(res.success==true){
					   this.$message({
					       message:res.msg,
					       type: 'success'
					     })
						 this.dl_pice = res.data.proxy_money;
						 this.dj_pice = res.data.earnest_money;
					}else{
						 this.$message({
						    message: res.msg,
						    type: 'warning'
						  });
					}
				})
			},
			// initAgentFeeSet(){
			// 	const formDatas=new FormData()
			// 	this.axios({
			// 		method: "POST",
			// 		url: this.$local.http+this.$api.initLandAgentFeeSet,
			// 		data:formDatas,
			// 		headers: {
			// 			'Content-Type': 'application/x-www-form-urlencoded'
			// 		}
			// 	}).then(res=>{
			// 		if (res.data.success) {
			// 			this.init=res.data.data
			// 		}
			// 	}).catch(res=>{
			// 		this.$message({
			// 			message:res.data.msg,
			// 			type: 'error'
			// 		})
			// 	})
			// },
			getSumLandMoney(){
				if(this.radio==1){
					this.activeType=1
				}else if(this.radio==2){
					this.activeType=2
				}
				let data = {
					province: this.m1,
					city: this.m2,
					country: this.m3,
					town: this.adderedTwo,
					village: this.adderedThree,
					level: this.qxvalue,
					agentType:2,
					// activeType:this.activeType,
				}
				this.axios({
					method: "POST",
					url: this.$local.http+this.$api.sumMoney,
					data:qs.stringify(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res=>{
					if (res.data.success) {
						this.Money=res.data.data
						console.log(res.data.data)
					}
				}).catch(res=>{
					this.$message({
						message:res.data.msg,
						type: 'error'
					})
				})
			},
		},
		watch: { //监听地址
			adderedOne: function(val, old) {
				this.adderedTwo ='';
				var arr = val;
				this.m1=arr[0];
				this.m2=arr[1];
				this.m3=arr[2];
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
					let data = {
						code: arr[2]
					};
					console.log(data);
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
						if(res.success==true){
						   this.$message({
						       message:res.msg,
						       type: 'success'
						     })
							this.adderssM = res.data;
						}else{
							 this.$message({
							    message: res.msg,
							    type: 'warning'
							  });
						}
						
					})
				} else {
					console.log('位数不够！');
				}

			},
			adderedTwo: function(Val, old) {
				this.adderedThree ='';
				let val = Val;
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
					if(res.success==true){
					   this.$message({
					       message:res.msg,
					       type: 'success'
					     })
						 this.adderssN = res.data;
					}else{
						 this.$message({
						    message: res.msg,
						    type: 'warning'
						  });
					}
					
					
				})
			},
			qxvalue: function() { //请求代理费
				if(this.m3!=''&& this.adderedThree!=''){
					if(this.yw==14){
						this.dlPrice();
					}else if(this.yw==19){
						this.getSumLandMoney();
					}
				}
			},
			adderedThree:function() { //请求代理费
				if(this.qxvalue!=''){
					if(this.yw==14){
						this.dlPrice();
					}else if(this.yw==19){
						this.getSumLandMoney();
					}
				}

			},
		}
	}
</script>

<style scoped lang="scss">
	.town {
		display: inline-block;
		margin-left: 10px;
	}

	.sedf>div {
		float: left;
	}

	.area-select.large {
		width: 100%;
		line-height: 20px;
	}

	.sed-tab {
		margin: 0 auto;
		margin-top: 60px;

		td {
			height: 40px;
		}

		.td-o {
			text-align: right;
		}
	}

	.losed {
		margin-left: 20px;
	}
     .radio_div{
		 width: 300px;
		 height: 28px;
		 margin-left: 20px;
		 padding-left: 10px;
	     margin-top: 15px}
	.input-one {
		width: 300px;
		height: 28px;
		margin-left: 20px;
		padding-left: 10px;
	}

	.input-one-rt {
		margin-top: 10px;
		margin-left: 30px;
	}

	input::placeholder {
		font-size: 12px;
	}

	.td-h-t {
		text-align: center;
	}

	.bton {
		width: 60px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background: #49a714;
		color: #fff;
		outline: none;
		border: 0;
		cursor: pointer;
		border-radius: 5px;
	}
	.tr_div{padding: 10px;margin-left: 20px;}
	.tr_div p{line-height: 26px;}
	.tr_div p input{
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-color: #fff;
		background-image: none;
		border-radius: 4px;
		border: 1px solid rgb(191, 217, 214);
		box-sizing: border-box;
		color: rgb(31, 61, 57);
		font-size: inherit;
		height: 36px;
		line-height: 1;
		outline: 0;
		padding: 3px 10px;
		transition: border-color .2s cubic-bezier(.645,.045,.355,1);
		width: 12%;
		display: inline-block;
	}
</style>
