<template>
    <div class="app-container">
        <div class="head-ed">
            <ul>
                <li>
                    <div class="block">
                        <span class="se-pl" style="margin-right:10px;">上级确认时间</span>
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
                        <span class="se-pl" style="margin-right:10px;">确认收货时间</span>
                        <el-date-picker
                                v-model="confirmTimer"
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
                    <span class="se-pl">用户姓名</span>
                    <div class="inputes">
                        <el-input placeholder="请输入" v-model="name" clearable style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">联系方式</span>
                    <div class="inputes">
                        <el-input v-model="contact" placeholder="请输入" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">结款状态</span>
                    <div class="inputes">
                        <el-select v-model="money" clearable placeholder="请选择">
                            <el-option v-for="item in opsed" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <span class="se-pl">支付方式</span>
                    <div class="inputes">
                        <el-select v-model="zffs" clearable placeholder="请选择">
                            <el-option v-for="item in opsedList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <span class="se-pl">订单ID</span>
                    <div class="inputes">
                        <el-input v-model="orderId" placeholder="请输入" style="width:185px;"></el-input>
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
        <h6 class="h6" v-if="total>0">共{{total}}条记录，{{initData.pages}}页。当前为第{{form.page}}页</h6>
        <el-table 
		v-loading="this.$store.getters.getLoadingBool"
		element-loading-text="拼命加载中..."
		:data="initData.list" 
		border fit highlight-current-row style="width: 100%">
            <el-table-column width="80px" align="center" label="订单ID">
                <template slot-scope="scope">
                    <span>{{scope.row.order_id}}</span>
                </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="上级确认时间">
                <template slot-scope="scope">
                    <span>{{scope.row.create_time}}</span>
                </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="确认收货时间">
                <template slot-scope="scope">
                    <span>{{scope.row.confirm_receipt_time}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="用户姓名" width="140px">
                <template slot-scope="scope">
                    <span>{{ scope.row.username }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="用户ID" width="140px">
                <template slot-scope="scope">
                    <span>{{ scope.row.user_id }}</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="联系方式">
                <template slot-scope="scope">
                    <span>{{ scope.row.phone }}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="真实姓名">
                <template slot-scope="scope">
                    <span>{{ scope.row.real_name }}</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="开户支行">
                <template slot-scope="scope">
                    <span>{{ scope.row.open_branch_bank }}</span>
                </template>
            </el-table-column>
            <el-table-column width="170px" align="center" label="银行卡号">
                <template slot-scope="scope">
                    <span>{{ scope.row.bank_card }}</span>
                </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="下级转让金额">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.total_amount||0}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="积分">
                <template slot-scope="scope">
                    <span>{{ scope.row.total_integral}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="搜了贝">
                <template slot-scope="scope">
                    <span>{{ scope.row.total_slb}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="应收益金额">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.on_price||0}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="实际收益金额">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.price||0}}</span>
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="结款状态" width="90">
                <template slot-scope="{row}">
                    <span v-if=" row.status==0">未结清</span>
                    <span v-else-if=" row.status==1">已结清</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="结款方式">
                <template slot-scope="scope">
                    <span v-if="scope.row.bank_type==1">支付宝</span>
                    <span v-if="scope.row.bank_type==0">微信</span>
                    <span v-if="scope.row.bank_type==2">银行卡</span>
                    <span v-if="scope.row.bank_type==-1">未结款</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="{row}">
                    <el-button type="success" size="small" @click="dialogFormShow(row)">结款</el-button>
                    <el-button type="success" size="small" @click="contentClick(row)">查看订单</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
        <el-dialog title="结款" :visible.sync="dialogFormVisible" >
            <el-form :model="formData">
                <el-form-item label="结款方式" :label-width="formLabelWidth">
                    <el-select v-model="formData.pay_method" placeholder="请选择结款方式">
                        <el-option label="支付宝" value="1"></el-option>
                        <el-option label="微信" value="0"></el-option>
                        <el-option label="银行卡" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="结款金额" :label-width="formLabelWidth">
                    <el-input v-model="formData.pay_money" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="购物券数量" :label-width="formLabelWidth">
                    <el-input v-model="formData.couponsNumber" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogForm()">确 定</el-button>
            </div>
        </el-dialog>
        <!--<div class="p_foot">-->
            <!--<p class="p_one">筛选统计：</p>-->
            <!--<div class="p_div">-->
                <!--<p class="p_two">-->
                    <!--下级转让总金额：￥{{inList.total||0}}-->
                <!--</p>-->
                <!--<p class="p_two">-->
                    <!--收益总金额：￥{{inList.price||0}}-->
                <!--</p>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    // import {formatDate} from '../../common/js/filters.js'
    import Pagination from '@/components/Pagination'
    export default {
        name: 'UserIncomeSettlement',
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
                contact: '',
                money:'',
                agentCreateTime:'',
                endtime:'',
                confirmStartTime:'',
                confirmEndTime:'',
                id:'',
                order_id:'',
                orderId:'',
                timer: [],
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
        mounted() {
            this.getList()
        },
        methods: {
            dialogFormShow(row){
                this.id=row.id;
                this.order_id=row.order_id;
                this.dialogFormVisible=true;
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

                //转换筛选确认收货时间
                let confirmTime = this.confirmTimer;
                let confirmStart = new Date(confirmTime[0]);
                let confirmEnd = new Date(confirmTime[1]);
                this.confirmStartTime = confirmStart.getTime(); //当前时间转换成long型
                this.confirmEndTime = confirmEnd.getTime()+Number(86399999); //当前时间转换成long型
                if (confirmTime[0] == null) {
                    this.confirmStartTime ='';
                    this.confirmEndTime ='';
                }
                console.log("------**********--------")
                console.log(this.confirmStartTime)
                console.log(this.confirmEndTime)
                if(this.name==''&& this.contact==''&&this.agentCreateTime==''&&this.endtime==''&&this.money==''&& this.zffs==''&&this.orderId==''
                    && this.confirmStartTime==''&&this.confirmEndTime==''){
                    var params={
                        pageNum: this.form.page,
                        pageSize:this.form.limit,
                    }
                }else {
                    var params={
                        userName: this.name,
                        phone: this.contact,
                        statTime: this.agentCreateTime,
                        endTime: this.endtime,
                        status:this.money,
                        flg:this.zffs,
                        orderId:this.orderId,
                        pageNum: this.form.page,
                        pageSize:this.form.limit,
                        confirmStartTime:this.confirmStartTime,
                        confirmEndTime:this.confirmEndTime,
                    }
                }
                this.axios({
                    method: "get",
                    url: this.$local.http+this.$api.IncomeFromPlatformList,
                    params: params,
                }).then(res=>{
					this.$store.commit('setLoadingBool',false);
                    if (res.data.success) {
                        this.initData=res.data.data.pageInfo;
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

                //转换筛选确认收货时间
                let confirmTime = this.confirmTimer;
                let confirmStart = new Date(confirmTime[0]);
                let confirmEnd = new Date(confirmTime[1]);
                this.confirmStartTime = confirmStart.getTime(); //当前时间转换成long型
                this.confirmEndTime = confirmEnd.getTime()+Number(86399999); //当前时间转换成long型
                if (confirmTime[0] == null) {
                    this.confirmStartTime ='';
                    this.confirmEndTime ='';
                }

                if(this.name==''&& this.contact==''&&this.agentCreateTime==''&&this.endtime==''&&this.money==''&& this.zffs==''&&this.orderId==''
                    && this.confirmStartTime==''&& this.confirmEndTime==''){
                    var params={
                        pageNum: this.form.page,
                        pageSize:this.total,
                    }
                }else {
                    var params={
                        userName: this.name,
                        phone: this.contact,
                        statTime: this.agentCreateTime,
                        endTime: this.endtime,
                        status:this.money,
                        flg:this.zffs,
                        orderId:this.orderId,
                        pageNum: this.form.page,
                        pageSize:this.total,
                        confirmStartTime:this.confirmStartTime,
                        confirmEndTime:this.confirmEndTime,
                    }
                }
                let res = await this.axios({
                    method: "get",
                    url: this.$local.http + this.$api.IncomeFromPlatformList,
                    params: params,
                });
				if(res.data.success){
					this.tableList=res.data.data.pageInfo.list;
					
				}else {
				    this.tableList=[]
					this.$message({
					    type: 'info',
					    message: '已取消导出'
					});
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
					        if (this.tableList[i].status == 0) {this.tableList[i].status = '未结清'
					        } else if (this.tableList[i].status == 1) {this.tableList[i].status = '已结清'}}
					    for (var i in this.tableList) {
					        if (this.tableList[i].bank_type == 0) {this.tableList[i].bank_type = '微信'}
					        else if (this.tableList[i].bank_type == 1) {this.tableList[i].bank_type = '支付宝'
					        }else if (this.tableList[i].bank_type == 2) {this.tableList[i].bank_type = '银行卡'
					        }else if (this.tableList[i].bank_type == -1) {this.tableList[i].bank_type = '未结款'
					        }
					    }
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['订单ID','上级确认时间','确认收货时间','用户姓名','用户ID','联系方式','真实姓名','开户支行','银行卡号','下级转让金额','积分','搜了贝','应收益金额','实际收益金额','结款状态', '结款方式'];
					    const filterVal = ['order_id','create_time','confirm_receipt_time','username','user_id','phone','real_name','open_branch_bank','bank_card','total_amount','total_integral','total_slb','on_price','price','status', 'bank_type'];
					    const list = this.tableList;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data,'文交收益结款');
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
				// if (!(
				// this.timer[0] == null && 
				// this.confirmTimer[0] == null && 
				// this.name=='' && 
				// this.contact=='' && 
				// this.money=='' && 
				// this.zffs=='' && 
				// this.orderId==''
				// )) {
					
				// }
				this.name = this.contact =
				this.money = this.zffs = 
				this.orderId = '';
				this.timer = this.confirmTimer = [null,null];
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
            //缴费进账
            dialogForm(){
                let this_ = this;
                const formDatas=new FormData();
                formDatas.append('id',this.id);
                formDatas.append('price',this_.formData.pay_money);
                formDatas.append('type',this_.formData.pay_method);
                formDatas.append('orderId',this.order_id);
                formDatas.append('integrate',this_.formData.couponsNumber);//购物券数量

                this.axios({
                    method: "POST",
                    url: this.$local.http+this.$api.updateData,
                    data:formDatas,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    if (res.data.success) {
                        this.dialogFormVisible=false;
                        this.$message({message:res.data.msg, type: 'success'});
                        this.getList()
                    }else {
                        this.$message({message:res.data.msg, type: 'error'})
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'})
                })
            },
            contentClick(row){
                this.$router.push({path:'/viewOrders',query:{serial_number:row.serial_number}})
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

