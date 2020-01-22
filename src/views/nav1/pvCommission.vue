<template>
	<!-- 和平村提成明细 -->
    <div class="app-container">
        <div class="head-ed">
            <ul>
                <li>
                    <div class="block">
                        <span class="se-pl" style="margin-right:10px;">创建时间</span>
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
                    <span class="se-pl">父级文交所账号</span>
                    <div class="inputes">
                        <el-input placeholder="请输入" v-model="supAccounts" clearable style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">交易账号</span>
                    <div class="inputes">
                        <el-input v-model="accounts" placeholder="请输入" style="width:185px;"></el-input>
                    </div>
                </li>
                <!--<li>-->
                    <!--<span class="se-pl">结款状态</span>-->
                    <!--<div class="inputes">-->
                        <!--<el-select v-model="money" clearable placeholder="请选择">-->
                            <!--<el-option v-for="item in opsed" :key="item.value" :label="item.label" :value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</div>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<span class="se-pl">支付方式</span>-->
                    <!--<div class="inputes">-->
                        <!--<el-select v-model="zffs" clearable placeholder="请选择">-->
                            <!--<el-option v-for="item in opsedList" :key="item.value" :label="item.label" :value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</div>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<span class="se-pl">订单ID</span>-->
                    <!--<div class="inputes">-->
                        <!--<el-input v-model="orderId" placeholder="请输入" style="width:185px;"></el-input>-->
                    <!--</div>-->
                <!--</li>-->
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
        <h6 class="h6" v-if="total>0">共{{total}}条记录，{{initData.pages}}页。当前为第{{form.page}}页</h6>
        <el-table 
		:data="initData.list" 
		v-loading="this.$store.getters.getLoadingBool"
		element-loading-text="拼命加载中..."
		border fit highlight-current-row style="width: 100%">
		<!--  -->
            <el-table-column width="110px" align="center" label="交易账号">
                <template slot-scope="scope">
                    <span>{{scope.row.accounts}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="数量">
                <template slot-scope="scope">
                    <span>{{scope.row.bs_amount}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="单价">
                <template slot-scope="scope">
                    <span>{{scope.row.bs_price}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="总价" width="140px">
                <template slot-scope="scope">
                    <span>{{ scope.row.tol }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="提成金额" width="140px">
                <template slot-scope="scope">
                    <span>{{ scope.row.deduct }}</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="创建时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.created_at }}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="搜了农庄用户ID">
                <template slot-scope="scope">
                    <span>{{ scope.row.user_id }}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="真实名字">
                <template slot-scope="scope">
                    <span>{{ scope.row.real_name }}</span>
                </template>
            </el-table-column>
            <el-table-column width="170px" align="center" label="银行卡号">
                <template slot-scope="scope">
                    <span>{{ scope.row.bank_number }}</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="开户行">
                <template slot-scope="scope">
                    <span>{{ scope.row.open_bank_add}}</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="身份证号码">
                <template slot-scope="scope">
                    <span>{{ scope.row.card_number}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="父级用户ID">
                <template slot-scope="scope">
                    <span>{{ scope.row.superior_userId}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="父级真实名字">
                <template slot-scope="scope">
                    <span>{{ scope.row.supReal_name}}</span>
                </template>
            </el-table-column>
            <el-table-column width="170px" align="center" label="父级银行卡号">
                <template slot-scope="scope">
                    <span>{{ scope.row.supBank_number}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="父级开户行" width="140">
                <template slot-scope="{row}">
                    <span >{{row.supOpen_bank_add}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="父级身份证号码" width="160">
                <template slot-scope="{row}">
                    <span >{{row.supCard_number}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="父级文交所账号" width="90">
                <template slot-scope="{row}">
                    <span >{{row.supAccounts}}</span>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
    </div>
</template>

<script>
    // import {formatDate} from '../../common/js/filters.js'
    import Pagination from '@/components/Pagination'
    export default {
        components: { Pagination },
        // filters: {
        //     formatDate(time){
        //         var data = new Date(time);
        //         return formatDate(data,'yyyy-MM-dd');
        //     }
        // },
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    page: 1,
                    limit: 10
                },
                name: '',
				supAccounts: '',//父级交易账户
				accounts:'',//交易账户
                money:'',
                agentCreateTime:'',
                endtime:'',
                id:'',
                order_id:'',
                orderId:'',
                timer: [],
                formLabelWidth: '120px',
                initData:[],
                total:'',
                formData:{
                    pay_money:'',
                    pay_method:'',
                    couponsNumber:'',
                },
                opsed: [{
                    value: '',
                    label: '全部'
                },{
                    value: '0',
                    label: '未结清'
                }, {
                    value: '1',
                    label: '已结清'
                }],
                opsedList:[
                    {
                        value: '0',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '人民币'
                    },
                    {
                        value: '2',
                        label: '人民币+积分'
                    },
                    {
                        value: '3',
                        label: '人民币+搜了贝'
                    },
                ],
                zffs:'',
                tableList:[],
            }
        },
        mounted() {
			this.getList()
		},
        methods: {
            getList(){
				this.$store.commit('setLoadingBool',true);
                let Time = this.timer;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.agentCreateTime = Start.getTime(); //当前时间转换成long型
                this.endtime = End.getTime()+Number(86399999); //当前时间转换成long型
                if (Time[0] == null) {
                    this.agentCreateTime ='';
                    this.endtime ='';
                }
				var params={
					pageNum: this.form.page,
					pageSize:this.form.limit,
					startTime:this.agentCreateTime,
					endTime:this.endtime,
					accounts:this.accounts,
					supAccounts:this.supAccounts
				}
                this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.pvCommission,
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
				// const loading = this.$loading({ lock: true,text: '拼命加载中...'});
                let Time = this.timer;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.agentCreateTime = Start.getTime(); //当前时间转换成long型
                this.endtime = End.getTime()+Number(86399999); //当前时间转换成long型
                if (Time[0] == null) {
                    this.agentCreateTime ='';
                    this.endtime ='';
                }
				var params={
					pageNum: this.form.page,
					pageSize:this.total,
					startTime:this.agentCreateTime,
					endTime:this.endtime,
					accounts:this.accounts,
					supAccounts:this.supAccounts
				};
				let res = await this.$axios({
					method: "post",
					url: this.$local.http + this.$api.pvCommission,
					params: params,
				});
                if (res.data.success) {
                	this.tableList=res.data.data.list;
					
                } else {
					this.$message({
					        message:res.data.msg,
					        type: 'error'
					    });
					this.tableList=[]
                }
				// loading.close();
				
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
					  const { export_json_to_excel } = require('../../vendor/Export2Excel');
					  const tHeader = ['交易账号','数量','单价','总价','提成金额','创建时间','搜了农庄用户ID','真实名字','银行卡号','开户行','身份证号码','父级用户ID','父级真实名字','父级银行卡号','父级开户行', '父级身份证号码','父级文交所账号'];
						const filterVal = ['accounts','bs_amount','bs_price','tol','deduct','created_at','user_id','real_name','bank_number','open_bank_add','card_number','superior_userId','supReal_name','supBank_number','supOpen_bank_add', 'supCard_number','supAccounts'];
						const list = this.tableList;
					  const data = this.formatJson(filterVal, list);
					  export_json_to_excel(tHeader, data,'和平村提成明细');
					});
			    }).catch(() => {
			        this.$message({
			            type: 'info',
			            message: '已取消导出'
			        });
			    });
			},
			//重置
			reset(){
				// if (!(this.timer[0] == null && this.accounts=='' && this.supAccounts=='')) {
					
				// }
				this.accounts = this.supAccounts = '';
				this.timer = [null,null];
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