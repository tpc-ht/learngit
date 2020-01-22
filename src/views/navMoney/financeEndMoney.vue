<template>
    <div class="app-container">
		<!--财务结账 -->
        <div class="head-ed">
            <ul>
				<li>
				    <span class="se-pl">用户ID</span>
				    <div class="inputes">
				        <el-input placeholder="请输入" v-model="contact" clearable style="width:185px;"></el-input>
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
                        <el-button @click='export2Excel()' type='primary'>导出Excel表-代理资料</el-button>
                    </el-row>
                </li>
				<li>
				    <el-row class="inputes">
				        <el-button @click='export2ExcelDetail()' type='primary'>导出Excel表-明细集合</el-button>
				    </el-row>
				</li>
            </ul>
        </div>
        <h6 class="h6" v-if="total>0">共{{total}}条记录，{{initData.pages}}页。当前为第{{form.page}}页</h6>
        <el-table 
		:data="initData.list" 
		border fit highlight-current-row 
		v-loading="this.$store.getters.getLoadingBool"
		element-loading-text="拼命加载中..."
		style="width: 100%">
		<!-- v-loading="true" -->
		<!-- v-loading="this.$store.getters.getLoadingBool" -->
            <el-table-column  align="center" label="用户ID">
                <template slot-scope="scope">
                    <span>{{scope.row.user_id}}</span>
                </template>
            </el-table-column>
            <el-table-column  align="center" label="真实姓名">
                <template slot-scope="scope">
                    <span>{{scope.row.real_name}}</span>
                </template>
            </el-table-column>
            <el-table-column  align="center" label="联系方式">
                <template slot-scope="scope">
                    <span>{{scope.row.phone}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="代理级别" >
                <template slot-scope="scope">
                    <span>{{ $filterUtl.resellerLevel(scope.row.agent) }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="和平村账号" width="140px">
                <template slot-scope="scope">
                    <span>{{ scope.row.royaltyAmount }}</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="文交所账号">
                <template slot-scope="scope">
                    <span>{{ scope.row.ti }}</span>
                </template>
            </el-table-column> -->
            <el-table-column min-width="100px" align="center" label="银行卡号">
                <template slot-scope="scope">
                    <span>{{ scope.row.bank_card }}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="180px" align="center" label="开户行">
                <template slot-scope="scope">
                    <span>{{ scope.row.open_branch_bank }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="买卖金额">
                <template slot-scope="scope">
                    <span>{{ scope.row.orderPrice }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="代理总提成">
                <template slot-scope="scope">
                    <span>{{ scope.row.royaltyPrice}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="是否签约">
                <template slot-scope="scope">
                    <span>{{ scope.row.agent_state}}</span>
                </template>
            </el-table-column>
			<el-table-column align="center" label="筛选时间范围" min-width="100px">
                <template slot-scope="scope">
                    <span>{{ scope.row.conditionTime}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="操作">
    			<template slot-scope="scope">
				    <el-button type="success" size="small" @click="dialogFormShow(scope.row)">明细</el-button>
				</template>
            </el-table-column>
        </el-table>
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination';
    export default {
        components: { Pagination },
        data() {
            return {
                form: {
                    page: 1,
                    limit: 10
                },
                // name: '',
                contact: '',
                money:'',
                agentCreateTime:'',
                endtime:'',
                id:'',
                timer: [],//时间
                initData:[],//当前页列表数据
                total:'',//总条数
                tableList:[],//全部数据
                tableListDetail:[],//全部明细数据
            }
        },
        mounted() {
			// pushState()
			//详细页，返回的时间戳装换为时间
			this.agentCreateTime = this.$route.query.agentCreateTime || '';
            this.endtime = this.$route.query.endtime || '';
			if(this.agentCreateTime && this.endtime){
				this.timer= [new Date(Number(this.agentCreateTime)),new Date(Number(this.endtime)-Number(86399999))]
			}
			this.getList();
		},
        methods: {
			dialogFormShow(row){
			    this.id=row.id;
				//因为后退的情况下，在重新设置时间范围，会出现 undefined 等情况
				let Time = this.timer === undefined ? [null,null]:this.timer;
				let Start = new Date(Time[0]);
				let End = new Date(Time[1]);
				this.agentCreateTime = Start.getTime(); //当前时间转换成long型
				this.endtime = End.getTime()+Number(86399999); //当前时间转换成long型
				if (Time[0] == null) {
				    this.agentCreateTime ='';
				    this.endtime ='';
				}
				var query = {
					user_id:row.user_id,
					real_name:row.real_name,
					phone:row.phone,
					agent:row.agent,
					bank_card:row.bank_card,
					open_branch_bank:row.open_branch_bank,
					orderPrice:row.orderPrice,
					royaltyPrice:row.royaltyPrice,
					agent_state:row.agent_state,
					agentCreateTime:this.agentCreateTime,
					endtime:this.endtime
				}
				// this.$router.push({path:'/orderDetail',query:query});
				this.$router.push({path:'/financeEndMoney/orderDetail',query:query});
			},
            getList(){
				this.$store.commit('setLoadingBool',true);
				let Time = this.timer === undefined ? [null,null]:this.timer;
				let Start = new Date(Time[0]);
				let End = new Date(Time[1]);
				this.agentCreateTime = Start.getTime(); //当前时间转换成long型
				this.endtime = End.getTime()+Number(86399999); //当前时间转换成long型
				if (Time[0] == null) {
				    this.agentCreateTime ='';
				    this.endtime ='';
				}
				var params={
					paymentUserId:this.contact,
					pageNum: this.form.page,
					pageSize:this.form.limit,
					startTime: this.agentCreateTime,
					endTime:this.endtime
				}
				this.axios({
				    method: "post",
				    url: this.$local.http+this.$api.paymentUserList,
				    params: params,
				}).then(res=>{
					this.$store.commit('setLoadingBool',false);
				    if (res.data.success) {
						this.initData=res.data.data;
						this.total=this.initData.total;
						this.getData();
						this.getAllDetail();
				    }else {
				        this.$message({message:res.data.msg, type: 'error'});
				        this.initData=[]
				    }
				}).catch(res=>{
				    this.$message({message:res.data.msg, type: 'error'});
				    this.initData=[]
				})
				
            }, 
			async getData() {//初始化
				// const loading = this.$loading({lock: true,text: '拼命加载中...',});
				//时间初始化
				let Time = this.timer === undefined ? [null,null]:this.timer;
				let Start = new Date(Time[0]);
				let End = new Date(Time[1]);
				this.agentCreateTime = Start.getTime(); //当前时间转换成long型
				this.endtime = End.getTime()+Number(86399999); //当前时间转换成long型
				if (Time[0] == null) {
					this.agentCreateTime ='';
					this.endtime ='';
				}
				var params={
					paymentUserId:this.contact,
					pageNum: this.form.page,
					pageSize:this.total,
					startTime: this.agentCreateTime,
					endTime:this.endtime
				};
				let res = await this.axios({
					method: "post",
					url: this.$local.http + this.$api.paymentUserList,
					params: params,
				})
				if(res.data.success){
					this.tableList=res.data.data.list;
				}else {
					this.tableList=[]
					this.$toast(res.data.msg);
				} 
			},
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            export2Excel() {
                this.$confirm('确定要导出表格数据么？?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
					require.ensure([], () => {
							for (var i in this.tableList) {
								this.tableList[i].agent = this.$filterUtl.resellerLevel(this.tableList[i].agent);
							}
							const { export_json_to_excel } = require('../../vendor/Export2Excel');
							const tHeader = ['用户ID','真实姓名','联系方式','代理级别','银行卡号','开户行','买卖金额','代理总提成','是否签约','筛选范围时间'];
							const filterVal = ['user_id','real_name','phone','agent','bank_card','open_branch_bank','orderPrice','royaltyPrice','agent_state','conditionTime'];
							const list = this.tableList;
							const data = this.formatJson(filterVal, list);
							export_json_to_excel(tHeader, data,'财务结款-代理资料');
						});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消导出'
                    });
                });
            },
			export2ExcelDetail() {
			    this.$confirm('确定要导出表格数据么？?', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
			    }).then(() => {
					require.ensure([], () => {
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['订单号','商品名称','后台生成提成记录时间','买卖人姓名','买卖人ID','上级ID','购买数量','买卖总额','买卖方向','提成','是否结款','来源'];
					    const filterVal = ['order_id','co_name','ti','username','order_user_id','user_id','qty','order_price','ty','royalty_price','payment_state','order_type'];
					    const list = this.tableListDetail;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data,'财务结款明细集合');
					});
			    }).catch(() => {
			        this.$message({
			            type: 'info',
			            message: '已取消导出'
			        });
			    });
			},
			//获得所有代理明细
			async getAllDetail(){
				// const loading = this.$loading({lock: true,text: '拼命加载中...',});
				//时间初始化
				let Time = this.timer === undefined ? [null,null]:this.timer;
				let Start = new Date(Time[0]);
				let End = new Date(Time[1]);
				this.agentCreateTime = Start.getTime(); //当前时间转换成long型
				this.endtime = End.getTime()+Number(86399999); //当前时间转换成long型
				if (Time[0] == null) {
					this.agentCreateTime ='';
					this.endtime ='';
				}
				var params={
					paymentUserId:this.contact,
					pageNum: this.form.page,
					pageSize:900000000,
					startTime: this.agentCreateTime,
					endTime:this.endtime
				};
				let res = await this.axios({
			        method: "post",
			        url: this.$local.http+this.$api.paymentOrderList,
			        params: params,
			    })
				if(res.data.success){
					console.log(res);
					this.tableListDetail=res.data.data.list;
				}else {
					this.tableListDetail=[]
					this.$toast(res.data.msg);
				}
				// loading.close();
			},
			//重置
			reset(){
				// if (!(this.timer[0] == null && this.contact=='')) {
					
				// }
				this.contact = '';
				this.timer = [null,null];
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
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
</style>
