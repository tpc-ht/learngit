<template>
	<!-- 求购转让记录 -->
    <div style="padding: 20px">
        <div class="head-ed">
            <span style="margin-right:25px;">收货人</span>
            <div class="inputes">
                <el-input v-model="tel" clearable placeholder="请输入" style="width:185px;" clearable></el-input>
            </div>
            <span class="se-pl" style="margin-left:38px;">购买类型</span>
            <el-select v-model="shzt" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <div class="inputes" style="margin-left: 20px">
                <div class="block">
                    <span class="demonstration" style="margin-right:10px;">交易时间</span>
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
            </div>
            <span class="f-pl-t">订单创建人ID</span>
            <div class="inputes">
                <el-input v-model="ddid" placeholder="请输入" style="width:220px;"></el-input>
            </div>

        </div>
        <div class="head-ed">
            <span class="se-pl">支付状态</span>
            <el-select v-model="dljb" clearable placeholder="请选择">
                <el-option v-for="item in opsed" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span class="f-pl-t">订单编号</span>
            <div class="inputes">
                <el-input v-model="dlzt" placeholder="请输入" style="width:185px;"></el-input>
            </div>
            <span class="se-pl" style="margin-left: 32px">订单号</span>
            <div class="inputes">
                <el-input v-model="ddh" placeholder="请输入" style="width:220px;"></el-input>
            </div>
            <div class="inputes">
                <div class="block">
                    <span class="demonstration" style="margin-right: 10px;margin-left: 42px;">确认收货时间</span>
                    <el-date-picker
                            v-model="timerData"
                            value-format="timestamp"
                            type="daterange"
                            placeholder="请选择"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                    ></el-date-picker>
                </div>
            </div>
        </div>
        <div class="head-ed">
            <span class="se-pl">支付方式</span>
            <div class="inputes">
                <el-select v-model="zffs" clearable placeholder="请选择">
                    <el-option v-for="item in opsedList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <span class="se-pl" style="margin-left: 40px">当日新订单</span>
            <div class="inputes">
                <el-select v-model="drxdd" clearable placeholder="请选择">
                    <el-option v-for="item in dangriList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-row class="inputes" style="margin-left: 20px">
                <el-button @click="getList()">查询</el-button>
            </el-row>
			<el-row class="inputes" style="margin-left: 20px">
			    <el-button @click="reset()">重置</el-button>
			</el-row>
            <el-row class="inputes" style="margin-left: 20px">
                <el-button @click='export2Excel()' type='primary'>导出Excel表</el-button>
            </el-row>
        </div>

        <div style="margin-top: 15px;">
            <h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
            <el-table
			 :data="tableData.list"
			 v-loading="this.$store.getters.getLoadingBool"
			 element-loading-text="拼命加载中..."
			 border style="width: 100%">
                <el-table-column prop="id" label="订单编号" width="70" align="center">
                </el-table-column>
                <el-table-column prop="serial_number" label="订单号" width="180" align="center">
                </el-table-column>
                <el-table-column prop="user_id" label="订单创建人ID" width="80" align="center">
                </el-table-column>
                <el-table-column prop="create_time" label="交易时间" width="155" align="center">
                </el-table-column>
                <el-table-column prop="confirm_receipt_time" label="确认收货时间" width="155" align="center">
                </el-table-column>
                <el-table-column prop="consigneeName" label="收货人" width="80" align="center">
                </el-table-column>
                <el-table-column prop="consigneePhone" label="联系方式" width="110" align="center">
                </el-table-column>
                <el-table-column prop="harvestAddress" label="收货地址" width="200" align="center">
                </el-table-column>
                <el-table-column prop="level" label="购买类型" width="80" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.remark==1">直接购买</span>
                        <span v-else-if="scope.row.remark==2">求购</span>
                    </template>
                </el-table-column>
                <el-table-column prop="product_id" label="商品信息" width="200" align="center">
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
                        <span v-else-if="scope.row.payment_state==1">支付成功</span>
                        <span v-else-if="scope.row.payment_state==2">待支付</span>
                        <span v-else-if="scope.row.payment_state==3">未支付</span>
                        <span v-else-if="scope.row.payment_state==102">申请售后</span>
                    </template>
                </el-table-column>
                <el-table-column prop="payment_channel" label="支付方式" width="100" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.payment_channel==2">支付宝</span>
                        <span v-else-if="scope.row.payment_channel==1">微信</span>
                        <span v-else-if="scope.row.payment_channel==3">paypal</span>
                        <span v-else-if="scope.row.payment_channel==4">积分兑换</span>
                        <span v-else-if="scope.row.payment_channel==5">线下付款</span>
                        <span v-else-if="scope.row.payment_channel==6">微信+积分</span>
                        <span v-else-if="scope.row.payment_channel==7">支付宝+积分</span>
                        <span v-else-if="scope.row.payment_channel==8">微信+搜了贝</span>
                        <span v-else-if="scope.row.payment_channel==9">支付宝+搜了贝</span>
                    </template>
                </el-table-column>
                <el-table-column prop="total_amount" label="支付金额" width="80" align="center">
                    <template slot-scope="scope">
                        <span>￥{{scope.row.total_amount||0}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="total_integral" width="80px" align="center" label="积分">
                </el-table-column>
                <el-table-column prop="total_slb" width="80px" align="center" label="搜了贝">
                </el-table-column>
                <el-table-column width="150px" align="center" label="收益金额">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.price||0}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="superId" label="上级信息" width="170" align="center">
                    <template slot-scope="scope">
                        <span>上级ID:{{scope.row.superId}}</span><br/>
                        <span>上级姓名:{{scope.row.superName}}</span><br/>
                        <span>上级电话:{{scope.row.superPhone}}</span>
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
                <el-table-column prop="superConfirm" label="上级是否确认" width="80" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.superConfirm==1"><i class="fa fa-check" aria-hidden="true"></i></span>
                        <span v-if="scope.row.superConfirm==0"><i class="fa fa-times" aria-hidden="true"></i></span>
                    </template>
                </el-table-column>
                <el-table-column prop="shop_name" label="操作" width="160">
                    <template slot-scope="scope">
                        <!--<el-button @click="dialogFormShow(scope)" type="text" size="small" v-if="scope.row.payment_state==2">修改订单</el-button>-->
                        <el-button @click="contentClick(scope)" type="text" size="small" v-if="scope.row.payment_state==2">确认付款</el-button>
                        <span style="color: #18c79c;" v-if="scope.row.payment_state==3">未支付</span>
                        <el-button @click="slbClick(scope)" type="text" size="small" v-if="scope.row.shipping_state==2">确认SLB已支付</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList"/>
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
        data() {
            return {
                opt: '',
                form: {
                    page: 1,
                    limit: 10
                },
                options: [
					{ value: '1',label: '直接购买' }, 
					{value: '2',label: '发起求购'},
				],
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
                dangriList: [
                    {
                        value: '1',
                        label: '是'
                    }, {
                        value: '',
                        label: '否'
                    }
                ],
                shzt: '',//购买类型
                name: '',//
                tel: '',//收货人
                timer:[],//交易时间
                dljb: '',//支付状态
                dlzt: '',//订单编号
                ddid:'',//订单创建人ID
                ddh:'',//订单号
                drxdd:'',//当日新订单
                total:'',//总页数
                tableData:[],
                tableList:[],
                dataTime:'',//交易时间戳 开始
                dataTime1:'',//交易时间戳 结束
                dialogFormVisible:false,
                danjia:'',
                shuliang:'',
                id:'',
                timerData:[],//确认收货时间
                dataTime2:'',//确认收货时间戳  开始
                dataTime3:'',//确认收货时间戳 结束
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
        components: {
            Pagination
        },
        mounted() {
            this.getList();
            
        },
        methods: {
            dialogFormShow(scope){
                this.id=scope.row.id;
                this.dialogFormVisible=true;
            },
            getList() { //查询
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
                let TimeData = this.timerData;
                let Start1 = new Date(TimeData[0]);
                let End1 = new Date(TimeData[1]);
                this.dataTime2 = Start1.getTime(); //当前时间转换成long型
                this.dataTime3 = End1.getTime()+Number(86399999); //当前时间转换成long型
                if (TimeData[0] == null) {
                    this.dataTime2 ='';
                    this.dataTime3 ='';
                }
                let params={
                    consigneeName: this.tel,
                    remark: this.shzt,
                    startTime:this.dataTime,
                    endTime:this.dataTime1,
                    payment_state: this.dljb,
                    id: this.dlzt,
                    user_id:this.ddid,
                    startConfirmTime:this.dataTime2,
                    endConfirmTime:this.dataTime3,
                    serial_number:this.ddh,
                    flg:this.zffs,
                    isFirst:this.drxdd,
                    pageNum: this.form.page,
                    pageSize: this.form.limit,
                }
                this.axios({
                    method: "get",
                    url: this.$local.http + this.$api.purchaseTransferRecord,
                    params: params,
                }).then(data => {
                    let res = data.data;
					this.$store.commit('setLoadingBool',false);
                    if (res.success) {
                        this.tableData = res.data;
                        this.total=this.tableData.total;
						this.getData();
                    } else {
                        this.tableData =[];
						this.total=0;
                        this.$message({message: res.msg, type: 'warning'});
                    }
                })
            },
            async getData() {//初始化
				// const loading = this.$loading({lock: true,text: '拼命加载中...',});
                let Time = this.timer;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.dataTime = Start.getTime(); //当前时间转换成long型
                this.dataTime1 = End.getTime()+Number(86399999); //当前时间转换成long型
                if (Time[0] == null) {
                    this.dataTime ='';
                    this.dataTime1 ='';
                }
                let TimeData = this.timerData;
                let Start1 = new Date(TimeData[0]);
                let End1 = new Date(TimeData[1]);
                this.dataTime2 = Start1.getTime(); //当前时间转换成long型
                this.dataTime3 = End1.getTime()+Number(86399999); //当前时间转换成long型
                if (TimeData[0] == null) {
                    this.dataTime2 ='';
                    this.dataTime3 ='';
                }
                let params={
                    consigneeName: this.tel,
                    remark: this.shzt,
                    startTime:this.dataTime,
                    endTime:this.dataTime1,
                    payment_state: this.dljb,
                    id: this.dlzt,
                    user_id:this.ddid,
                    startConfirmTime:this.dataTime2,
                    endConfirmTime:this.dataTime3,
                    serial_number:this.ddh,
                    flg:this.zffs,
                    isFirst:this.drxdd,
                    pageNum: '',
                    pageSize: '',
                }
                let res = await this.axios({
                    method: "get",
                    url: this.$local.http + this.$api.purchaseTransferRecordAll,
                    params: params,
                });
				if (res.data.success) {
				    this.tableList=res.data.data;
					
				}else {
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
                this.$confirm('确定要导出表格数据么？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    
					require.ensure([], () => {
					    for (var i in this.tableList) {
					        if (this.tableList[i].remark == 1) {
					            this.tableList[i].remark = '直接购买'
					        } else if (this.tableList[i].remark == 2) {
					            this.tableList[i].remark = '求购'
					        }
					    }
					    for (var j in this.tableList) {
					         if(this.tableList[j].payment_state==0){
					            this.tableList[j].payment_state='支付失败';
					        }else if(this.tableList[j].payment_state==1){
					            this.tableList[j].payment_state='支付成功'
					        }else if(this.tableList[j].payment_state==2){
					            this.tableList[j].payment_state='待支付'
					        }else if(this.tableList[j].payment_state==102){
					            this.tableList[j].payment_state='申请售后'
					        }else if(this.tableList[j].payment_state==3){
					             this.tableList[j].payment_state='未支付'
					         }
					    }
					    for (var i in this.tableList) {
					       if(this.tableList[i].payment_channel==1){
					            this.tableList[i].payment_channel='微信'
					        }else if(this.tableList[i].payment_channel==2){
					            this.tableList[i].payment_channel='支付宝'
					        }else if(this.tableList[i].payment_channel==3){
					            this.tableList[i].payment_channel='paypal'
					        }else if(this.tableList[i].payment_channel==4){
					           this.tableList[i].payment_channel='积分兑换'
					       }else if(this.tableList[i].payment_channel==5){
					           this.tableList[i].payment_channel='线下付款'
					       }else if(this.tableList[i].payment_channel==6){
					           this.tableList[i].payment_channel='微信+积分'
					       }else if(this.tableList[i].payment_channel==7){
					           this.tableList[i].payment_channel='支付宝+积分'
					       }else if(this.tableList[i].payment_channel==8){
					           this.tableList[i].payment_channel='微信+搜了贝'
					       }else if(this.tableList[i].payment_channel==9){
					           this.tableList[i].payment_channel='支付宝+搜了贝'
					       }
					    }
					    for (var i in this.tableList) {
					        if(this.tableList[i].superConfirm==1){
					            this.tableList[i].superConfirm='确认'
					        }else if(this.tableList[i].superConfirm==0){
					            this.tableList[i].superConfirm='没有确认'
					        }
					    }
					    for (var i in this.tableList) {
					        if(this.tableList[i].platformDelivery==0){
					            this.tableList[i].platformDelivery='已发货'
					        }else if(this.tableList[i].platformDelivery==1){
					            this.tableList[i].platformDelivery='没有发货'
					        }
					    }
					    for (var i in this.tableList) {
					        if(this.tableList[i].isGoods==0){
					            this.tableList[i].isGoods='确认收货'
					        }else if(this.tableList[i].isGoods==1){
					            this.tableList[i].isGoods='没有确认收货'
					        }
					    }
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['订单编号','订单号','订单创建人ID','交易时间','确认收货时间','收货人','联系方式','收货地址',
					        '购买类型','商品ID','商品名字','购买数量','支付状态','支付方式','支付金额','积分','搜了贝',
					        '上级ID','上级名字','上级电话','上级是否确认','平台是否发货','用户是否确认收货'
					    ];
					    const filterVal = ['id','serial_number','user_id','create_time','confirm_receipt_time','consigneeName','consigneePhone','harvestAddress',
					        'remark','product_id','product_name','quantity','payment_state','payment_channel','total_amount','total_integral','total_slb',
					         'superId','superName','superPhone','superConfirm','platformDelivery','isGoods'
					    ];
					    const list = this.tableList;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data,'求购转让记录列表');
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
				// this.timerData[0] == null && 
				// this.tel=='' && 
				// this.shzt=='' && 
				// this.ddid=='' && 
				// this.dljb=='' && 
				// this.dlzt=='' && 
				// this.ddh=='' && 
				// this.zffs=='' && 
				// this.drxdd=='')) {
					
				// }
				this.tel =
				this.drxdd = 
				this.shzt = 
				this.ddid = 
				this.dljb = 
				this.dlzt = 
				this.ddh = 
				this.zffs = ''
				this.timer = this.timerData = [null,null]
				
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
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
                        }
                    }).catch(res=>{
                        this.$message({message:res.data.msg, type: 'error'});
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
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'});
                })
            },
            //确认SLB已支付
            slbClick(scope){
                this.$confirm('确定要确认SLB支付吗？?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var user = JSON.parse(sessionStorage.getItem('user'));
                    let data = {
                        order_id: scope.row.id,
                        login_user_id: user.id,
                    };
                    this.axios({
                        method: "post",
                        url: this.$local.http + this.$api.confirmPaySlb,
                        data: qs.stringify(data),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(res => {
                        if (res.data.success) {
                            // this.$notify({title:'成功', message: res.data.msg, type: 'success'});
                             this.$message({message:res.data.msg, type: 'success'});
                            this.getList();
                        } else {
                            this.$message({message: res.data.msg, type: 'warning'});
                        }
                    }).catch(res => {
                        this.$message({message: res.data.msg, type: 'error'});
                    })
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
