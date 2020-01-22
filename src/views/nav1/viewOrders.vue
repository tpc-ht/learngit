<template>
    <div style="padding: 20px">
    <div style="margin-top: 15px;">
        <h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
        <el-table :data="tableData.list" border style="width: 100%">
            <el-table-column prop="id" label="订单编号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="serial_number" label="订单号" width="200" align="center">
            </el-table-column>
            <el-table-column prop="user_id" label="订单创建人ID" width="120" align="center">
            </el-table-column>
            <el-table-column prop="create_time" label="交易时间" width="160" align="center">
            </el-table-column>
            <el-table-column prop="confirm_receipt_time" label="确认收货时间" width="160" align="center">
            </el-table-column>
            <el-table-column prop="consigneeName" label="收货人" width="80" align="center">
            </el-table-column>
            <el-table-column prop="consigneePhone" label="联系方式" width="120" align="center">
            </el-table-column>
            <el-table-column prop="harvestAddress" label="收货地址" width="300" align="center">
            </el-table-column>
            <el-table-column prop="level" label="购买类型" width="80" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.remark==1">直接购买</span>
                    <span v-else-if="scope.row.remark==2">求购</span>
                </template>
            </el-table-column>
            <el-table-column prop="product_id" label="商品信息" width="300" align="center">
                <template slot-scope="scope">
                    <span>商品ID:{{scope.row.product_id}}</span><br/>
                    <span>商品名称:{{scope.row.product_name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="quantity" label="购买数量" width="80" align="center">
            </el-table-column>
            <el-table-column prop="payment_state" label="支付状态" width="80" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.payment_state==0">支付失败</span>
                    <span v-if="scope.row.payment_state==1">支付成功</span>
                    <span v-if="scope.row.payment_state==2">待支付</span>
                    <span v-if="scope.row.payment_state==3">未支付</span>
                    <span v-if="scope.row.payment_state==102">申请售后</span>
                </template>
            </el-table-column>
            <el-table-column prop="payment_channel" label="支付方式" width="80" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.payment_channel==2">支付宝</span>
                    <span v-if="scope.row.payment_channel==1">微信</span>
                    <span v-else-if="scope.row.payment_channel==3">paypal</span>
                </template>
            </el-table-column>
            <el-table-column prop="total_amount" label="支付金额" width="80" align="center">
                <template slot-scope="scope">
                    <span>￥{{scope.row.total_amount||0}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="superId" label="上级信息" width="200" align="center">
                <template slot-scope="scope">
                    <span>上级ID:{{scope.row.superId}}</span><br/>
                    <span>上级姓名:{{scope.row.superName}}</span><br/>
                    <span>上级电话:{{scope.row.superPhone}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="superConfirm" label="上级是否确认" width="80" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.superConfirm==0"><i class="fa fa-check" aria-hidden="true"></i></span>
                    <span v-if="scope.row.superConfirm==1"><i class="fa fa-times" aria-hidden="true"></i></span>
                </template>
            </el-table-column>
            <el-table-column prop="platformDelivery" label="平台是否发货" width="80" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.platformDelivery==0"><i class="fa fa-check" aria-hidden="true"></i></span>
                    <span v-if="scope.row.platformDelivery==1"><i class="fa fa-times" aria-hidden="true"></i></span>
                </template>
            </el-table-column>
            <el-table-column prop="isGoods" label="用户是否确认收货" width="80" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.isGoods==0"><i class="fa fa-check" aria-hidden="true"></i></span>
                    <span v-if="scope.row.isGoods==1"><i class="fa fa-times" aria-hidden="true"></i></span>
                </template>
            </el-table-column>
            <el-table-column prop="shop_name" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="dialogFormShow(scope)" type="text" size="small" v-if="scope.row.payment_state==2">修改订单</el-button>
                    <el-button @click="contentClick(scope)" type="text" size="small" v-if="scope.row.payment_state==2">确认付款</el-button>
                    <span style="color: #18c79c;" v-if="scope.row.payment_state==3">未支付</span>

                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- 分页 -->
    <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
        <el-dialog title="修改订单" :visible.sync="dialogFormVisible">
            <ul class="dialog_ul">
                <li>
                    <p>单价：</p>
                    <el-input v-model="danjia" placeholder="请输入" style="width:185px;"></el-input>
                </li>
                <li>
                    <p>数量：</p>
                    <el-input v-model="shuliang" placeholder="请输入" style="width:185px;"></el-input>
                </li>

            </ul>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogForm()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name: "viewOrders",
        data() {
            return {
                opt: '',
                form: {
                    page: 1,
                    limit: 10
                },
                options: [{
                    value: '1',
                    label: '直接购买'
                }, {
                    value: '2',
                    label: '发起求购'
                }],
                opsed: [{
                    value: '0',
                    label: '支付失败'
                },
                    {
                        value: '1',
                        label: '支付成功'
                    }, {
                        value: '2',
                        label: '待支付'
                    }, {
                        value: '102',
                        label: '申请售后'
                    },
                    {
                        value: '3',
                        label: '未支付'
                    },

                ],
                shzt: '',
                name: '',
                tel: '',
                timer:[],
                dljb: '',
                dlzt: '',
                ddid:'',
                ddh:'',
                total:'',
                tableData:[],
                tableList:[],
                dataTime:'',
                dataTime1:'',
                serial_number:this.$route.query.serial_number,
                dialogFormVisible:false,
                danjia:'',
                shuliang:'',
                id:'',
            }
        },
        components: {Pagination},
        mounted() {
            this.getList();
        },
        methods: {
            dialogFormShow(scope){
                this.id=scope.row.id;
                this.dialogFormVisible=true;
            },
            //时间
            change() {
                this.dataTime= this.timer[0].getTime();
                this.dataTime1= this.timer[1].getTime();
            },
            getList() { //查询
                let params={
                    consigneeName: this.tel,
                    remark: this.shzt,
                    startTime:this.dataTime,
                    endTime:this.dataTime1,
                    payment_state: this.dljb,
                    id: this.dlzt,
                    user_id:this.ddid,
                    serial_number:this.ddh||this.serial_number,
                    pageNum: this.form.page,
                    pageSize: this.form.limit,
                }
                this.axios({
                    method: "get",
                    url: this.$local.http + this.$api.purchaseTransferRecord,
                    params: params,
                }).then(data => {
                    let res = data.data;
                    if (res.success) {
                        this.$message({message: res.msg, type: 'success'});
                        this.tableData = res.data;
                        this.total=this.tableData.total;
                    } else {
                        this.tableData =[];
                        this.$message({message: res.msg, type: 'warning'});
                    }
                })
            },
            //确认付款
            contentClick(scope){
                this.$confirm('确认付款吗？','提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var user = JSON.parse(sessionStorage.getItem('user'));
                    let data = {
                        orderId:scope.row.id,
                        userId:user.id,
                    };
                    this.axios({
                        method: "post",
                        url: this.$local.http + this.$api.confirmWjsOrder,
                        data: qs.stringify(data),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(res => {
                        if (res.data.success) {
                            this.$message({message:res.data.msg, type: 'success'});
                            this.getList();
                        }else {
                            this.$message({message:res.data.msg, type: 'warning'});
                            this.tableList=[]
                        }
                    }).catch(res=>{
                        this.$message({message:res.data.msg, type: 'error'});
                        this.tableList=[]
                    })
                })

            },
            dialogForm(){
                var user = JSON.parse(sessionStorage.getItem('user'));
                let data = {
                    order_id:this.id,
                    login_user_id:user.id,
                    price:this.danjia,
                    quantity:this.shuliang,
                };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.updateWjsOrder,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.$message({message:res.data.msg, type: 'success'});
                        this.dialogFormVisible=false;
                        this.getList();
                    }else {
                        this.$message({message:res.data.msg, type: 'warning'});
                        this.tableData=[]
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'});
                    this.tableData=[]
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .conDiv{font-size: 14px;color: #000;}
    .h6{float: left;padding: 10px 5px;font-size: 16px;}
    .h6_right{text-align: right;float: right;margin-bottom: 10px;}
    .inputes {display: inline-block !important;}
    .sp-df {margin-left: 40px;margin-right: 10px;}
    .se-pl {margin-right: 10px;}
    .head-ed {margin-top: 10px;}
    .el-select {width: 185px !important;}
    .se-pl-t {margin-right: 10px;margin-left: 12px;}
    .f-pl-t {margin-right: 10px;margin-left: 40px;}
    .sed-font {height: 30px;line-height: 30px;position: relative;top: 20px;}
    .sed-font-t {margin-bottom: 45px;height: 30px;}
    .sed-font-t>div {float: left;}
    .fen-df {margin-top: 20px;}
    .dialog_ul{overflow: hidden;}
    .dialog_ul li{float: left;width: 30%;line-height: 30px;font-size: 14px;overflow: hidden;}
    .dialog_ul li p{padding-right: 10px;float: left;}
    .dialog_ul li div{padding-right: 10px;float: left;}
</style>