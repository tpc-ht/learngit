<template>
	<div style="padding:20px;">
		<div class="head-ed">
			<span class="touled">基本信息</span>
			<el-button class="goted" @click="goBack()">返回</el-button>
		</div>
		<div class="head-ed">
			<el-table :data="tableData.list" border style="width: 100%">
				<el-table-column prop="serial_number" label="订单编号">
				</el-table-column>
				<el-table-column prop="payment_state" label="订单状态">
					<template slot-scope="scope">
						<span v-if="scope.row.payment_state==1">支付成功</span>
						<span v-if="scope.row.payment_state==2">待支付</span>
						<span v-else-if="scope.row.payment_state==102">申请售后</span>
						<span v-else-if="scope.row.payment_state==0">支付失败</span>
					</template>
				</el-table-column>
				<el-table-column prop="product_name" label="商品名称">
				</el-table-column>
				<el-table-column prop="consigneeName" label="收件人姓名">
				</el-table-column>
				<el-table-column prop="consigneePhone" label="收件人电话">
				</el-table-column>
				<el-table-column prop="name" label="店铺名称">
				</el-table-column>
				<el-table-column prop="image_url" label="店铺主图片">
					<template slot-scope="scope">
						<span v-if="scope.row.image_url==''">无图片</span>
						<img class="picet" :src="scope.row.image_url" v-else-if="image_url!=''"/>
					</template>
				</el-table-column>
				<el-table-column prop="sumresult" label="现金总价">
				</el-table-column>
				<el-table-column prop="post_fee" label="邮费">
				</el-table-column>
			</el-table>
		</div>
		<div class="head-ed">
			<span class="touled">商品信息</span>
		</div>
		<div class="head-ed">
			<el-table :data="tableData.list" border style="width: 100%">
				<el-table-column prop="product_name" label="商品名称">
				</el-table-column>
				<el-table-column prop="comment_num" label="评论数量">
				</el-table-column>
				<el-table-column prop="quantity" label="数量">
				</el-table-column>
				<el-table-column prop="create_time" label="创建时间">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				tableData: '',
				id: ''
			}
		},
		created() {
			this.id = this.$route.query.btid;
		},
		mounted() {
             this.getList();
		},
		methods: {
			getList() { //初始化
				let this_ = this;
				const formDatas = new FormData()
				formDatas.append('serialNumber', this_.id);
				this.axios({
					method: "post",
					url: this.$local.http + this.$api.successOrderInfoOne,
					data: formDatas,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(data => {
					let res = data.data;
					// console.log(res)
					if (res.success == true) {
						this.tableData = res.data;
					} else {
						this.$message({
							message: res.msg,
							type: 'warning'
						});
					}
				})
			},
			goBack() { //返回
				this.$router.push({
					path: '/transaction'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.head-ed {
		margin-top: 20px;
	}
    .goted{
		margin-left:10%;
	}
	.touled {
		font-size: 18px;
		font-weight: bold;
	}
	.picet{
		width:100px;
		padding:10px;
	}
</style>
