<template>
	<!-- 文交商城赠送酒交易明细 -->
    <div style="padding:20px;">
        <div class="head-ed">
            <ul>
                <li>
                    <span class="se-pl">文交所用户ID</span>
                    <div class="inputes">
                        <el-input placeholder="请输入" v-model="wjsId" clearable style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">用户ID</span>
                    <div class="inputes">
                        <el-input placeholder="请输入" v-model="id" clearable style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">用户姓名</span>
                    <div class="inputes">
                        <el-input placeholder="请输入" v-model="name" clearable style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">联系方式</span>
                    <div class="inputes">
                        <el-input v-model="contact" placeholder="请输入" style="width:185px;"></el-input>
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
        <div>
            <h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
            <el-table 
			:data="tableData.list" 
			v-loading="this.$store.getters.getLoadingBool"
			element-loading-text="拼命加载中..."
			border style="width: 100%">
                <el-table-column prop="wjs_user_id" label="文交所用户ID" width="110">
                </el-table-column>
                <el-table-column prop="user_id" label="用户ID" width="80">
                </el-table-column>
                <el-table-column width="120px" prop="phone" label="联系方式">
                </el-table-column>
                <el-table-column prop="nick_name" label="用户姓名" width="140">
                </el-table-column>
                <el-table-column prop="buy_number" label="购买数量" width="120">
                </el-table-column>
                <el-table-column prop="give_number" label="赠送数量" width="120">
                </el-table-column>
                <el-table-column prop="give_balance" label="赠送余额" width="120">
                </el-table-column>
                <el-table-column prop="open_stock_num" label="开放库存数量" width="120">
                </el-table-column>
                <el-table-column prop="surplus_stock_num" label="开放库存余额" width="120">
                </el-table-column>
                <el-table-column prop="tihuo" label="提货数量" width="120">
                </el-table-column>
                <el-table-column prop="yihuo" label="易货数量" width="120">
                </el-table-column>
                <el-table-column prop="zhuanrang" label="转让他人数量" width="120">
                </el-table-column>
                <el-table-column prop="shifang" label="释放数量" width="120">
                </el-table-column>
                <el-table-column align="center" label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button type="text" @click="queryOneUserWine(scope)">转入明细</el-button>
                        <el-button type="text" @click="queryOneUserWineAllFlow(scope)">转出明细</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />

        <!-- 酒来源明细 -->
        <el-dialog title="酒来源明细" :visible.sync="sourceDialog" style="width: 150%;left: -500px;top:-60px;">
            <div class="dialog1">
                <div class="dialog1">
                    <span> 用户ID：</span><span class="span2">{{winesource.user_id}}</span>
                    <span class="span1"> 总购买数：</span><span class="span2">{{winesource.allBuy}}</span>
                    <span class="span1"> 总赠送数：</span><span class="span2">{{winesource.allGive}}</span>
                    <span class="span1"> 总剩余数：</span><span class="span2">{{winesource.allBalance}}</span>
                </div>
            </div>
            <div class="dialog1">
                <span> 来源列表：</span>
            </div>
            <div>
                <el-table :data="winesource.sourceList" border>
                    <el-table-column  type="index" align="center" label="序号" ></el-table-column>
                    <el-table-column property="wjs_give_id" align="center" label="赠送ID" ></el-table-column>
                    <el-table-column property="order_id" align="center" label="订单ID" ></el-table-column>
                    <el-table-column property="buy_number" align="center" label="购买数量" ></el-table-column>
                    <el-table-column property="give_number" align="center" label="赠送数量"></el-table-column>
                    <el-table-column property="give_balance" align="center" label="赠送余额" ></el-table-column>
                    <el-table-column :formatter="this.formatCancle" align="center" label="是否取消" ></el-table-column>
                    <el-table-column :formatter="this.formatSourceType" align="center" label="来源类型" ></el-table-column>
                    <el-table-column property="give_time" align="center" label="赠送时间" width="160"></el-table-column>
                    <el-table-column property="remark" align="center" label="备注" ></el-table-column>
                    <el-table-column align="center" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button type="text" @click="queryOneUserWineFlow(scope)">该赠送流向明细</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <pagination v-if="winesource.total>0" :total="winesource.total" :page.sync="winesource.page" :limit.sync="winesource.limit" @pagination="queryOneUserWine" />
        </el-dialog>

        <!-- 所有酒去向明细 -->
        <el-dialog title="酒去向明细" :visible.sync="flowAllDialog" style="width: 150%;left: -500px;top:-60px;">
            <div class="dialog1">
                <div class="dialog1">
                    <span> 用户ID：</span><span class="span2">{{wineAllflow.user_id}}</span>
                    <span class="span1"> 总购买数：</span><span class="span2">{{wineAllflow.allBuy}}</span>
                    <span class="span1"> 总赠送数：</span><span class="span2">{{wineAllflow.allGive}}</span>
                    <span class="span1"> 总剩余数：</span><span class="span2">{{wineAllflow.allBalance}}</span>
                </div>
            </div>
            <div class="dialog1">
                <span> 去向列表：</span>
            </div>
            <div>
                <el-table :data="wineAllflow.flowList" border>
                    <el-table-column  type="index" align="center" label="序号" ></el-table-column>
                    <el-table-column property="wjs_give_id" align="center" label="赠送ID" ></el-table-column>
                    <el-table-column property="user_id" align="center" label="用户ID" ></el-table-column>
                    <el-table-column property="record_user_id" align="center" label="记录人ID"></el-table-column>
                    <el-table-column :formatter="this.formatTradeType" align="center" label="交易类型" ></el-table-column>
                    <el-table-column property="trade_number" align="center" label="交易数量" ></el-table-column>
                    <el-table-column :formatter="this.formatOperateType"  align="center" label="转入/转出" ></el-table-column>
                    <el-table-column property="create_time" align="center" label="创建时间" width="160"></el-table-column>
                    <el-table-column property="descs" align="center" label="备注" width="300"></el-table-column>
                </el-table>
            </div>
            <pagination v-if="wineAllflow.total>0" :total="wineAllflow.total" :page.sync="wineAllflow.page" :limit.sync="wineAllflow.limit" @pagination="queryOneUserWineAllFlow" />
        </el-dialog>

        <!-- 某次赠送酒去向明细 -->
        <el-dialog title="此次赠送酒去向明细" :visible.sync="flowDialog" style="width: 150%;left: -500px;top:-60px;">
            <div class="dialog1">
                <div class="dialog1">
                    <span> 用户ID：</span><span class="span2">{{winesource.user_id}}</span>
                    <span class="span1"> 总购买数：</span><span class="span2">{{winesource.allBuy}}</span>
                    <span class="span1"> 总赠送数：</span><span class="span2">{{winesource.allGive}}</span>
                    <span class="span1"> 总剩余数：</span><span class="span2">{{winesource.allBalance}}</span>
                </div>
            </div>
            <div class="dialog1">
                <span> 去向列表：</span>
            </div>
            <div>
                <el-table :data="wineflow.flowList" border>
                    <el-table-column  type="index" align="center" label="序号" ></el-table-column>
                    <el-table-column property="wjs_give_id" align="center" label="赠送ID" ></el-table-column>
                    <el-table-column property="user_id" align="center" label="用户ID" ></el-table-column>
                    <el-table-column property="record_user_id" align="center" label="记录人ID"></el-table-column>
                    <el-table-column :formatter="this.formatTradeType" align="center" label="交易类型" ></el-table-column>
                    <el-table-column property="trade_number" align="center" label="交易数量" ></el-table-column>
                    <el-table-column :formatter="this.formatOperateType"  align="center" label="转入/转出" ></el-table-column>
                    <el-table-column property="create_time" align="center" label="创建时间" width="160"></el-table-column>
                    <el-table-column property="descs" align="center" label="备注" width="300"></el-table-column>
                </el-table>
            </div>
            <pagination v-if="wineflow.total>0" :total="wineflow.total" :page.sync="wineflow.page" :limit.sync="wineflow.limit" @pagination="queryOneUserWineFlow" />
        </el-dialog>
    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name:'documentSubmissionDetails',
        data() {
            return {
                form: {
                    page: 1,
                    limit: 10
                },
                winesource: {
                    page: 1,
                    limit: 10,
                    total:'',
                    sourceData:'',
                    sourceList:[],
                    user_id:'',
                    allBuy:'',
                    allGive:'',
                    allBalance:'',
                },
                wineAllflow: {
                    page: 1,
                    limit: 10,
                    total:'',
                    flowData:'',
                    flowList:[],
                    user_id:'',
                    allBuy:'',
                    allGive:'',
                    allBalance:'',
                },
                wineflow: {
                    page: 1,
                    limit: 10,
                    total:'',
                    flowData:'',
                    flowList:[],
                    wjs_give_id:'',
                },
                sourceDialog:false,//酒来源弹框
                flowDialog:false,//某次酒去向弹框
                flowAllDialog:false,//所有酒去向弹框
                wjsId:'',
                id:'',
                name: '',
                contact: '',
                tableData: '',
                total:'',
                tableList:[],
            }
        },
        components: {Pagination},
        mounted() {
            this.getList();
        },
        methods: {
            getList() {//初始化
			this.$store.commit('setLoadingBool',true);
                    let data={
                        wjs_user_id:this.wjsId,
                        user_id:this.id,
                        user_name: this.name,
                        user_phone: this.contact,
                        aging_or_not:1,
                        pageNum: this.form.page,
                        pageSize:this.form.limit,
                    };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.queryUserWine,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(data => {
                    let res = data.data;
					this.$store.commit('setLoadingBool',false);
                    if(res.success){
                        this.$message({message:res.msg, type: 'success'});
                        this.tableData = res.data;
                        this.total=this.tableData.total;
						this.getData();
                    }else{
                        this.$message({message: res.msg, type: 'warning'});
                        this.tableData =[]
                    }
                })
            },
            async getData() { //初始化
				// const loading = this.$loading({lock: true,text: '拼命加载中...',});
                let data={
                    wjs_user_id:this.wjsId,
                    user_id:this.id,
                    user_name: this.name,
                    user_phone: this.contact,
                    aging_or_not:0,
                    pageNum: '',
                    pageSize:'',
                };
                let res = await this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.queryUserWine,
                    data: qs.stringify(data),
                })
				if (res.data.success) {
				    this.tableList=res.data.data;
					
				}else {
				    this.tableList=[]
				}
				// loading.close();
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
					     const { export_json_to_excel } = require('../../vendor/Export2Excel');
					     const tHeader = ['文交所用户ID','用户ID','联系方式','用户姓名','购买数量','赠送数量','赠送余额','开发库存数量','开发库存余额', '提货数量','易货数量','转让他人数量','释放数量'];
					     const filterVal = ['wjs_user_id','user_id','phone','nick_name','buy_number','give_number','give_balance','open_stock_num','surplus_stock_num','tihuo','yihuo','zhuanrang','shifang'];
					     const list = this.tableList;
					     const data = this.formatJson(filterVal, list);
					     export_json_to_excel(tHeader, data,'文交商城赠送酒交易明细');
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
				// if (!(this.wjsId=='' && this.id=='' && this.name=='' && this.contact=='' )) {
					
				// }
				this.wjsId = this.id = this.name = this.contact = '';
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
            queryOneUserWine(scope){
                try {
                    //由于这里面代码点击下一页是拿不到scope参数，故try起来以免报错，但是不影响分页
					this.winesource.user_id = scope.row.user_id;
					this.winesource.allBuy = scope.row.buy_number;
					this.winesource.allGive = scope.row.give_number;
					this.winesource.allBalance = scope.row.give_balance;
                } catch (e) {
                }
				
                var params={
                    user_id:this.winesource.user_id,
                    pageNum: this.winesource.page,
                    pageSize:this.winesource.limit,
                }
				console.log(scope)
                this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.queryOneUserWine,
                    params: params,
                }).then(res=>{
                    if (res.data.success) {
                        this.winesource.sourceData=res.data.data;
                        this.winesource.sourceList=res.data.data.list;
                        this.winesource.total=res.data.data.total;
                    }else {
                        this.$message({message:res.data.msg, type: 'error'});
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'});
                })
                this.sourceDialog = true;
            },
            queryOneUserWineAllFlow(scope){
                try {
                    //由于这里面代码点击下一页是拿不到scope参数，故try起来以免报错，但是不影响分页
                    this.wineAllflow.user_id = scope.row.user_id;
                    this.wineAllflow.allBuy = scope.row.buy_number;
                    this.wineAllflow.allGive = scope.row.give_number;
                    this.wineAllflow.allBalance = scope.row.give_balance;
                } catch (e) {
                }

                var params={
                    user_id:this.wineAllflow.user_id,
                    pageNum: this.wineAllflow.page,
                    pageSize:this.wineAllflow.limit,
                }
                this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.queryOneUserWineAllFlow,
                    params: params,
                }).then(res=>{
                    if (res.data.success) {
                        this.wineAllflow.flowData=res.data.data;
                        this.wineAllflow.flowList=res.data.data.list;
                        this.wineAllflow.total=res.data.data.total;
                    }else {
                        this.$message({message:res.data.msg, type: 'error'});
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'});
                })
                this.flowAllDialog = true;
            },
            queryOneUserWineFlow(scope){
                try {
                    this.wineflow.wjs_give_id = scope.row.wjs_give_id;
                } catch (e) {
                }

                var params={
                    wjs_give_id:this.wineflow.wjs_give_id,
                    pageNum: this.wineflow.page,
                    pageSize:this.wineflow.limit,
                }
                this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.queryOneUserWineFlow,
                    params: params,
                }).then(res=>{
                    if (res.data.success) {
                        this.wineflow.flowData=res.data.data;
                        this.wineflow.flowList=res.data.data.list;
                        this.wineflow.total=res.data.data.total;
                    }else {
                        this.$message({message:res.data.msg, type: 'error'});
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'});
                })
                this.flowDialog = true;
            },
            formatCancle(row){
                if(row.give_cancel == 1){
                    return "已取消";
                }else if(row.give_cancel == 2){
                    return "未取消";
                }else {
                    return "未 知";
                }
            },
            formatSourceType(row){
                if(row.type == 1){
                    return "买1赠3";
                }else if(row.type == 2){
                    return "用户转送";
                }else if(row.type == 3){
                    return "退还库存";
                }else if(row.type == 4){
                    return "兑酒劵换取";
                }else {
                    return "未 知";
                }
            },
            formatTradeType(row){
                if(row.trade_type == 1){
                    return "申请提货";
                }else if(row.trade_type == 2){
                    return "等值易货";
                }else if(row.trade_type == 3){
                    return "转让他人";
                }else if(row.trade_type == 4){
                    return "交易释放";
                }else if(row.trade_type == 5){
                    return "开放库存";
                }else {
                    return "未 知";
                }
            },
            formatOperateType(row){
                if(row.operate_type == 1){
                    return "转入";
                }else if(row.operate_type == 2){
                    return "转出";
                }else {
                    return "未 知";
                }
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
    /************************************************陈绍波***********************************************************/
    .dialog_ul li{float: left;width: 30%;line-height: 30px;font-size: 14px;overflow: hidden;}
    .dialog_ul li p{padding-right: 10px;float: left;}
    .dialog1{ font-size: 14px;font-weight: 600;padding-bottom: 10px}
    .span1{padding-left: 60px}
    .span2{font-weight: 500;}
    .el-dialog--small {
        width: 90%;
    }
    /************************************************陈绍波***********************************************************/
</style>
