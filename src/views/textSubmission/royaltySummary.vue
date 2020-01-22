<template>
	<!-- 文交提成汇总 -->
    <div class="app-container">
        <div class="head-ed">
            <ul>
                <li>
                    <div class="block">
                        <span class="se-pl" style="margin-right:10px;">消费时间</span>
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
                <!--<li>-->
                    <!--<div class="block">-->
                        <!--<span class="se-pl" style="margin-right:10px;">确认收货时间</span>-->
                        <!--<el-date-picker-->
                                <!--v-model="confirmTimer"-->
                                <!--value-format="timestamp"-->
                                <!--type="daterange"-->
                                <!--placeholder="请选择"-->
                                <!--range-separator="至"-->
                                <!--start-placeholder="开始日期"-->
                                <!--end-placeholder="结束日期"-->
                        <!--&gt;</el-date-picker>-->
                    <!--</div>-->
                <!--</li>-->
           <!--     <li>
                    <span class="se-pl">文交所账号</span>
                    <div class="inputes">
                        <el-input placeholder="请输入" v-model="name" clearable style="width:185px;"></el-input>
                    </div>
                </li> -->
				
                <!--<li>-->
                    <!--<span class="se-pl">联系方式</span>-->
                    <!--<div class="inputes">-->
                        <!--<el-input v-model="contact" placeholder="请输入" style="width:185px;"></el-input>-->
                    <!--</div>-->
                <!--</li>-->
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
                <li>
                    <span class="se-pl">搜了农庄ID</span>
                    <div class="inputes">
                        <el-input v-model="slId" placeholder="请输入" style="width:185px;"></el-input>
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
                <!--<li>
                    <!--<el-row class="inputes">-->
                        <!--<el-button @click='importExcel()' type='primary'>导入Excel表</el-button>-->
                    <!--</el-row>-->
                <!--</li>-->
            </ul>
        </div>
        <h6 class="h6" v-if="total>0">共{{total}}条记录，{{initData.pages}}页。当前为第{{form.page}}页</h6>
        <el-table 
		:data="initData.list"
		 v-loading="this.$store.getters.getLoadingBool"
		 element-loading-text="拼命加载中..."
		 border fit highlight-current-row style="width: 100%">
            <!--<el-table-column width="150px" align="center" label="交易时间">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{scope.row.ti}}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
      <!--      <el-table-column width="160px" align="center" label="交易订单号">
                <template slot-scope="scope">
                    <span>{{scope.row.tr_n}}</span>
                </template>
            </el-table-column> -->
            <el-table-column width="110px" align="center" label="搜了农庄用户ID">
                <template slot-scope="scope">
                    <span>{{scope.row.sl_user_id}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="真实姓名" width="80px">
                <template slot-scope="scope">
                    <span>{{ scope.row.username}}</span>
                </template>
            </el-table-column>
			<el-table-column width="100px" align="center" label="文交所账号">
			    <template slot-scope="scope">
			        <span>{{ scope.row.accounts }}</span>
			    </template>
			</el-table-column>
            <el-table-column align="center" label="银行卡号" width="180px">
                <template slot-scope="scope">
                    <span>{{ scope.row.bankAccount }}</span>
                </template>
            </el-table-column>
            <el-table-column width="320px" align="center" label="开户支行">
                <template slot-scope="scope">
                    <span>{{ scope.row.open_bank }}</span>
                </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="身份证号码">
                <template slot-scope="scope">
                    <span>{{ scope.row.cardNumber }}</span>
                </template>
            </el-table-column>
			<el-table-column width="160px" align="center" label="下级消费总金额">
			    <template slot-scope="scope">
			        <span>{{$filterUtl.mbs(scope.row.tol)}}</span>
			    </template>
			</el-table-column>
			<el-table-column width="120px" align="center" label="提成金额">
			    <template slot-scope="scope">
			        <span>{{$filterUtl.mbs(scope.row.lowerLevel)}}</span>
			    </template>
			</el-table-column>
            <el-table-column width="140px" align="center" label="文交所消费总金额">
                <template slot-scope="scope">
                    <span>{{ scope.row.totalMoney}}</span>
                </template>
            </el-table-column>
<!--            <el-table-column width="180px" align="center" label="是否有资格得到千分之一提成">
                <template slot-scope="scope">
                    <span v-if="scope.row.qty<10">没有</span>
                    <span v-if="scope.row.qty>=10">有</span>
                </template>
            </el-table-column> -->
            <el-table-column width="60px" align="center" label="操作">
                <template slot-scope="{row}">
                    <el-button type="success" size="small" @click="dialogFormShow(row)">结款</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
        <el-dialog title="结款" :visible.sync="dialogFormVisible" width="30%" center>
            <el-form :model="formData">
                <el-form-item label="银行卡号" :label-width="formLabelWidth">
                    <el-input disabled  v-model="formData.couponsNumber" clearable></el-input>
                </el-form-item>
                <el-form-item label="开户银行" :label-width="formLabelWidth">
                    <el-input disabled  v-model="formData.pay_method" clearable></el-input>
                </el-form-item>
                <el-form-item label="结款金额" :label-width="formLabelWidth">
                    <el-input v-model="formData.pay_money" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogForm()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // import {formatDate} from '../../common/js/filters.js'
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
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
                name: '',//文交所账号
				slId:'',//搜了id
				timer: [],//时间范围
                contact: '',
                money:'',
                agentCreateTime:'',
                endtime:'',
                confirmStartTime:'',
                confirmEndTime:'',
                id:'',
                userId:'',
                bankAccount:'',
                confirmTimer: [],
                formLabelWidth: '120px',
                inList:[],
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
        mounted() {this.getList()},
        methods: {
            dialogFormShow(row){
                this.id=row.tr_n;
                this.userId=row.sl_user_id;
                this.bankAccount=row.bankAccount;
                this.dialogFormVisible=true;
				this.formData.couponsNumber=row.bankAccount;
				this.formData.pay_method=row.open_bank;
            },
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
                var data={
                    startTime:this.agentCreateTime,
                    endTime:this.endtime,
                    userId:this.slId,
                    pageNum: this.form.page,
                    pageSize:this.form.limit,
                };
                this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.queryWjsDetailsSummary,
                    data: qs.stringify(data),
                }).then(res=>{
					this.$store.commit('setLoadingBool',false);
                    if (res.data.success) {
                        this.initData=res.data.data;
                        this.total=this.initData.total;
                        this.inList=res.data.data.add;
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
                let Time = this.timer;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.agentCreateTime = Start.getTime(); //当前时间转换成long型
                this.endtime = End.getTime()+Number(86399999); //当前时间转换成long型
                if (Time[0] == null) {
                    this.agentCreateTime ='';
                    this.endtime ='';
                }
				var data={
				    startTime:this.agentCreateTime,
				    endTime:this.endtime,
				    userId:this.slId,
				    pageNum: this.form.page,
				    pageSize:this.total,
				};
                let res = await this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.queryWjsDetailsSummary,
                    data: qs.stringify(data),
                });
				if (res.data.success) {
				    this.tableList=res.data.data.list;
					
				}else {
					this.$message({ message:res.data.msg, type: 'error' });
				    this.tableList=[]
				} 
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            export2Excel() {
                this.$confirm('确定要导出表格数据么？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
					require.ensure([], () => {
					    for (var i in this.tableList) {
					        if (this.tableList[i].qty < 10) {
					            this.tableList[i].qty = '没有'
					        } else if (this.tableList[i].qty >= 10) {
					            this.tableList[i].qty = '有'
					        }
					    }
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['搜了农庄用户ID','真实姓名','文交所账号','银行卡号','开户支行','身份证号码','下级消费总金额','提成金额','文交所消费总金额'];
					    const filterVal = ['sl_user_id','username','accounts','bankAccount','open_bank','cardNumber','tol','lowerLevel','totalMoney'];
					    const list = this.tableList;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data,'文交提成汇总');
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
				// if (!(this.timer[0] == null && this.slId=='')) {
				
				// }
				this.slId ='';
				this.timer = [null,null];
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
            importExcel(){
                this.$router.push({path: '/tableImport'})
            },
            //缴费进账   打款确认
            dialogForm(){
                let this_ = this;
                var data={
                    userId:this_.userId,
                    orderId:this_.id,
                    bankNum:this_.formData.couponsNumber,
                    openBank:this_.formData.pay_method,
                    money:this_.formData.pay_money,
                };
                this.axios({
                    method: "POST",
                    url: this.$local.http+this.$api.hidWjsDownMoney,
                    data:qs.stringify(data),
                }).then(res=>{
                    if (res.data.success) {
                        this.dialogFormVisible=false;
                        this.formData.couponsNumber='';
                        this.formData.pay_method='';
                        this.formData.pay_money='';
                        this.$message({message:res.data.msg, type: 'success'});
                        this.getList()
                    }else {
                        this.$message({message:res.data.msg, type: 'error'})
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'})
                })
            },
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
