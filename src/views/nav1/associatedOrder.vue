<template>
    <div style="padding:20px;">
        <div class="head-ed">
            <ul>
                <li>
                    <span class="se-pl">推广人：</span>
                    <p class="inputes"></p>
                </li>
                <li>
                    <span class="se-pl">累计收益：</span>
                    <p class="inputes">

                    </p>
                </li>
                <li>
                    <span class="demonstration" style="margin-right:10px;">已结款：</span>
                    <p></p>
                </li>
            </ul>
            <div>
                <el-row class="inputes">
                    <el-button @click='export2Excel()' type='primary'>导出Excel表</el-button>
                </el-row>
            </div>
        </div>
        <div>
            <h6 class="h6">筛选时间段：——</h6>
            <h6 class="h6">筛选时间段内收益总金额：￥</h6>
            <el-table :data="tableData.list" border style="width: 100%">

                <el-table-column prop="create_time" label="订单编号" width="200">
                </el-table-column>
                <el-table-column prop="superior_id" label="订单状态" width="80">
                </el-table-column>
                <el-table-column prop="total_integral" label="支付方式" width="120">
                </el-table-column>
                <el-table-column width="80px" prop="order_id" label="订单创建时间">
                </el-table-column>
                <el-table-column prop="consigneeName" label="用户昵称" width="150">
                </el-table-column>
                <el-table-column prop="consigneePhone" label="店铺名称" width="150">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.price||0}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="total_amount" label="商品名称" width="200">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.total_amount||0}}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="total_slb" label="收件人" width="120">
                </el-table-column>
                <el-table-column prop="price" label="商品数量" width="200">
                </el-table-column>
                <el-table-column prop="payment_channel" label="现金总价" width="100">
                </el-table-column>
                <el-table-column prop="payment_channel" label="邮费" width="100">
                </el-table-column>
                <el-table-column prop="payment_channel" label="支付时间" width="100">
                </el-table-column>
                <el-table-column prop="payment_channel" label="操作" width="100">

                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />

        <div class="p_foot">
            <p class="p_one">筛选统计：</p>
            <div class="p_div">
                <p class="p_two">
                    订单总额：￥{{add.total||0}}
                </p>
                <p class="p_two">
                    推广提成：￥{{add.price||0}}
                </p>
            </div>
        </div>

    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name:'associatedOrder',
        data() {
            return {

                form: {
                    page: 1,
                    limit: 10
                },
                name: '',
                contact: '',
                timer: [],
                tableData: '',
                add:{},
                total:'',
                dataTime:'',
                dataTime1:'',
                orderId:'',
                tableList:[],
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
            }
        },
        components: {Pagination},
        mounted() {
            this.getList();
        },
        methods: {
            getList() { //初始化
                let Time = this.timer;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.dataTime = Start.getTime(); //当前时间转换成long型
                this.dataTime1 = End.getTime()+Number(86399999); //当前时间转换成long型
                if (Time[0] == null) {
                    this.dataTime ='';
                    this.dataTime1 ='';
                }
                var url = this.$local.http + this.$api.ruleList;
                if(this.name==''&& this.contact==''&&this.dataTime==''&&this.dataTime1==''&& this.zffs==''&&this.orderId==''){
                    var params={
                        pageNum: this.form.page,
                        pageSize:this.form.limit,
                    }
                }else {
                    var params={
                        userName: this.name,
                        phone: this.contact,
                        statTime: this.dataTime,
                        endTime: this.dataTime1,
                        flg:this.zffs,
                        orderId:this.orderId,
                        pageNum: this.form.page,
                        pageSize:this.form.limit,
                    }
                }
                this.axios.get(url,{params:params,}).then(data => {
                    let res = data.data;
                    if(res.success){
                        this.$message({message:res.msg, type: 'success'});
                        this.tableData = res.data.pageInfo;
                        this.total=this.tableData.total;
                        this.add=res.data.add;
                        this.getData();
                    }else{
                        this.$message({message: res.msg, type: 'warning'});
                        this.tableData =[]
                    }
                })
            },
            getData() { //初始化
                let Time = this.timer;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.dataTime = Start.getTime(); //当前时间转换成long型
                this.dataTime1 = End.getTime()+Number(86399999);//当前时间转换成long型
                if (Time[0] == null) {
                    this.dataTime ='';
                    this.dataTime1 ='';
                }
                if(this.name==''&& this.contact==''&&this.dataTime==''&&this.dataTime1==''&& this.zffs==''&&this.orderId==''){
                    var params={
                        pageNum: this.form.page,
                        pageSize:this.total,
                    }
                }else {
                    var params={
                        userName: this.name,
                        phone: this.contact,
                        statTime: this.dataTime,
                        endTime: this.dataTime1,
                        flg:this.zffs,
                        orderId:this.orderId,
                        pageNum: this.form.page,
                        pageSize:this.total,
                    }
                }
                this.axios({
                    method: "get",
                    url: this.$local.http + this.$api.ruleList,
                    params: params,
                }).then(res => {
                    if (res.data.success) {
                        this.tableList=res.data.data.pageInfo.list;
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
                this.$confirm('确定要导出表格数据么？?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    require.ensure([], () => {
                        for (var i in this.tableList) {
                            if (this.tableList[i].payment_channel == 1) {
                                this.tableList[i].payment_channel = '微信'
                            } else if (this.tableList[i].payment_channel == 2) {
                                this.tableList[i].payment_channel = '支付宝'
                            }else if (this.tableList[i].payment_channel == 3) {
                                this.tableList[i].payment_channel = '银行卡'
                            }
                        }
                        const { export_json_to_excel } = require('../../vendor/Export2Excel');
                        const tHeader = ['上级ID','订单ID','时间','用户姓名','联系方式','消费支付金额','积分','搜了贝','平台进账收益', '进账方式'];
                        const filterVal = ['superior_id','order_id','create_time','consigneeName','consigneePhone','total_amount','total_integral','total_slb','price','payment_channel'];
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
            //查看订单
            contentClick(scope){
                this.$router.push({path: '/viewOrders',query:{serial_number:scope.row.serial_number}})
            },
        },
    }
</script>

<style scoped lang="scss">
    .h6 {
        padding: 10px 5px 15px;
        font-size: 16px;
        display: inline-block;
        margin-right: 5%;
    }

    .inputes {
        display: inline-block !important;
    }

    .sp-df {
        margin-right: 15px;
        cursor: pointer;
    }
    .sp-df1 {
        margin-right: 15px;
        cursor: pointer;
        color: #18c79c;;
    }
    .se-pl {
        margin-right: 10px;
    }

    .head-ed {
        overflow: hidden;
    }
    .head-ed ul{padding: 0;width: 80%;float: left;}
    .head-ed ul li{margin: 15px 2% 0 0;font-size: 16px;}
    .head-ed div{float: right;margin-top: 40px}
    .el-select {
        width: 220px !important;
    }

    .se-pl-t {
        margin-right: 10px;
        margin-left: 12px;
    }

    .f-pl-t {
        margin-right: 10px;
        margin-left: 40px;
    }

    .sed-font {
        height: 30px;
        line-height: 30px;
        position: relative;
        top: 20px;
    }

    .sed-font-t {
        margin-bottom: 45px;
        height: 30px;
    }

    .sed-font-t>div {
        float: left;
    }

    .fen-df {
        margin-top: 20px;
    }
    .p_foot{overflow: hidden;padding-top: 20px;}
    .p_one{float: left;font-size: 16px;font-weight: 600;line-height: 30px;}
    .p_div{float: left;padding-left: 20px;}
    .p_two {
        line-height: 30px;
        font-size: 16px;
        font-weight: 200;
        height: 30px;
    }
</style>
