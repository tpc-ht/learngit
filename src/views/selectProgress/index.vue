<template>
	<div class="content">
		<div class="item1">
			<div>
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
				  <el-form-item label="用户ID">
				    <el-input v-model="formInline.userId" placeholder="请输入用户ID"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="onSubmit(),getConsumeData()">查询</el-button>
				  </el-form-item>
				</el-form>
			</div>
			<h3>代理条件进度</h3>
			<div class="itemList">
				<ul>
					<li>
						<div class="left">该用户当前代理级别：</div>
						<div class="right">{{progressData.agentType}}</div>
					</li>
					<li>
						<div class="left">本周超过10瓶的消费的直接下级人数：</div>
						<div class="right">{{progressData.consumeNum}}</div>
					</li>
					<li>
						<div class="left">本周自己是否消费10瓶：</div>
						<div class="right">{{progressData.ownConsume ? progressData.ownConsume? '已消费':'未消费':''}}</div>
					</li>
					<li>
						<div class="left">所有下级累计兑酒数：</div>
						<div class="right">{{progressData.wineNum}}</div>
					</li>
					<li>
						<div class="left">直接下级中区代人数：</div>
						<div class="right">{{progressData.quNum}}</div>
					</li>
					<li>
						<div class="left">直接下级中市代人数：</div>
						<div class="right">{{progressData.shiNum}}</div>
					</li>
					<li class="li-h3"><h3>消费分润条件进度</h3></li>
					<li>
						<div class="left">直接下级有确认收货订单的人数：</div>
						<div class="right">{{consumeData.length}}</div>
					</li>
					<li>
						<template>
						  <el-table
						    :data="consumeData"
						    style="width: 100%">
							<el-table-column
							      type="index"
							      width="50"
								  label="序号">
							  </el-table-column>
						    <el-table-column
						      prop="creator"
						      label="下级ID">
						    </el-table-column>
						    <el-table-column
						      prop="order_id"
						      label="下级确认收货的某笔订单ID">
						    </el-table-column>
						  </el-table>
						</template>
					</li>
				</ul>
			</div>
			
			 			
		</div>
		<div class="item2">
			<p>成为代理规则</p>
			区代<br/>
			<div>
				①超过5个直接下级每人当前自然周购买10瓶酒。<br/>
				②且自己要在当前自然周购买10瓶酒。<br/>
				③所有下级累计兑换1500瓶酒。<br/>
			</div>
			
			
			市代<br/>
			<div>
				①超过10个直接下级每人当前自然周购买10瓶酒。<br/>
				②且自己要在当前自然周购买10瓶酒。<br/>
				③所有下级累计兑换7000瓶酒。<br/>
				④且直接下级中至少有3个区代。<br/>
			</div>
			
			
			省代<br/>
			<div>
				①超过20个直接下级每人当前自然周购买10瓶酒。<br/>
				②且自己要在当前自然周购买10瓶酒。<br/>
				③所有下级累计兑换20000瓶酒。<br/>
				④且直接下级中至少有3个市代。<br/>
			</div>
			
			
			<p>获得当周代理提成规则</p>
			区代<br/>
			<div>
				①超过5个直接下级每人当前自然周购买10瓶酒。<br/>
				②且自己要在当前自然周购买10瓶酒。<br/>
			</div>
			市代<br/>
			<div>
				①超过10个直接下级每人当前自然周购买10瓶酒。<br/>
				②且自己要在当前自然周购买10瓶酒。<br/>
			</div>
			省代<br/>
			<div>
				①超过20个直接下级每人当前自然周购买10瓶酒。<br/>
				②且自己要在当前自然周购买10瓶酒。<br/>
			</div>
			
			
			<p>获得消费分润条件</p>
			<div>
				①至少10个直接下级在匀贸商城进行完整交易。<br/>
				②完整交易指确认收货成功。<br/>
				③从第10个直接下级确认收货的订单开始计算消费分润。<br/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
	      formInline: {
	        // userId: 96872,
	        userId: '',
	      },
		  progressData:{},
		  consumeData:[],
	    }
	  },
	  created() {
	  },
	  methods: {
	    onSubmit() {
		  // 96953
		  var formData = new FormData();
		  formData.append('userId',this.formInline.userId)
	      this.axios({
	      	method: "POST",
	      	url: this.$local.http+this.$api.queryAgentCondition,
	      	data:formData,
	      }).then(res=>{
	      	res = res.data;
	      	if(res.success){
				this.progressData = res.data;
				this.progressData.agentType = this.agencyRank(this.progressData.agentType);
	      	}else{
	      		this.$message(res.msg);
				this.progressData = {}
	      	}
	      }).catch(err=>{
	      	this.$message(err);
			this.progressData = {}
	      })
	    },
		//消费分润
		getConsumeData(){
			var formData = new FormData();
			formData.append('userId',this.formInline.userId)
			this.axios({
				method: "POST",
				url: this.$local.http+this.$api.queryBuyRoyaltyCondition,
				data:formData,
			}).then(res=>{
				res = res.data;
				if(res.success){
					this.consumeData = res.data;
					// console.log(res);
				}else{
					this.$message(res.msg);
							this.consumeData = {}
				}
			}).catch(err=>{
				this.$message(err);
						this.consumeData = {}
			})
		},//96872
		agencyRank(index){
			if(index==-1){
				return '用户不存在';
			}else if(index==0){
				return '普通会员';
			}else if(index==1){
				return '区代';
			}else if(index==2){
				return '市代';
			}else if(index==3){
				return '省代';
			}else{
				return '代理级别出错';
			}
		}
	  }
	}
</script>

<style lang="less" scoped>
	.content{
		width: 100%;
		overflow: hidden;
		.item1{
			float: left;
			width: 40%;
			min-width: 345px;
			.itemList{
				ul{
					margin: 0;
					padding: 0;
				}
				li{
					display: flex;
					margin: 12px 0;
				}
				.li-h3{
					margin-top:30px;
					margin-bottom: 20px;
				}
				.left{
					width: 243px;
				}
				.right{
					width: 150px;
				}
			}
				
		}
		.item2{
			float: left;
			width: 60%; 
			min-width: 376px;
			box-sizing: border-box;
			padding-left: 50px;
			p{
				color: red;
				font-size: 18px;
				margin: 10px 0;
			}
			div{
				line-height: 24px;
				padding-left: 20px;
			}
		}
	}
	.item1,.item2{
		// height: 800px;
	}
</style>
