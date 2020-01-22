<template>
    <!-- 推广商家提成 -->
	<div style="padding:20px;">
        <div class="head-ed">
            <ul>
                <li>
                    <span class="se-pl">推广人ID</span>
                    <div class="inputes">
                        <el-input v-model="userId" placeholder="请输入" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">推广人</span>
                    <div class="inputes">
                        <el-input v-model="name" placeholder="请输入" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">订单ID</span>
                    <div class="inputes">
                        <el-input v-model="orderId" placeholder="请输入" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">联系方式</span>
                    <div class="inputes">
                        <el-input v-model="phone" placeholder="请输入" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">结款状态</span>
                    <div class="inputes">
                        <el-select v-model="zffs" clearable placeholder="请选择">
                            <el-option v-for="item in opsedList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
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
					<el-row class="inputes" style="margin-left: 10px;">
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
          <!-- <el-table 
			:data="tableData.list" 
			border style="width: 100%"
			> -->
			<el-table 
			:data="tableData.list" 
			border style="width: 100%"
			ref="multipleTable"
			tooltip-effect="dark"
			border fit highlight-current-row
			v-loading="this.$store.getters.getLoadingBool"
			@selection-change="handleSelectionChange"
			>
			<el-table-column
				  type="selection"
				  width="55"
				  :selectable="checkSelectable"
				  >
				</el-table-column>
				
				<el-table-column prop="real_name" label="推广人姓名" width="100">
                </el-table-column>
                <el-table-column prop="userId" label="推广人ID" width="100">
                </el-table-column>
                <el-table-column prop="phone" label="联系方式" width="120">
                </el-table-column>
                <el-table-column prop="created_at" label="收货时间" width="160">
                </el-table-column>
                <el-table-column prop="royalty" label="收益总额" width="100">
                    <template slot-scope="scope">
                        <span>￥{{scope.row.royalty||0}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="total_amount" label="订单总金额" width="120">
                    <template slot-scope="scope">
                        <span>￥{{scope.row.total_amount||0}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="order_id" label="订单ID" width="80">
                </el-table-column>
                <el-table-column prop="royalty_rate" label="推广收益比例" width="110">
                    <template slot-scope="scope">
                        <span>{{scope.row.royalty_rate}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="recommendShopName" label="被推广人店铺名字" width="140">
                </el-table-column>
                <el-table-column prop="recommendShopPhone" label="被推广人店铺电话" width="140">
                </el-table-column>
                <el-table-column prop="recommendShopId" label="被推广店铺ID" width="110">
                </el-table-column>
                <el-table-column prop="open_branch_bank" label="打款银行支行" width="350">
                </el-table-column>
                <el-table-column prop="bank_card" label="银行账户" width="180">
                </el-table-column>
                <el-table-column prop="status" label="结款状态" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">已结清</span>
                        <span v-if="scope.row.status==1">未结清</span>
                    </template>
                </el-table-column>
            </el-table>
			<div style="margin-top: 20px">
				<h6 style="display: inline-block;" class="h6" v-if="total>0">
				共累计收益 ￥{{totalMoney1}}，当前选择 {{multipleSelection.length}} 条数据, 收益 ￥{{totalMoney2}}
				</h6>
			</div>
        </div>
        <!-- 分页 -->
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
        <el-dialog title="打款" :visible.sync="dialogFormVisible">
            <!--<ul class="dialog_ul">-->
                <!--<li>-->
                    <!--<p>打款额度：</p>-->
                    <!--<el-input v-model="danjia" placeholder="请输入" style="width:300px;"></el-input>-->
                <!--</li>-->
            <!--</ul>-->
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
        name:'promotionCommission',
        data() {
            return {
                form: {
                    page: 1,
                    limit: 10
                },
                name: '',
                phone:'',
                orderId:'',
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
                dialogFormVisible:false,
                userId:'',
				multipleSelection:[],//选中数据
				tableDataList:[],//需要提交的列表id
				totalMoney1:0,//总提成
				totalMoney2:0,//选中提成
            }
        },
        components: {Pagination},
        mounted() {
            this.getList();
        },
        methods: {
            getList() {//初始化
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
                   userId:this.userId,
                   realName: this.name,
                   phone:this.phone,
                   status:this.zffs,
                   order_id:this.orderId,
                   startTime:this.dataTime,
                   endTime:this.dataTime1,
                   pageNum: this.form.page,
                   pageSize:this.form.limit,
                    };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.promotionFeeDeduction,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(data => {
                    let res = data.data;
					this.$store.commit('setLoadingBool',false);
                    if(res.success){
						console.log(res)
                        this.tableData = res.data.pageInfo;
                        this.total=this.tableData.total;
						this.multipleSelection = [];
						this.totalMoney1 = res.data.sumRoyalty;
                        this.getData();
                    }else{
                        this.$message({message: res.msg, type: 'warning'});
                        this.tableData =[]
						this.total=0;
                    }
                })
            },
            getData() { //初始化
                var data={
                    userId:this.userId,
                    realName: this.name,
                    phone:this.phone,
                    status: this.zffs,
                    order_id:this.orderId,
                    startTime:this.dataTime,
                    endTime:this.dataTime1,
                    pageNum: this.form.page,
                    pageSize:this.total,
                };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.promotionFeeDeduction,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
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
                this.$confirm('确定要导出表格数据么？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    require.ensure([], () => {
                        for (var i in this.tableList) {
                            if (this.tableList[i].status == 0) {
                                this.tableList[i].status = '已结清'
                            } else if (this.tableList[i].status == 1) {
                                this.tableList[i].status = '未结清'
                            }
                        }
                        const { export_json_to_excel } = require('../../vendor/Export2Excel');
                        const tHeader = ['推广人姓名','推广人ID','联系方式','收货时间','收益总额','订单总金额','订单ID','推广收益比例','被推广人店铺名字',
                            '被推广人店铺电话','被推广店铺ID','打款银行支行','银行账户','结款状态'];
                        const filterVal = ['real_name','userId','phone','created_at','royalty','total_amount','order_id','royalty_rate',
                            'recommendShopName','recommendShopPhone','recommendShopId','open_branch_bank','bank_card','status'];
                        const list = this.tableList;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data,'推广商家提成');
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
				// this.zffs=='' && 
				// this.phone=='' && 
				// this.orderId=='' && 
				// this.name=='' && 
				// this.userId=='' )) {
					
				// }
				this.zffs = this.phone =
				this.orderId = this.name = 
				this.userId = this.contact = '';
				this.timer = [null,null];
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
            dialogFormShow(scope){
                this.id=scope.row.id;
                this.dialogFormVisible=true;
            },
			//处理浮点数相加
			toDecimal(x) {
				var val = Number(x)
				if(!isNaN(parseFloat(val))) {
					val = val.toFixed(2);
				}
				return Number(val);
			},
			//列表多选
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val);
				let arr = [];
				let m = 0;
				this.multipleSelection.map(item => {
					arr.push(item.id)
					m += item.royalty;
				});
				this.totalMoney2 =this.toDecimal(m);
				this.tableDataList = [...arr];
			},
			//多选框是否禁用
			checkSelectable(row){
				return row.status==1;
			},
            //查看关联订单
            toAssociatedOrder(){
                this.$router.push({path: '/associatedOrder',query:{}})
            },
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
    .head-ed ul li{float: left;margin: 15px 4% 0 0;}

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
