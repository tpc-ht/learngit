<!-- 订单明细 -->	
<template>
    <div class="app-container">
		<div>
			<el-row :gutter="20">
				<el-col :span="8" >
				  <div class="grid-content bg-purple">用户ID：{{ userData.user_id }}</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">真实姓名：{{ userData.real_name }}</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">联系方式：{{ userData.phone }}</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="8" >
				  <div class="grid-content bg-purple">银行卡号：{{ userData.bank_card }}</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">开户行：{{ userData.open_branch_bank }}</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">结款金额：{{ userData.royaltyPrice }}</div>
				</el-col>
			</el-row>
		</div>
		<!--财务结账 -->
        <div class="head-ed">
            <ul>
				<li>
				    <span class="se-pl">买卖人姓名</span>
				    <div class="inputes">
				        <el-input placeholder="请输入" v-model="contact" clearable style="width:185px;"></el-input>
				    </div>
				</li>
				<li>
				    <span class="se-pl">商品名称</span>
				    <div class="inputes">
				        <el-input v-model="name" placeholder="请输入" style="width:185px;"></el-input>
				    </div>
				</li>
				<li>
				    <div class="block">
				        <span class="se-pl" style="margin-right:10px;">后台生成提成记录时间</span>
				        <el-date-picker
				                v-model="timer"
				                value-format="timestamp"
				                type="daterange"
				                placeholder="请选择"
				                range-separator="至"
				                start-placeholder="开始日期"
				                end-placeholder="结束日期"
				        ></el-date-picker>
				    </div>
				</li>
				<li>
					<div class="block">
					    <span class="se-pl" style="margin-right:10px;">结款时间</span>
					    <el-date-picker
					            v-model="clearingTimer"
					            value-format="timestamp"
					            type="daterange"
					            placeholder="请选择"
					            range-separator="至"
					            start-placeholder="开始日期"
					            end-placeholder="结束日期"
					    ></el-date-picker>
					</div>
				</li>
				<li>
				    <el-row class="inputes">
				        <el-button @click="getList()">查询</el-button>
				    </el-row>
				</li>
				<li>
				    <el-row class="inputes">
				        <el-button @click="reset()">重置</el-button>
				    </el-row>
				</li>
                <li>
                    <el-row class="inputes">
                        <el-button @click='export2Excel()' type='primary'>导出Excel表</el-button>
                    </el-row>
                </li>
            </ul>
        </div>
        <h6 class="h6">详细列表<span v-if="total>0">:共{{total}}条记录，{{initData.pages}}页。当前为第{{form.page}}页</span></h6>
        <el-table 
		:data="initData.list" 
		border fit highlight-current-row 
		v-loading="this.$store.getters.getLoadingBool"
		element-loading-text="拼命加载中"
		style="width: 100%">
			</el-table-column>
			<el-table-column  align="center" label="订单号" min-width="115px">
			    <template slot-scope="scope">
			        <span>{{scope.row.order_id}}</span>
			    </template>
			</el-table-column>
			<el-table-column  align="center" label="商品名称">
			    <template slot-scope="scope">
			        <span>{{scope.row.co_name}}</span>
			    </template>
			</el-table-column>
			<el-table-column  align="center" label="后台生成提成记录时间" min-width="150px">
			    <template slot-scope="scope">
			        <span>{{scope.row.ti}}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="买卖人姓名"  min-width="100px">
			    <template slot-scope="scope">
			        <span>{{ scope.row.username }}</span>
			    </template>
			</el-table-column> 
			<el-table-column align="center" label="买卖人ID">
			    <template slot-scope="scope">
			        <span>{{ scope.row.order_user_id }}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="购买数量">
			    <template slot-scope="scope">
			        <span>{{ scope.row.qty }}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="结款时间" min-width="150px">
			    <template slot-scope="scope">
			        <span>{{scope.row.payment_time}}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="买卖总额">
			    <template slot-scope="scope">
			        <span>{{ scope.row.order_price }}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="买卖方向">
			    <template slot-scope="scope">
			        <span>{{ scope.row.ty}}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="提成">
			    <template slot-scope="scope">
			        <span>{{ scope.row.royalty_price}}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="是否结款">
			    <template slot-scope="scope">
			        <span>{{ scope.row.payment_state}}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="财务结款人id" min-width="100px">
			    <template slot-scope="scope">
			        <span>{{ scope.row.recorder_id}}</span>
			    </template>
			</el-table-column>
			<el-table-column align="center" label="来源">
			    <template slot-scope="scope">
			        <span>{{ scope.row.order_type}}</span>
			    </template>
			</el-table-column>
        </el-table>
		<div style="margin-top: 20px">
		    <el-button @click="retreat()">返回</el-button>
		</div>
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    export default {
        components: { Pagination },
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    page: 1,
                    limit: 10
                },
                name: '',//商品名称
                contact: '',//姓名
                agentCreateTime:'',//交易开始时间
                endtime:'',//交易结束时间
				clearingStartTime:'',//结款开始时间
				clearingEndTime:'',//结款结束时间
				id:'',
                order_id:'',
                orderId:'',
                timer: [],
				clearingTimer:[],
                initData:[],
                total:'',
                formData:{
                    pay_money:'',
                    pay_method:'',
                    couponsNumber:'',
                },
                tableList:[],
				userData:{},//用户信息
				
            }
        },
        mounted() {
			//初始化，父级的时间范围
			this.userData = this.$route.query;
			this.agentCreateTime = this.$route.query.agentCreateTime || '';
			this.endtime = this.$route.query.endtime || '';
			if(this.agentCreateTime && this.endtime ){
				this.timer= [new Date(Number(this.agentCreateTime)),new Date(Number(this.endtime)-Number(86399999))]
			}
			this.getList();
		},
        methods: {
			getList(){
				this.$store.commit('setLoadingBool',true);
			    this.timeInit();
				var params={
					paymentUserId:this.$route.query.user_id,
					buyerName:this.contact,//买卖人姓名
					productName:this.name,//商品名称
					pageNum: this.form.page,
					pageSize:this.form.limit,
					startTime: this.agentCreateTime,
					endTime:this.endtime,
					paymentState:'1',
					//结款
					paymentStartTime: this.clearingStartTime,
					paymentEndTime : this.clearingEndTime,
				}
			    this.axios({
			        method: "post",
			        url: this.$local.http+this.$api.agentOrderList,
			        params: params,
			    }).then(res=>{
					this.$store.commit('setLoadingBool',false);
			        if (res.data.success) {
			            this.initData=res.data.data;
			            this.total=this.initData.total;
						this.getData();
			        }else {
			            this.$message({message:res.data.msg, type: 'error'});
			            this.initData=[]
			        }
			    }).catch(res=>{
			        this.$message({message:res.data.msg, type: 'error'});
			        this.initData=[]
			    })
			},
			async getData() { //初始化 
			    this.timeInit();
				var params={
					paymentUserId:this.$route.query.user_id,
					buyerName:this.contact,//买卖人姓名
					productName:this.name,//商品名称
					pageNum: this.form.page,
					pageSize:this.total,
					startTime: this.agentCreateTime,
					endTime:this.endtime,
					paymentState:'1',
					//结款
					paymentStartTime: this.clearingStartTime,
					paymentEndTime : this.clearingEndTime,
				};
				let res = await this.axios({
				    method: "post",
				    url: this.$local.http + this.$api.agentOrderList,
				    params: params,
				})
				if(res.data.success){
					this.tableList=res.data.data.list; 
				}else {
					this.tableList=[]
					this.$toast(res.data.msg);
				} 
			},
			//时间戳初始化
			timeInit(){
				let Time1 = this.timer === undefined ? [null,null]:this.timer; 
				let Time2 = this.clearingTimer;
				this.agentCreateTime = new Date(Time1[0]).getTime(); //当前时间转换成long型
				this.endtime = new Date(Time1[1]).getTime()+Number(86399999); //当前时间转换成long型
				this.clearingStartTime = new Date(Time2[0]).getTime(); //当前时间转换成long型
				this.clearingEndTime = new Date(Time2[1]).getTime()+Number(86399999); //当前时间转换成long型
				if (Time1[0] == null) {
				    this.agentCreateTime ='';
				    this.endtime ='';
				}
				if (Time2[0] == null) {
					this.clearingEndTime = '';
					this.clearingStartTime = '';
				}
				
			},
            //导出ex数据
            export2Excel() {
                this.$confirm('确定要导出表格数据么？?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
					require.ensure([], () => {
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['订单号','商品名称','后台生成提成记录时间','买卖人姓名','买卖人ID','购买数量','结款时间','买卖总额','买卖方向','提成','是否结款','财务结款人id','来源'];	
					    const filterVal = ['order_id','co_name','ti','username','order_user_id','qty','payment_time','order_price','ty','royalty_price','payment_state','recorder_id','order_type'];
					    const list = this.tableList;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data,'结款记录明细');
					});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消导出'
                    });
                });
            },
			formatJson(filterVal, jsonData) {
			    return jsonData.map(v => filterVal.map(j => v[j]))
			},
			//返回
			retreat(){
				this.$router.push({path:'/RecordEndMoney',query:{
					agentCreateTime:this.$route.query.agentCreateTime,
					endtime:this.$route.query.endtime
				}});
			},
			//重置
			reset(){
				this.contact = this.name = '';
				this.timer = this.clearingTimer = [null,null];
				this.getList();
			}
        }, 
    }
</script>

<style scoped>
    .app-container{width: 100%;background-color: #fff;padding: 20px;}
    .inputes {display: inline-block !important;}
    .se-pl {margin-right: 10px;}
    .head-ed {margin-top: 10px;}
    .head-ed ul{overflow: hidden;padding: 0;}
    .head-ed ul li{float: left;margin: 15px 2% 0 0;}
    .el-select {width: 185px !important;}
    /deep/.el-dialog__footer{padding-bottom:30px!important;}
    /deep/.cell{padding: 0 5px!important;}
    .time{width:65%;float: left; }
    /deep/.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {width: 100%;padding: 3px 0;}
    .h6{padding: 10px 5px;font-size: 16px;}
    .el-dropdown-link {cursor: pointer;color: #409EFF;}
    .el-icon-arrow-down {font-size: 12px;}
    .demonstration {display: block;color: #8492a6;font-size: 14px;margin-bottom: 20px;}
    .daili{line-height: 34px;text-align: center;}
    .el-dropdown-link{color: #42b983;outline: none;}
    .p_foot{overflow: hidden;padding-top: 20px;}
    .p_one{float: left;font-size: 16px;font-weight: 600;line-height: 30px;}
    .p_div{float: left;padding-left: 20px;}
    .p_two {line-height: 30px;font-size: 16px;font-weight: 200;height: 30px;}

	.el-row {
	   margin-bottom: 20px;
	   &:last-child {
	     margin-bottom: 0;
	   }
	 }
	 .el-col {
	   border-radius: 4px;
	 }
	 .grid-content {
	   border-radius: 4px;
	   min-height: 36px;
	 }
	 .row-bg {
	   padding: 10px 0;
	 }
</style>

