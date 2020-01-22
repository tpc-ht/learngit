<template>
	<!-- 买入卖出记录 -->
    <div style="padding: 20px">
        <div class="head-ed">
            <span style="margin-right:15px;">购买人姓名</span>
            <div class="inputes">
                <el-input v-model="name" placeholder="请输入" style="width:185px;"></el-input>
            </div>
            <span class="se-pl" style="margin-left:10px;">购买人文交账号</span>
            <div class="inputes">
                <el-input v-model="tel" placeholder="请输入" style="width:185px;"></el-input>
            </div>
            <div class="inputes" style="margin-left: 10px">
                <div class="block">
                    <span class="demonstration" style="margin-right:10px;">交易时间</span>
                    <el-date-picker v-model="timer" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <span class="f-pl-t">挂单号</span>
            <div class="inputes">
                <el-input v-model="dlzt" placeholder="请输入" style="width:185px;"></el-input>
            </div>
            <el-row class="inputes" style="margin-left: 10px;margin-right: 10px;">
                <el-button @click="getList()">查询</el-button>
            </el-row>
			<el-row class="inputes" style="margin-right: 10px;">
			    <el-button @click="reset()">重置</el-button>
			</el-row>
            <el-row class="inputes" style="margin-top: 10px;">
                <el-button @click='export2Excel()' type='primary'>导出Excel表</el-button>
            </el-row>
        </div>
        <div class="head-ed">
            <!--<span class="se-pl" style="margin-right:42px;">挂单号</span>-->
            <!--<el-select v-model="dljb" clearable placeholder="请选择">-->
                <!--<el-option v-for="item in opsed" :key="item.value" :label="item.label" :value="item.value">-->
                <!--</el-option>-->
            <!--</el-select>-->
            <!--<div class="inputes">-->
                <!--<el-input  placeholder="已付款" style="width:185px;" disabled></el-input>-->
            <!--</div>-->


        </div>
        <div style="margin-top: 15px;">
            <h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
            <p class="h6_right">注：因文交所限制，挂单人的其他信息不可查</p>
            <el-table 
			:data="tableData.list" 
			v-loading="this.$store.getters.getLoadingBool"
			element-loading-text="拼命加载中..."
			border style="width: 100%">
                <el-table-column prop="id" label="编号" width="80">
                </el-table-column>
                <el-table-column prop="ti" label="交易时间" width="180">
                </el-table-column>
                <el-table-column prop="fi_n" label="购买人姓名" width="120">
                </el-table-column>
                <el-table-column prop="fi_i" label="购买人文交账号" width="150">
                </el-table-column>
                <el-table-column prop="qty" label="购买数量" width="80">
                </el-table-column>
                <el-table-column prop="type_name" label="支付状态" width="100">
                    <template slot-scope="scope">
                        <span>已付款</span>
                    </template>
                </el-table-column>
                <el-table-column prop="pr" label="实时价" width="120">
                    <template slot-scope="scope">
                        <span>￥{{scope.row.pr}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="pr" label="支付总额" width="120">
                    <template slot-scope="scope">
                        <span>￥{{parseFloat(Number(scope.row.pr*scope.row.qty)).toFixed(2)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="liqpl" label="转让盈亏" width="100">
                    <template slot-scope="scope">
                        <span>￥{{scope.row.liqpl}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="co_i" label="商品信息" width="200">
                    <template slot-scope="scope">
                        <span>商品代码：{{scope.row.co_i}}</span><br/>
                        <span>商品名称：{{scope.row.co_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="tr_t" label="成交类型" width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.tr_t==1">正常交易（开仓,平仓）</span>
                        <span v-if="scope.row.tr_t==2">代理系统强平交易市场强平</span>
                        <span v-if="scope.row.tr_t==4">委托交易(开仓,平仓)</span>
                        <span v-if="scope.row.tr_t==5">无委托成交协议平仓</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ty" label="买卖方向" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.ty==1">买</span>
                        <span v-if="scope.row.ty==2">卖</span>
                    </template>
                </el-table-column>
                <el-table-column prop="or_n" label="挂单号" width="160">
                </el-table-column>
                <el-table-column prop="or_n" label="盈利购物券" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.poundage >=0">{{ parseFloat(scope.row.poundage).toFixed(2)}}</span>
                        <span v-if="scope.row.poundage < 0 ">0</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
    </div>
</template>
<script>
    import adderss from '@/api/adderss'
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name:'purchaseDetails',
        data() {
            return {
                opt: '',
                form: {
                    page: 1,
                    limit: 10
                },
                opsed: [{
                    value: '1',
                    label: '待付款'
                },
                {
                   value: '2',
                   label: '已付款'
                },
                ],
                shzt: '',
                name: '',
                tel: '',
                timer: [],
                dljb: '',
                dlzt: '',
                tableData: [],
                total:'',
                tableList:[],
                dataTime:'',
                dataTime1:'',
                totalPayment:'',
            }
        },
        components: {Pagination},
        mounted() {
            this.getList();
        },
        methods: {
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
                let data = {
                    oname: this.name,
                    wjsNum: this.tel,
                    beginTime: this.dataTime,
                    endTime: this.dataTime1,
                    ornNum: this.dlzt,
                    pageNum: this.form.page,
                    pageSize: this.form.limit,
                }
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.buyAndSellRecord,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(data => {
					this.$store.commit('setLoadingBool',false);
                    let res = data.data;
                    if (res.success == true) {
                        this.$message({message: res.msg, type: 'success'});
                        this.tableData = res.data;
                        this.total=this.tableData.total;
						this.getData();
                    } else {
                        this.tableData =[];
                        this.$message({message: res.msg, type: 'warning'});
                    }
                })
            },
           async getData() { //初始化 
                let Time = this.timer;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.dataTime = Start.getTime(); //当前时间转换成long型
                this.dataTime1 = End.getTime()+Number(86399999); //当前时间转换成long型
                if (Time[0] == null) {
                    this.dataTime ='';
                    this.dataTime1 ='';
                }
                let data={
                    oname: this.name,
                    wjsNum: this.tel,
                    beginTime: this.dataTime,
                    endTime: this.dataTime1,
                    ornNum: this.dlzt,
                    pageNum: '',
                    pageSize: '',
                };
                let res = await this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.buyAndSellRecordExport,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
				if (res.data.success) {
				    this.tableList=res.data.data;
					
				}else {
					this.$message({message:res.data.msg, type: 'error'});
				    this.tableList=[]
				} 
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
					        if (this.tableList[i].tr_t == 1) {
					            this.tableList[i].tr_t = '正常交易（开仓,平仓）'
					        } else if (this.tableList[i].tr_t == 2) {
					            this.tableList[i].tr_t = '代理系统强平交易市场强平'
					        } else if (this.tableList[i].tr_t == 4) {
					            this.tableList[i].tr_t = '委托交易(开仓,平仓)'
					        } else if (this.tableList[i].tr_t == 5) {
					            this.tableList[i].tr_t = '无委托成交协议平仓'
					        }
					    }
					    for (var i in this.tableList) {
					         if (this.tableList[i].ty == 1) {
					            this.tableList[i].ty = '买'
					        } else if (this.tableList[i].ty == 2) {
					            this.tableList[i].ty = '卖'
					        }
					    }
					    for (var i in this.tableList) {
					        if (this.tableList[i].poundage >= 0) {
					            this.tableList[i].poundage = parseFloat(this.tableList[i].poundage).toFixed(2)
					        } else if (this.tableList[i].poundage < 0) {
					            this.tableList[i].poundage = '0'
					        }
					    }
					
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['编号','交易时间','购买人姓名','购买人文交账号','购买数量','实时价','支付总额','转让盈亏','商品代码','商品名称','成交类型','买卖方向','挂单号','盈利购物券'];
					    const filterVal = ['id','ti','fi_n','fi_i','qty','pr','totalPayment','liqpl','co_i','co_name','tr_t','ty','or_n','poundage'];
					    const list = this.tableList;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data,'买入卖出记录');
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
				// if (!(this.timer[0] == null && this.name=='' && this.tel=='' && this.dlzt=='' )) {
					
				// }
				this.name = this.tel = this.dlzt = '';
				this.timer = [null,null];
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
			
        },
    }
</script>

<style scoped lang="scss">
    .conDiv{font-size: 14px;color: #000;}
    .h6 {
        float: left;
        padding: 10px 5px;
        font-size: 16px;
    }
    .h6_right{text-align: right;float: right;margin-bottom: 10px;}
    .inputes {
        display: inline-block !important;
    }
    .sp-df {
        margin-left: 40px;
        margin-right: 10px;
    }

    .se-pl {
        margin-right: 10px;
    }

    .head-ed {
        margin-top: 10px;
    }

    .el-select {
        width: 185px !important;
    }

    .se-pl-t {
        margin-right: 10px;
        margin-left: 12px;
    }

    .f-pl-t {
        margin-right: 10px;
        margin-left: 10px;
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
</style>
