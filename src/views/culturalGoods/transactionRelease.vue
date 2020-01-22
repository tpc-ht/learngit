<template>
	<!-- 交易释放 -->
    <div class="markingDetails">
        <div class="markingDetails_head">
            <ul>
                <!--<li>-->
                    <!--<span class="se-pl">释放状态</span>-->
                    <!--<el-select v-model="shzt" clearable placeholder="请选择">-->
                        <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</li>-->
                <li>
                    <div class="inputes">
                        <span class="se-pl">订单成交时间</span>
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
                </li>
                <li>
                    <div class="inputes">
                        <span class="se-pl">用户请求时间</span>
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
                <!--<li v-if="shzt==1">-->
                    <!--<div class="inputes">-->
                        <!--<span class="se-pl">平台成交时间</span>-->
                        <!--<el-date-picker-->
                                <!--v-model="timerList"-->
                                <!--value-format="timestamp"-->
                                <!--type="daterange"-->
                                <!--placeholder="请选择"-->
                                <!--range-separator="至"-->
                                <!--start-placeholder="开始日期"-->
                                <!--end-placeholder="结束日期"-->
                        <!--&gt;</el-date-picker>-->
                    <!--</div>-->
                <!--</li>-->
                <li>
                    <span class="se-pl">买方客户姓名</span>
                    <div class="inputes">
                        <el-input v-model="name" placeholder="请输入" style="width:220px;"></el-input>
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
            <h6 class="h6" v-if="total>0">共{{total}}条记录，{{pages}}页。当前为第{{form.page}}页</h6>
            <el-table 
			:data="tableList"
			v-loading="this.$store.getters.getLoadingBool"
			element-loading-text="拼命加载中..."
			border style="width: 100%">
                <el-table-column prop="deal_time" label="订单成交时间" width="160">
                </el-table-column>
                <el-table-column prop="crelease_time" label="用户请求时间" width="160">
                </el-table-column>
                <el-table-column prop="product_num" label="商品代码" width="100">
                </el-table-column>
                <el-table-column prop="product_name" label="商品名称" width="140">
                </el-table-column>
                <el-table-column prop="customer_num" label="买方客户代码" width="150">
                </el-table-column>
                <el-table-column prop="customer_name" label="买方客户姓名" width="150">
                </el-table-column>
                <el-table-column prop="sell_num" label="卖方客户代码" width="150">
                </el-table-column>
                <el-table-column prop="sell_name" label="卖方客户姓名" width="220">
                </el-table-column>
                <el-table-column prop="release_price" label="价格" width="100">
                </el-table-column>
                <el-table-column prop="release_num" label="数量" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.last_release==2">{{scope.row.wait_release}}</span>
                        <span v-if="scope.row.last_release==1">{{scope.row.release_num}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="last_release" label="释放状态" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.last_release==2">待释放</span>
                        <span v-if="scope.row.last_release==1">已释放</span>
                    </template>
                </el-table-column>
                <el-table-column prop="shop_name" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="contentClick(scope)" type="text" size="small" v-if="scope.row.last_release==2">确认释放</el-button>
                        <span style="color: #18c79c;" v-if="scope.row.last_release==1">已释放</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList()"/>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name: "transactionRelease",
        data() {
            return {
                sf:true,
                ysf:false,
                activeName: 'first',
                form: {
                    page: 1,
                    limit: 10
                },
                options: [ {
                    value: '1',
                    label: '已释放'
                },{
                    value: '2',
                    label: '待释放'
                }, ],
                shzt: '1',
                name:'',
                timer:[],
                dataTime2:'',
                dataTime3:'',
                timerData:[],
                dataTime:'',
                dataTime1:'',
                timerList:[],
                dataTime4:'',
                dataTime5:'',
                tableList:[],
                total:'',
                pages:'',
                tableData:[],
                yes_no_release:'',
            }
        },
        components: {
            Pagination
        },
        mounted() {
            this.getList();
            
        },
        methods: {
            //确认释放
            contentClick(scope){
                let data = {
                    id:scope.row.id,
                    sl_order_id: scope.row.sl_order_id,
                    releaseNum: scope.row.wait_release,
                };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.webReleaseOperation,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        })
                    }else {
                        this.$message({
                            message:res.data.msg,
                            type: 'warning'
                        })
                        this.tableList=[]
                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    })
                    this.tableList=[]
                })

            },
            getList() { //初始化
				this.$store.commit('setLoadingBool',true);
                let Time = this.timerData;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.dataTime = Start.getTime(); //当前时间转换成long型
                this.dataTime1 = End.getTime()+Number(86399999); //当前时间转换成long型
                if (Time[0] == null) {
                    this.dataTime ='';
                    this.dataTime1 ='';
                }
                let TimeList = this.timer;
                let Start1 = new Date(TimeList[0]);
                let End1 = new Date(TimeList[1]);
                this.dataTime2 = Start1.getTime(); //当前时间转换成long型
                this.dataTime3 = End1.getTime()+Number(86399999); //当前时间转换成long型
                if (TimeList[0] == null) {
                    this.dataTime2 ='';
                    this.dataTime3 ='';
                }
                let TimeList1 = this.timerList;
                let Start2 = new Date(TimeList1[0]);
                let End2 = new Date(TimeList1[1]);
                this.dataTime4 = Start2.getTime(); //当前时间转换成long型
                this.dataTime5 = End2.getTime()+Number(86399999); //当前时间转换成long型
                if (TimeList1[0] == null) {
                    this.dataTime4 ='';
                    this.dataTime5 ='';
                }
                let data = {
                    userName: this.name,
                    releaseType: 1,
                    beginTime:this.dataTime,
                    endTime:this.dataTime1,
                    cbeginTime:this.dataTime2,
                    cendTime:this.dataTime3,
                    pbeginTime:this.dataTime4,
                    pendTime:this.dataTime5,
                    pageNum: this.form.page,
                    pageSize: this.form.limit,
                };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.queryReleaseInfo,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
					this.$store.commit('setLoadingBool',false);
                    if (res.data.success) {
                        this.tableList=res.data.data.list;
                        this.total=res.data.data.total;
                        this.pages=res.data.data.pages;
						this.getData()
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        })
                    }else {
                        this.$message({
                            message:res.data.msg,
                            type: 'warning'
                        })
                        this.tableList=[]
                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    })
                    this.tableList=[]
                })
            },
            async getData() { //初始化
                let Time = this.timerData;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.dataTime = Start.getTime(); //当前时间转换成long型
                this.dataTime1 = End.getTime()+Number(86399999); //当前时间转换成long型
                if (Time[0] == null) {
                    this.dataTime ='';
                    this.dataTime1 ='';
                }
                let TimeList = this.timer;
                let Start1 = new Date(TimeList[0]);
                let End1 = new Date(TimeList[1]);
                this.dataTime2 = Start1.getTime(); //当前时间转换成long型
                this.dataTime3 = End1.getTime()+Number(86399999); //当前时间转换成long型
                if (TimeList[0] == null) {
                    this.dataTime2 ='';
                    this.dataTime3 ='';
                }
                let TimeList1 = this.timerList;
                let Start2 = new Date(TimeList1[0]);
                let End2 = new Date(TimeList1[1]);
                this.dataTime4 = Start2.getTime(); //当前时间转换成long型
                this.dataTime5 = End2.getTime()+Number(86399999); //当前时间转换成long型
                if (TimeList1[0] == null) {
                    this.dataTime4 ='';
                    this.dataTime5 ='';
                }
                let data = {
                    userName: this.name,
                    releaseType: 1,
                    beginTime:this.dataTime,
                    endTime:this.dataTime1,
                    cbeginTime:this.dataTime2,
                    cendTime:this.dataTime3,
                    pbeginTime:this.dataTime4,
                    pendTime:this.dataTime5,
                };
                let res =  await this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.exportList,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
				if (res.data.success) {
				    this.tableData=res.data.data.list;
				}else {
					this.$message({
					    message:res.data.msg,
					    type: 'error'
					});
				    this.tableData=[]
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
					    for (var i in this.tableData) {
					        if(this.tableData[i].last_release==1){
					            this.tableData[i].last_release='已释放'
					            this.tableData[i].release_num=this.tableData[i].release_num
					        }else if(this.tableData[i].last_release==2){
					            this.tableData[i].last_release='待释放'
					            this.tableData[i].release_num=this.tableData[i].wait_release
					        }
					    }
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['订单成交时间','用户请求时间','商品代码','商品名称','买方客户代码','买方客户姓名','卖方客户代码','卖方客户姓名','价格','数量','释放状态'];
					    const filterVal = ['deal_time','crelease_time','product_num', 'product_name','customer_num','customer_name','sell_num','sell_name','release_price','release_num','last_release' ];
					    const list = this.tableData;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data, '交易释放列表');
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
				// if (!(this.timer[0] == null && this.timerData[0] == null && this.name=='')) {
					
				// }
				this.name = '';
				this.timer = [null,null];
				this.timerData = [null,null];
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
        }
    }
</script>

<style scoped>
    .markingDetails_head{width: 100%;}
    .markingDetails_head ul{overflow: hidden;padding: 0;}
    .markingDetails_head ul li{float: left;overflow: hidden;line-height: 40px;font-size: 16px;margin-bottom: 10px;margin-right: 2%; }
    .se-pl {margin-right: 10px;}
    .inputes {display: inline-block !important;}
    .h6 {
        padding: 10px 5px;
        font-size: 16px;
    }
</style>