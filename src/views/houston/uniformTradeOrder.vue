<template>
    <div style="padding:20px;">
        <div class="head-ed">
            <ul>
                <li>
                    <div class="block">
                        <div class="inputes">
                            <el-select v-model="time" clearable placeholder="时间类型" style="width: 110px!important;margin-right:10px;">
                                <el-option v-for="item in TimeList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div> 
                        <el-date-picker
                                v-model=" timer"
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
                    <span class="se-pl">支付状态</span>
                    <div class="inputes">
                        <el-select v-model="zffs" clearable placeholder="请选择">
                            <el-option v-for="item in opsedList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <span class="se-pl">订单编号</span>
                    <div class="inputes">
                        <el-input v-model="orderId" placeholder="请输入" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">购买人ID</span>
                    <div class="inputes">
                        <el-input v-model="buyersId" placeholder="请输入" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <el-row class="inputes">
                        <el-button @click="getList()">查询</el-button>
                    </el-row>
					<el-row class="inputes" style="margin-left: 20px;">
					    <el-button @click="reset()">重置</el-button>
					</el-row>
                    <el-row class="inputes" style="margin-left: 10px;">
                        <el-button @click='export2Excel()' type='primary'>导出Excel表</el-button>
                    </el-row>
                </li>
            </ul>
        </div>

        <div>
            <h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
            <el-table 
			:data="tableData.list" 
			v-loading="this.$store.getters.getLoadingBool"
			element-loading-text="拼命加载中..."
			border style="width: 100%">
                <el-table-column prop="shop_name" label="商家名称" width="120">
                </el-table-column>
                <el-table-column prop="product_name" label="商品名称" width="180">
                </el-table-column>
                <el-table-column prop="shopId" label="店铺ID" width="70">
                </el-table-column>
                <el-table-column prop="shop_uid" label="店铺老板ID" width="80">
                </el-table-column>
                <el-table-column prop="shop_uname" label="店铺老板昵称" width="110">
                </el-table-column>
                <el-table-column prop="shop_uname" label="商家ID" width="100">
                </el-table-column>
                <!--<el-table-column prop="shop_uname" label="商家电话" width="110">-->
                <!--</el-table-column>-->
                <el-table-column width="80px" prop="order_id" label="订单ID">
                </el-table-column>
                <el-table-column prop="serial_number" label="订单编号" width="170">
                </el-table-column>
                <el-table-column prop="quantity" label="商品数量" width="80">
                </el-table-column>
                <el-table-column prop="total" label="订单总金额" width="110">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.total||0}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="total_amount" label="用户实付款" width="100">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.total_amount||0}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="total_gwj" label="抵用购物券" width="100">
                </el-table-column>
                <el-table-column prop="total_tc" label="平台抽成收益" width="110">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.total_tc||0}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="payment_state" label="支付状态" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.payment_state==0">支付失败</span>
                        <span v-else-if="scope.row.payment_state==1">支付成功</span>
                        <span v-else-if="scope.row.payment_state==2">待支付</span>
                        <span v-else-if="scope.row.payment_state==3">其它已付款</span>
                        <span v-else-if="scope.row.payment_state==102">申请售后</span>
                    </template>
                </el-table-column>
                <el-table-column prop="payment_channel" label="支付方式" width="80">
                    <template slot-scope="scope">
                    <span v-if="scope.row.payment_channel==1">微信</span>
                    <span v-else-if="scope.row.payment_channel==2">支付宝</span>
                    <span v-else-if="scope.row.payment_channel==3">paypal</span>
                    <span v-else-if="scope.row.payment_channel==4">积分兑换</span>
                    <span v-else-if="scope.row.payment_channel==5">其它</span>
                    <span v-else-if="scope.row.payment_channel==6">微信+积分</span>
                    <span v-else-if="scope.row.payment_channel==7">支付宝+积分</span>
                    <span v-else-if="scope.row.payment_channel==8">微信+搜了贝</span>
                    <span v-else-if="scope.row.payment_channel==9">支付宝+搜了贝</span>
                    <span v-else-if="scope.row.payment_channel==10">购物劵</span>
                    <span v-else-if="scope.row.payment_channel==11">支付宝+购物劵</span>
                    <span v-else-if="scope.row.payment_channel==12">微信+购物劵</span>
                    </template>
                </el-table-column>
                <el-table-column prop="user_id" label="购买人ID" width="80">
                </el-table-column>
                <el-table-column prop="consigneeName" label="收货人姓名" width="100">
                </el-table-column>
                <el-table-column prop="consigneePhone" label="收货人电话" width="110">
                </el-table-column>
                <el-table-column prop="province" label="收货人地址" width="220">
                    <template slot-scope="scope">
                        <span>{{ scope.row.province}}{{ scope.row.city}}{{ scope.row.county}}{{ scope.row.detailed}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="下单时间" width="160">
                </el-table-column>
                <el-table-column prop="confirm_receipt_time" label="收货时间" width="155">
                </el-table-column>
                <el-table-column prop="pay_time" label="支付时间" width="160">
                </el-table-column>
                <el-table-column label="操作" width="60">
                    <template slot-scope="scope">
                        <el-button @click="contentClick(scope)" type="text" size="small" v-if="scope.row.payment_state==2&&scope.row.shipping_state==0&&scope.row.payment_channel==5">确认付款</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
        <div class="p_foot">
            <p class="p_one">查询结果：</p>
            <div class="p_div" v-if="add">
                <p class="p_two">
                    订单总金额：￥{{add.total||0}}
                </p>
                <p class="p_two">
                    平台抽成收益：￥{{add.price||0}}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name:'uniformTradeOrder',
        data() {
            return {
                form: {
                    page: 1,
                    limit: 10
                },
                name: '',
                contact: '',
                buyersId:'',
                timer: [],
                tableData:[],
                add:{},
                total:'',
                dataTime:'',
                dataTime1:'',
                timerData:[],
                dataTime2:'',
                dataTime3:'',
                orderId:'',
                tableList:[],
                time:'',
                TimeList:[
                    {
                        value: '1',
                        label: '订单日期'
                    },
                    {
                        value: '2',
                        label: '支付时间'
                    },
                    {
                        value: '3',
                        label: '收货时间'
                    },
                ],
                opsedList:[
                    {
                        value: '1',
                        label: '支付成功'
                    },
                    {
                        value: '2',
                        label: '待支付'
                    },
                    {
                        value: '3',
                        label: '线下已付款'
                    },
                    {
                        value: '102',
                        label: '申请售后'
                    },
                ],
                zffs:'',
            }
        },
        components: {Pagination},
        mounted() {this.getList();},
        methods: {
            getList() { //初始化
				this.$store.commit('setLoadingBool',true);
                let Time = this.timer;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.dataTime = Start.getTime(); //当前时间转换成long型
                this.dataTime1 = End.getTime()+Number(86399999); //当前时间转换成long型
                if (Time[0] == null) {
                    this.dataTime ='';
                    this.dataTime1 ='';
                }
                var url = this.$local.http + this.$api.yunList;
                if(this.name==''&& this.contact==''&&this.dataTime==''&&this.dataTime1==''&& this.zffs==''&&this.orderId==''&&this.time==''&&this.buyersId==''){
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
                        orderId:'',
                        timeFlg:this.time,
                        serialNumber:this.orderId,
                        userId:this.buyersId,
                        pageNum: this.form.page,
                        pageSize:this.form.limit,
                    }
                }
                this.axios.get(url,{params:params,}).then(data => {
                    let res = data.data;
					this.$store.commit('setLoadingBool',false);
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
                if (Time[0] == null) {this.dataTime ='';this.dataTime1 ='';}
                if(this.name==''&& this.contact==''&&this.dataTime==''&&this.dataTime1==''&& this.zffs==''&&this.orderId==''&&this.time==''&&this.buyersId==''){
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
                        orderId:'',
                        timeFlg:this.time,
                        serialNumber:this.orderId,
                        userId:this.buyersId,
                        pageNum: this.form.page,
                        pageSize:this.total,
                    }
                }
                this.axios({
                    method: "get",
                    url: this.$local.http + this.$api.yunList,
                    params: params,
                }).then(res => {
                    if (res.data.success) {
                        this.tableList=res.data.data.pageInfo.list;
                    }else {
                        this.tableList=[]
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'});
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
                            if (this.tableList[i].payment_state == 0) {
                                this.tableList[i].payment_state = '支付失败'
                            } else if (this.tableList[i].payment_state == 1) {
                                this.tableList[i].payment_state = '支付成功'
                            }else if (this.tableList[i].payment_state == 2) {
                                this.tableList[i].payment_state = '待支付'
                            }else if (this.tableList[i].payment_state == 3) {
                                this.tableList[i].payment_state = '其它已付款'
                            }else if (this.tableList[i].payment_state == 102) {
                                this.tableList[i].payment_state = '申请售后'
                            }
                        }
                        for (var i in this.tableList) {
                            if (this.tableList[i].payment_channel == 1) {
                                this.tableList[i].payment_channel = '微信'
                            } else if (this.tableList[i].payment_channel == 2) {
                                this.tableList[i].payment_channel = '支付宝'
                            }else if (this.tableList[i].payment_channel == 3) {
                                this.tableList[i].payment_channel = 'paypal'
                            }else if (this.tableList[i].payment_channel == 4) {
                                this.tableList[i].payment_channel = '积分兑换'
                            } else if (this.tableList[i].payment_channel == 5) {
                                this.tableList[i].payment_channel = '其它'
                            } else if (this.tableList[i].payment_channel == 6) {
                                this.tableList[i].payment_channel = '微信+积分'
                            }else if (this.tableList[i].payment_channel == 7) {
                                this.tableList[i].payment_channel = '支付宝+积分'
                            } else if (this.tableList[i].payment_channel == 8) {
                                this.tableList[i].payment_channel = '微信+搜了贝'
                            }else if (this.tableList[i].payment_channel == 9) {
                                this.tableList[i].payment_channel = '支付宝+搜了贝'
                            }else if (this.tableList[i].payment_channel == 10) {
                                this.tableList[i].payment_channel = '购物劵'
                            }else if (this.tableList[i].payment_channel == 11) {
                                this.tableList[i].payment_channel = '支付宝+购物劵'
                            }else if (this.tableList[i].payment_channel == 12) {
                                this.tableList[i].payment_channel = '微信+购物劵'
                            }
                        }
                        for (var i in this.tableList) {
                          this.tableList[i].province = this.tableList[i].province+this.tableList[i].city+this.tableList[i].county+this.tableList[i].detailed
                        }
                        const { export_json_to_excel } = require('../../vendor/Export2Excel');
                        const tHeader = ['商家名称','商品名称','店铺ID','店铺老板ID','店铺老板昵称','订单ID','订单编号','商品数量','订单总金额','用户实付款','抵用购物券','平台抽成收益','支付状态','支付方式','购买人ID','收货人姓名', '收货人电话','收货人地址','收货时间','下单时间','支付时间'];
                        const filterVal = ['shop_name','product_name','shopId','shop_uid','shop_uname','order_id','serial_number','quantity','total','total_amount','total_gwj','total_tc','payment_state','payment_channel','user_id','consigneeName','consigneePhone','province','confirm_receipt_time','create_time','pay_time'];
                        const list = this.tableList;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data,'匀贸商城商家订单');
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消导出'
                    });
                });
            },
            contentClick(scope) {
                this.$confirm('确定已收款么？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var user = JSON.parse(sessionStorage.getItem('user'));
                    var currentTime = new Date().getTime()+"";
                    var str1 = currentTime.charAt(6);
                    var str2 = currentTime.charAt(7);
                    var str3 = currentTime.charAt(8);
                    var str4 = currentTime.charAt(5);
                    var secretKey = str1*15 + str2*18 + str3*str4*1518 +"";
                    var secretKeyMd5 = this.$md5(secretKey);
					console.log(secretKey)
                    let data={
                        orderId: scope.row.order_id,
                        loginUserId: user.id,
                        secretKey:secretKeyMd5,
                    };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.ymConfirmOfflinePayment,
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
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'});
                })
              });
            },
			//重置
			reset(){
				// if (!(
				// this.timer[0] == null && 
				// this.time==''  && 
				// this.zffs==''  && 
				// this.orderId==''  && 
				// this.buyersId=='' )) {
					
				// }
				this.time = '';
				this.zffs = '';
				this.orderId = '';
				this.buyersId = '';
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

<style scoped lang="scss">
    .h6 {
        padding: 10px 5px;
        font-size: 16px;
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
        margin-top: 10px;
    }
    .head-ed ul{overflow: hidden;padding: 0;}
    .head-ed ul li{float: left;margin: 15px 1% 0 0;}

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
    /deep/ .el-table th>div {
        padding-left: 5px;
        padding-right: 5px;
        box-sizing: border-box;
        text-overflow: ellipsis;
    }
</style>
