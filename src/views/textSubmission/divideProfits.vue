<template>
    <div class="app-container">
        <div class="head-ed">
            <ul>
                <li>
                    <div class="block">
                        <span class="se-pl" style="margin-right:10px;">交易时间</span>
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
                <li>
                <span class="se-pl">购买人文交账户</span>
                <div class="inputes">
                <el-input placeholder="请输入" v-model="name" clearable style="width:185px;"></el-input>
                </div>
                </li>
                <li>
                <span class="se-pl">挂单号</span>
                <div class="inputes">
                <el-input v-model="contact" placeholder="请输入" style="width:185px;"></el-input>
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
                        <el-button @click='export2Excel()' type='primary'>导出Excel表</el-button>
                    </el-row>
                </li>
                <!--<li>-->
                <!--<el-row class="inputes">-->
                <!--<el-button @click='importExcel()' type='primary'>导入Excel表</el-button>-->
                <!--</el-row>-->
                <!--</li>-->
            </ul>
        </div>
        <h6 class="h6" v-if="total>0">共{{total}}条记录，{{initData.pages}}页。当前为第{{form.page}}页</h6>
        <el-table :data="initData.list" border fit highlight-current-row style="width: 100%">
            <el-table-column width="160px" align="center" label="交易时间">
                <template slot-scope="scope">
                    <span>{{scope.row.lowerLevel}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="购买人姓名">
                <template slot-scope="scope">
                    <span>{{scope.row.lowerLevelMoney}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="购买人文交所账户">
                <template slot-scope="scope">
                    <span>{{scope.row.sl_user_id}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="购买数量" width="100px">
                <template slot-scope="scope">
                    <span>{{ scope.row.username}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="单价" width="160px">
                <template slot-scope="scope">
                    <span>{{ scope.row.bankAccount }}</span>
                </template>
            </el-table-column>
            <el-table-column width="320px" align="center" label="支付金额">
                <template slot-scope="scope">
                    <span>{{ scope.row.open_bank }}</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="买卖方向">
                <template slot-scope="scope">
                    <span>{{ scope.row.cardNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="挂单号">
                <template slot-scope="scope">
                    <span>{{ scope.row.accounts }}</span>
                </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="手续费">
                <template slot-scope="scope">
                    <span>{{ scope.row.totalMoney}}</span>
                </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="分润">
                <template slot-scope="scope">
                    <span v-if="scope.row.qty<10">没有</span>
                    <span v-if="scope.row.qty>=10">有</span>
                </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="购物劵">
                <template slot-scope="scope">
                    <span>{{ scope.row.totalMoney}}</span>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
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
        mounted() {this.getList()},
        methods: {
            getList(){
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
                    pageNum: this.form.page,
                    pageSize:this.form.limit,
                }

                this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.queryWjsDetailsSummary,
                    data: qs.stringify(data),
                }).then(res=>{
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
            getData() { //初始化
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
                    pageNum: this.form.page,
                    pageSize:this.total,
                }
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.queryWjsDetailsSummary,
                    data: qs.stringify(data),
                }).then(res => {
                    if (res.data.success) {
                        this.tableList=res.data.data.list;
                    }else {
                        this.tableList=[]
                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    });
                    this.tableList=[]
                })
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
                        const tHeader = ['下级消费总金额','提成金额','搜了农庄用户ID','真实姓名','银行卡号','开户支行','身份证号码','文交所账号','文交所消费总金额','是否有资格得到千分之一提成'];
                        const filterVal = ['lowerLevel','lowerLevelMoney','sl_user_id','username','bankAccount','open_bank','cardNumber','accounts','totalMoney','qty'];
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
            importExcel(){
                this.$router.push({path: '/tableImport'})
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