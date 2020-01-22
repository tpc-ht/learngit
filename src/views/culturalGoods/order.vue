<template>
    <div class="markingDetails">
        <div class="markingDetails_head">
            <ul>
                <li>
                    <span class="se-pl">发货状态</span>
                    <el-select v-model="shzt" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <div class="inputes">
                       <span class="se-pl">下单时间</span>
                            <el-date-picker
                                    v-model="timerData"
                                    value-format="timestamp"
                                    type="daterange"
                                    placeholder="请选择"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    @change="change"
                            ></el-date-picker>
                    </div>
                </li>
                <li>
                    <el-row class="inputes">
                        <el-button @click="getList()">查询</el-button>
                    </el-row>
                </li>

            </ul>
        </div>
        <div>
            <h6 class="h6">文交商品的订单信息</h6>
            <el-table :data="tableList.list" border style="width: 100%">
                <el-table-column prop="serial_number" label="订单编号" width="220">
                </el-table-column>
                <el-table-column prop="payment_state" label="下单时间" width="110">
                </el-table-column>
                <el-table-column prop="payment_channel" label="商品名称" width="110">
                </el-table-column>
                <el-table-column prop="create_time" label="订单总金额" width="110">
                </el-table-column>
                <el-table-column prop="nick_name" label="收货人姓名" width="110">
                </el-table-column>
                <el-table-column prop="shop_name" label="收货人电话" width="110">
                </el-table-column>
                <el-table-column prop="product_name" label="收货人地址" width="110">
                </el-table-column>
                <el-table-column prop="user_name" label="发货状态" width="110">
                </el-table-column>
                <el-table-column prop="shop_name" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button @click="contentClick(scope)" type="text" size="small">查看</el-button>
                        <el-button @click="contentClick(scope)" type="text" size="small">发货</el-button>
                        <el-button @click="contentClick(scope)" type="text" size="small">取消</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <h6 class="h6" v-if="totalOne>0">共{{totalOne}}条记录，{{tableList.pages}}页。当前为第{{form.page}}页</h6>
        </div>
        <!-- 分页 -->
        <pagination v-if="totalOne>0" :total="totalOne" :page.sync="form.page" :limit.sync="form.limit"
                    @pagination="getList()" />

    </div>
</template>

<script>
    export default {
        name: "order",
        data() {
            return {
                activeName: 'first',
                form: {
                    page: 1,
                    limit: 10
                },
                options: [{
                    value: '1',
                    label: '待发货'
                }, {
                    value: '3',
                    label: '已发货'
                }, {
                    value: '2',
                    label: '已取消'
                }],
                shzt: '',
                timerData:[],
                dataTime:'',
                dataTime1:'',
                tableData:[],
                tableList:[],
                total:'',
                totalOne:'',
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            change(){
                this.dataTime= this.timerData[0].getTime();
                this.dataTime1= this.timerData[1].getTime();
            },
            contentClick(scope){
                this.$router.push({path: '/basicInformation',query:{}})
            },
            getList() { //初始化
                let data = {
                    user_id:this.user.id,
                    begin_time: this.dataTime,
                    end_time: this.dataTime1,
                    agent_application_id:this.id,//代理商ID
                    myOrder:0,//是否自主开发，0区域交易量代理费,1自主开发交易量
                    pageNum: this.form.page,
                    pageSize: this.form.limit,
                };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.queryAgentOderDetailList,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.tableData=res.data.data;
                        this.total=this.tableData.total;
                        this.dataTime='';
                        this.dataTime1='';
                        this.timer=[];
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        })
                    }else {
                        this.$message({
                            message:res.data.msg,
                            type: 'warning'
                        })
                        this.tableData=[]
                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    })
                    this.tableData=[]
                })
            },
        }
    }
</script>

<style scoped>
    .markingDetails_head{width: 100%;}
    .markingDetails_head ul{overflow: hidden;padding: 0;}
    .markingDetails_head ul li{float: left;overflow: hidden;width: 22%;line-height: 40px;font-size: 16px; }
    .se-pl {margin-right: 10px;}
    .inputes {display: inline-block !important;}
    .h6 {
        padding: 10px 5px;
        font-size: 16px;
    }
</style>