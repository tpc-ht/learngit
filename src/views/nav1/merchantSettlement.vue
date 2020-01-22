<template>
	<!-- 商户结算 -->
    <div style="padding:20px;">
        <div class="head-ed">
            <ul>
                <li>
                    <span class="se-pl">店铺ID</span>
                    <div class="inputes">
                        <el-input v-model="userId" placeholder="请输入" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">商家联系方式</span>
                    <div class="inputes">
                        <el-input v-model="phone" placeholder="请输入" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">订单ID</span>
                    <div class="inputes">
                        <el-input v-model="name" placeholder="请输入" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="demonstration" style="margin-right:10px;">收货时间</span>
                    <el-date-picker
                            v-model="timer"
                            value-format="timestamp"
                            type="daterange"
                            placeholder="请选择"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                    ></el-date-picker>
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
        <div>
            <h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
            <el-table :data="tableData.list" border style="width: 100%"
                      ref="multipleTable"
                      tooltip-effect="dark"
					  v-loading="this.$store.getters.getLoadingBool"
					  element-loading-text="拼命加载中..."
                      @selection-change="handleSelectionChange">
                <el-table-column 
					type="selection" 
					width="55" 
					:selectable="checkSelectable"
					class="qwe"
				>
                </el-table-column>
                <el-table-column prop="confirm_receipt_time" label="收货时间" width="160">
                </el-table-column>
                <el-table-column prop="shop_name" label="商家名称" width="160">
                </el-table-column>
                <el-table-column prop="shop_phone" label="商家联系方式" width="110">
                </el-table-column>
                <el-table-column prop="bank_card" label="商家银行卡号" width="160">
                </el-table-column>
                <el-table-column prop="open_branch_bank" label="商家开户行" width="300">
                </el-table-column>
                <el-table-column prop="shop_id" label="店铺ID" width="80">
                </el-table-column>
                <el-table-column prop="order_id" label="订单ID" width="80">
                </el-table-column>
                <el-table-column prop="order_price" label="订单金额" width="120">
                    <template slot-scope="scope">
                        <span>￥{{scope.row.order_price||0}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="platformPrice" label="平台抽成" width="100">
                </el-table-column>
                <el-table-column prop="should_price" label="应付金额" width="120">
                </el-table-column>
                <el-table-column prop="actual_price" label="结款金额" width="100">
                </el-table-column>
                <el-table-column prop="pay_time" label="结款时间" width="160">
                </el-table-column>
                <el-table-column prop="pay_status" label="结款状态" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.pay_status==0">未结款</span>
                        <span v-if="scope.row.pay_status==1">已结款</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="60">
                    <template slot-scope="scope">
                        <el-button @click="dialogForm(scope)" type="text" size="small" v-if="scope.row.pay_status==0">打款</el-button>
                    </template>
                </el-table-column>

            </el-table>
           <!-- <div style="margin-top: 20px" v-if="toggle">
                <el-button @click="toggleSelection()">确认打款</el-button>
            </div>
			 background: #1313;
			 -->
			<div style="margin-top: 20px">
			    <el-button @click="toggleSelection()" :disabled='multipleSelection.length<=0'>确认打款</el-button>
				<h6 style="display: inline-block;" class="h6" v-if="total>0">
				共累计应付金额 ￥{{totalMoney1}} ，当前选中 {{multipleSelection.length}} 条数据, 应付金额 ￥{{totalMoney2}}
				</h6>
			</div>    
        </div>
        <!-- 分页 -->
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name: "merchantSettlement",
        data() {
            return {
                form: {
                    page: 1,
                    limit: 10
                },
                name: '',
                phone:'',
                tableData: '',
                add:{},
                total:'',
                tableList:[],
                opsedList:[
                    {
                        value: '0',
                        label: '已结清'
                    },
                    {
                        value: '1',
                        label: '未结清'
                    },
                ],
                timer:[],
                dataTime:'',
                dataTime1:'',
                zffs:'',
                danjia:'',
                id:'',
                userId:'',
                multipleSelection: [],
                tableDataList:[],
                toggle:false,
				totalMoney1:0,//总提成
				totalMoney2:0,//选中提成
            }
        },
        components: {Pagination},
        mounted() {
            this.getList();
        },
        methods: {
            toggleSelection(rows) {
                const formDatas=new FormData();
                formDatas.append('paymentIdList',this.tableDataList);
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.shopPayment,
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
			//是否打款
			checkSelectable(row){
				return row.pay_status===0;
			},
			//处理浮点数相加
			toDecimal(x) {
				var val = Number(x)
				if(!isNaN(parseFloat(val))) {
					val = val.toFixed(2);
				}
				return Number(val);
			},
            handleSelectionChange(val) {
                this.tableDataList=[];
                if(val.length==0){
                    this.toggle=false;
					this.totalMoney2=0;
                }else {
                    this.toggle=true;
                    this.multipleSelection = val;
                    let arr = [];
					let m = 0;
					
                    this.multipleSelection.map(v => {
                        let obj = {};
                        obj.id = v.payment_id;  
                        arr.push(v.payment_id)
						m += v.should_price;
                    });
					this.totalMoney2 =this.toDecimal(m);
                    this.tableDataList = [...arr];
                    this.tableDataList = JSON.stringify(this.tableDataList)
                }
            },
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
                var data={
                    shopId:this.userId,
                    orderId: this.name,
                    shopPhone:this.phone,
                    confirmBeginTime:this.dataTime,
                    confirmEndTime:this.dataTime1,
                    pageNum: this.form.page,
                    pageSize:this.form.limit,
                };
				
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.shopPaymentList,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(data => {
                    let res = data.data;
					this.$store.commit('setLoadingBool',false);
                    if(res.success){
                        this.tableData = res.data;
                        this.total=this.tableData.total;
						this.multipleSelection = [];
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
                this.dataTime1 = End.getTime()+Number(86399999); //当前时间转换成long型
                if (Time[0] == null) {
                    this.dataTime ='';
                    this.dataTime1 ='';
                }
                var data={
                    shopId:this.userId,
                    orderId: this.name,
                    shopPhone:this.phone,
                    confirmBeginTime:this.dataTime,
                    confirmEndTime:this.dataTime1,
                    pageNum: this.form.page,
                    pageSize:this.total,

                }
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.shopPaymentList,
                    data: qs.stringify(data),
                }).then(res => {
                    if (res.data.success) {
                        this.tableList=res.data.data.list;
						let m = 0;
						res.data.data.list.forEach(item=>{
							m += item.should_price;
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
                            if (this.tableList[i].pay_status == 0) {
                                this.tableList[i].pay_status = '未结款'
                            } else if (this.tableList[i].pay_status == 1) {
                                this.tableList[i].pay_status = '已结款'
                            }
                        }
                        const { export_json_to_excel } = require('../../vendor/Export2Excel');
                        const tHeader = ['收货时间','商家名称','商家联系方式','商家银行卡号','商家开户行','店铺ID','订单ID','订单金额','平台抽成','应付金额',
                            '结款金额','结款时间','结款状态'];
                        const filterVal = ['confirm_receipt_time','shop_name','shop_phone','bank_card','open_branch_bank','shop_id','order_id',
                            'order_price','platformPrice','should_price','actual_price','pay_time','pay_status'];
                        const list = this.tableList;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data,'商户结算');
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
				// if (!(this.timer[0] == null && this.userId=='' && this.phone=='' && this.name=='' )) {
					
				// }
				this.userId = '';
				this.name = '';
				this.phone = '';
				this.timer = [null,null];
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
            //结款
            dialogForm(scope){
                this.tableDataList=[];
                const formDatas=new FormData();
                this.tableDataList.push(scope.row.payment_id);
                formDatas.append('paymentIdList',this.tableDataList);
                this.$confirm('确定要打款吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios({
                        method: "post",
                        url: this.$local.http + this.$api.shopPayment,
                        data: formDatas,
                    }).then(res => {
                        if (res.data.success) {
                            this.$message({message: res.data.msg, type: 'success'});
                            this.getList();
                        } else {
                            this.$message({message: res.data.msg, type: 'warning'});
                        }
                    }).catch(res => {
                        this.$message({message: res.data.msg, type: 'error'});
                    })
                })
            },
        },
    }
</script>

<style scoped>
	.qwe .el-checkbox__inner{
		background: #1313;
	}
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
    .head-ed ul li{float: left;margin: 15px 2% 0 0;}

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
    .dialog_ul{overflow: hidden;}
    .dialog_ul li{float: left;width: 80%;line-height: 30px;font-size: 14px;overflow: hidden;}
    .dialog_ul li p{padding-right: 10px;float: left;}
    .dialog_ul li div{padding-right: 10px;float: left;}
</style>
