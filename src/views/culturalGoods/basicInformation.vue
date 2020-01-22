<template>
    <div class="markingDetails">
        <div class="markingDetails_head">
            <ul>
                <li>
                    <p class="markingDetails_head_left">订单号码：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">订单状态：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">联系方式：</p>
                    <p class="markingDetails_head_right">良田急租年付5000起</p>
                </li>
                <li>
                    <p class="markingDetails_head_left">下单时间：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">搜了农庄用户名：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">付款时间：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">支付方式：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">发货时间：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">运输费用：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">在本店购买次数：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">送货地址：</p>
                    <p class="markingDetails_head_right"></p>
                </li>

            </ul>
            <div>
                <img src=""/>
            </div>
        </div>
        <div class="title">
            <h6 class="h6">买家留言：</h6>
            <p class="h6_right">

            </p>
        </div>
        <div class="title">
            <h6 class="h6">商品信息：</h6>
            <el-table :data="tableList.list" border style="width: 100%">
                <el-table-column prop="serial_number" label="商品名称" width="220">
                </el-table-column>
                <el-table-column prop="payment_state" label="商品号" width="110">
                </el-table-column>
                <el-table-column prop="payment_channel" label="订单类型" width="110">
                </el-table-column>
                <el-table-column prop="create_time" label="价格" width="110">
                </el-table-column>
                <el-table-column prop="nick_name" label="数量" width="110">
                </el-table-column>
                <el-table-column prop="shop_name" label="规格" width="110">
                </el-table-column>
                <el-table-column prop="product_name" label="库存" width="110">
                </el-table-column>
                <el-table-column prop="user_name" label="小记" width="110">
                </el-table-column>
                <p class="tab_p">合计：</p>
            </el-table>

        </div>
        <div class="title">
            <h6>费用信息：</h6>
            <ul class="foot_li">
                <li>
                    <p>订单总金额：</p>
                    <p>元</p>
                </li>
                <li>
                    <p>运费：</p>
                    <p>元</p>
                </li>
                <li>
                    <p>订单应付金额：</p>
                    <p>元</p>
                </li>
            </ul>
            <el-row class="inputes">
                <el-button @click="toLink()">返回</el-button>
            </el-row>
        </div>

    </div>
</template>

<script>
    export default {
        name: "basicInformation",
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
            toLink(){
                this.$router.go(-1);
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
    .markingDetails_head{width: 100%;overflow: hidden}
    .markingDetails_head ul{overflow: hidden;padding: 0;float: left;width: 70%;}
    .markingDetails_head ul li{float: left;overflow: hidden;width: 50%;line-height: 40px;font-size: 16px; }
    .markingDetails_head_left{float: left;text-align: left;color: #333333;padding-right: 10px;}
    .markingDetails_head_right{float: left;text-align: left;color: #666666;}
    .markingDetails_head div{float: left;width: 30%;}
    .markingDetails_head div img{width: 280px;height: 200px;}
    .title{overflow: hidden;}
    .h6 {float: left;padding: 10px 5px;font-size: 16px;}
     h6 {padding: 10px 5px;font-size: 16px;}
    .h6_right{margin-bottom: 10px;margin-left: 15px;float: left;}
    .foot_li{padding: 0;}
    .foot_li li{overflow: hidden;line-height: 30px;}
    .foot_li li p:nth-child(1){float: left;width: 90%;text-align: right;}
    .foot_li li p:nth-child(2){float: left;width: 10%;text-align: left;}
    .inputes{text-align: right;}
    .tab_p{text-align: right;padding-right: 10px;}
</style>