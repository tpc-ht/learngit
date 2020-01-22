<template>
	<!-- 匀贸消费分润 -->
    <div class="app-container">
        <div class="head-ed">
            <ul>
                <li>
                    <div class="block">
                        <span class="se-pl" style="margin-right:10px;">确认收货时间</span>
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
                <span class="se-pl">结款人ID</span>
                <div class="inputes">
                <el-input placeholder="请输入" v-model="jkrid" clearable style="width:185px;"></el-input>
                </div>
                </li>
                <li>
                <li>
                    <span class="se-pl">消费者ID</span>
                    <div class="inputes">
                        <el-input placeholder="请输入" v-model="xdrid" clearable style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                <li>
                    <span class="se-pl">订单编号</span>
                    <div class="inputes">
                        <el-input placeholder="请输入" v-model="name" clearable style="width:185px;"></el-input>
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
					<span class="se-pl">备注</span>
					<div class="inputes">
						
						<el-select v-model="remark" clearable placeholder="请选择">
							<el-option v-for="item in remarks" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
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
       <!-- <el-table 
		:data="initData.list" 
		border fit highlight-current-row 
		style="width: 100%"
		> -->
		<el-table 
		:data="initData.list" 
		border fit highlight-current-row 
		style="width: 100%"
		ref="multipleTable"
		tooltip-effect="dark"
		@selection-change="handleSelectionChange"
		v-loading="this.$store.getters.getLoadingBool"
		element-loading-text="拼命加载中..."
		>
			<el-table-column
			  type="selection"
			  width="55"
			  :selectable="checkSelectable">
			</el-table-column>
			
			<el-table-column width="60px" align="center" label="列表ID">
            <template slot-scope="scope">
            <span>{{scope.row.buyRoyaltyId}}</span>
            </template>
            </el-table-column>
            <el-table-column width="70px" align="center" label="结款人id">
                <template slot-scope="scope">
                    <span>{{scope.row.user_id}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="结款人姓名">
                <template slot-scope="scope">
                    <span>{{scope.row.real_name}}</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="结款人银行卡">
                <template slot-scope="scope">
                    <span>{{scope.row.bank_card}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="结款人支行" width="200px">
                <template slot-scope="scope">
                    <span>{{ scope.row.open_branch_bank}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="结款人电话" width="110px">
                <template slot-scope="scope">
                    <span>{{ scope.row.phone }}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="消费者id">
                <template slot-scope="scope">
                    <span>{{ scope.row.buyUserId }}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="消费者姓名">
                <template slot-scope="scope">
                    <span>{{ scope.row.buyUserNickName }}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="消费者电话">
                <template slot-scope="scope">
                    <span>{{ scope.row.buyPhone }}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="订单id">
                <template slot-scope="scope">
                    <span>{{ scope.row.order_id }}</span>
                </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="商品名称">
                <template slot-scope="scope">
                    <span>{{ scope.row.product_name }}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="订单总金额">
                <template slot-scope="scope">
                    <span>{{ scope.row.total_amount }}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="提成比例">
                <template slot-scope="scope">
                    <span>{{ scope.row.royalty_rate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="应提成金额">
                <template slot-scope="scope">
                    <span >￥{{ scope.row.royalty}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="备注">
                <template slot-scope="scope">
                    <span>{{ scope.row.remark}}</span>
                </template>
            </el-table-column>
            <el-table-column width="90px" align="center" label="确认收货时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.created_at}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="结款状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.payment_state==0">未结款</span>
                    <span v-if="scope.row.payment_state==1">已结款</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="财务打款人id">
                <template slot-scope="scope">
                    <span>{{ scope.row.recorder_id}}</span>
                </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="实际结款金额">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.payment_money}}</span>
                </template>
            </el-table-column>
            <el-table-column width="90px" align="center" label="结款时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.payment_at}}</span>
                </template>
            </el-table-column>
            <el-table-column width="60px" align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type="success" size="small" @click="dialogFormShow(scope.row)" v-if="scope.row.payment_state==0">结款</el-button>
                </template>
            </el-table-column>
        </el-table>
		
		<!-- <div style="margin-top: 20px" v-show=""> -->
		<div style="margin-top: 20px">
		    <el-button @click="toggleSelection()" :disabled='multipleSelection.length===0'>确认打款</el-button>
			<h6 style="display: inline-block;" class="h6" v-if="total>0">
			共累计 ￥{{totalMoney1}} 提成，当前选择 {{multipleSelection.length}} 条数据, ￥{{totalMoney2}} 提成
			</h6>
		</div>
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
        
		<!-- 废弃 -->
		<!-- <el-dialog title="结款" :visible.sync="dialogFormVisible" width="30%" center>
            <el-form :model="formData">
                <el-form-item label="结款金额" :label-width="formLabelWidth">
                    <el-input v-model="formData.pay_money" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogForm()">确 定</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        components: { Pagination },
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    page: 1,
                    limit: 10
                },
                money:'',
                agentCreateTime:'',
                endtime:'',
                name:'',
                order_id:'',
                orderId:'',
                jkrid:'',
                xdrid:'',
                timer: [],
                formLabelWidth: '120px',
                inList:[],
                initData:[],
                total:'',
                opsed: [{
                    value: '',
                    label: '全部'
                },{
                    value: '0',
                    label: '未结款'
                }, {
                    value: '1',
                    label: '已结款'
                }],
				remark:'',
				remarks: [{
				    value: '',
				    label: '全部'
				},{
				    value: '0',
				    label: '符合提成1%'
				}],
                tableList:[],
                pickerOptions: {
                    // disabledDate是一个函数,参数是当前选中的日期值,这个函数需要返回一个Boolean值,
                    disabledDate: (time) => {
                        // 如果函数处理比较简单,可以直接在这里写逻辑方法
                        // return time.getTime() < Date.now() - 8.64e7
                        // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
                        return this.dealDisabledDate(time)
                    }
                }, // 日期设置对象
				multipleSelection:[],//选中数据
				tableDataList:[],//需要提交的列表id
				// pitchCount:0,//选中数量
				totalMoney1:0,//总提成
				totalMoney2:0,//选中提成
            }
        },
        created () {

        },
        mounted() {
            this.getList();
        },
        methods: {
            dialogFormShow(row){
                // this.id=row.buyRoyaltyId;
				const formDatas=new FormData();
				formDatas.append('buyRoyaltyIdList',`[${row.buyRoyaltyId}]`);
				this.axios({
				    method: "post",
				    url: this.$local.http + this.$api.buySuperiorPaymentAll,
				    data: formDatas,
				}).then(res => {
				    if (res.data.success) {
				        this.$message({message: res.data.msg, type: 'success'});
				        this.getList();
				    } else {
				        this.$message({message: res.data.msg, type: 'warning'});
				    }
				})
                // this.dialogFormVisible=true;
            },
			checkSelectable(row){
				return row.payment_state==0
			},
			//处理浮点数相加
			toDecimal(x) {
				var val = Number(x)
				if(!isNaN(parseFloat(val))) {
					val = val.toFixed(2);
				}
				return Number(val);
			},
            // 单独处理时间的函数
            dealDisabledDate (time) {
                // time.getTime是把选中的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
                // Date.now()是把今天的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数,这样比较好比较
                // return的值,true是不可以操作选择,false可以操作选择,比如下面这个判断就只能选择今天之后的时间
                return time.getTime() <  Date.now()- 8.64e7
                // 这里减8.64e7的作用是,让今天的日期可以选择,如果不减的话,今天的日期就不可以选择,判断中写<= 也是没用的,一天的毫秒数就是8.64e7
                // return time.getTime() <= Date.now()
                // return time.getTime() < Date.now() - 8.64e7
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
                    paymentState:this.money,
                    orderId:this.name,
                    confirmBeginTime:this.agentCreateTime,
                    confirmEndTime:this.endtime,
                    buySuperiorId:this.jkrid,
                    buyUserId:this.xdrid,
                    pageNum: this.form.page,
                    pageSize:this.form.limit,
					royaltyCondition:this.remark
                };
                this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.buySuperiorPaymentList,
                    data: qs.stringify(data),
                }).then(res=>{
					this.$store.commit('setLoadingBool',false);
                    if (res.data.success) {
                        this.initData=res.data.data;
                        this.total=this.initData.total;
                        this.inList=res.data.data.add;
						this.multipleSelection = [];
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
                    paymentState:this.money,
                    orderId:this.name,
                    confirmBeginTime:this.agentCreateTime,
                    confirmEndTime:this.endtime,
                    buySuperiorId:this.jkrid,
                    buyUserId:this.xdrid,
                    pageNum: this.form.page,
                    pageSize:this.total,
					royaltyCondition:this.remark
                };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.buySuperiorPaymentList,
                    data: qs.stringify(data),
                }).then(res => {
                    if (res.data.success) {
                        this.tableList=res.data.data.list;
						let m = 0;
						res.data.data.list.forEach(item=>{
							m += item.royalty;
						})
						this.totalMoney1 =this.toDecimal(m);
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
			toggleSelection(row) {
				const formDatas=new FormData();
				formDatas.append('buyRoyaltyIdList',JSON.stringify(this.tableDataList));
				this.axios({
				    method: "post",
				    url: this.$local.http + this.$api.buySuperiorPaymentAll,
				    data: formDatas,
				}).then(res => {
				    if (res.data.success) {
				        this.$message({message: res.data.msg, type: 'success'});
				        this.getList();
				    } else {
				        this.$message({message: res.data.msg, type: 'warning'});
				    }
				})
			},
			//列表多选
			handleSelectionChange(val) {
				if(val.length===0)this.totalMoney3=0;
				this.multipleSelection = val;
				let arr = [];
				let m = 0;
				val.map(item => {
					arr.push(item.buyRoyaltyId);
					m += item.royalty;
				});
				this.totalMoney2 =this.toDecimal(m);
				this.tableDataList = arr;
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
                            if (this.tableList[i].payment_state == 0) {
                                this.tableList[i].payment_state = '未结款'
                            } else if (this.tableList[i].payment_state == 1) {
                                this.tableList[i].payment_state = '已结款'
                            }
                        }
                        const { export_json_to_excel } = require('../../vendor/Export2Excel');
                        const tHeader = ['列表ID','结款人id','结款人姓名','结款人银行卡','结款人支行','结款人电话','消费者id','消费者姓名','消费者电话','订单id','商品名称','订单总金额','提成比例',
                        '应提成金额','备注','确认收货时间','结款状态','财务打款人id','实际结款金额','结款时间'];
                        const filterVal = ['buyRoyaltyId','user_id','real_name','bank_card','open_branch_bank','phone','buyUserId','buyUserNickName','buyPhone','order_id','product_name','total_amount',
                            'royalty_rate','royalty','remark','created_at','payment_state','recorder_id','payment_money','payment_at'];
                        const list = this.tableList;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data,'匀贸消费分润');
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
				// this.remark=='' && 
				// this.money=='' && 
				// this.name=='' && 
				// this.xdrid=='' && 
				// this.jkrid=='' )) {
					
				// }
				this.remark = '';
				this.money = '';
				this.name = '';
				this.xdrid = '';
				this.jkrid = '';
				this.timer = [null,null];
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
            //缴费进账----废弃
    //         dialogForm(){
				// let this_ = this;
    //             var user = JSON.parse(sessionStorage.getItem('user'));
    //             var data={
    //                 loginUserId:user.id,
    //                 buyRoyaltyId:this_.id,
    //                 paymentMoney:this_.formData.pay_money,
    //             };
    //             this.axios({
    //                 method: "POST",
    //                 url: this.$local.http+this.$api.buySuperiorPayment,
    //                 data:qs.stringify(data),
    //             }).then(res=>{
    //                 if (res.data.success) {
    //                     this.dialogFormVisible=false;
    //                     this.$message({message:res.data.msg, type: 'success'});
    //                     this.getList()
    //                 }else {
    //                     this.$message({message:res.data.msg, type: 'error'})
    //                 }
    //             }).catch(res=>{
    //                 this.$message({message:res.data.msg, type: 'error'})
    //             })
    //         },
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
