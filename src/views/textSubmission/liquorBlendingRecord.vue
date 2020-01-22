<template>
    <div style="padding: 20px">
        <div class="head-ed">
            <div class="inputes" style="margin-left: 10px">
                <div class="block">
                    <span class="demonstration" style="margin-right:10px;">兑换日期</span>
                    <el-date-picker v-model="timer" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <span style="margin-right:15px;margin-left:10px;">文交所姓名</span>
            <div class="inputes">
                <el-input v-model="name" placeholder="请输入" style="width:185px;"></el-input>
            </div>
            <span class="se-pl" style="margin-left:10px;">文交所电话</span>
            <div class="inputes">
                <el-input v-model="tel" placeholder="请输入" style="width:185px;"></el-input>
            </div>
            <span class="f-pl-t">用户ID</span>
            <div class="inputes">
                <el-input v-model="userId" placeholder="请输入" style="width:185px;"></el-input>
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
        <div style="margin-top: 15px;">
            <h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
            <el-table 
			:data="tableData.list" 
			v-loading="this.$store.getters.getLoadingBool"
			element-loading-text="拼命加载中..."
			border style="width: 100%">
                <el-table-column prop="order_id" label="订单ID" width="130">
                </el-table-column>
                <el-table-column prop="user_id" label="用户ID" width="80">
                </el-table-column>
                <el-table-column prop="ptphone" label="用户电话" width="110">
                </el-table-column>
                <el-table-column prop="wjsphone" label="文交所电话" width="110">
                </el-table-column>
                <el-table-column prop="accounts" label="文交所ID" width="100">
                </el-table-column>
                <el-table-column prop="username" label="文交所姓名" width="100">
                </el-table-column>
                <el-table-column prop="types" label="来源方式" width="140">
                </el-table-column>
                <el-table-column prop="buy_number" label="购买数量" width="100">
                </el-table-column>
                <el-table-column prop="give_number" label="赠送数量" width="100">
                </el-table-column>
                <el-table-column prop="give_balance" label="赠送余额" width="150">
                    <template slot-scope="scope">
                        <span>￥{{scope.row.give_balance||0}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="isCancel" label="是否取消该记录" width="120">
                </el-table-column>
                <el-table-column prop="create_time" label="兑换日期" width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.give_time}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" width="150">
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
    </div>
</template>

<script>
    import {formatDate} from '../../common/js/filters.js'
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name: "liquorBlendingRecord",
        filters: {
            formatDate(time){
                var data = new Date(time);
                return formatDate(data,'yyyy-MM-dd');
            }
        },
        data() {
            return {
                opt: '',
                form: {
                    page: 1,
                    limit: 10
                },
                name: '',
                tel: '',
                timer: [],
                userId: '',
                tableData: [],
                total:'',
                tableList:[],
                dataTime:'',
                dataTime1:'',
                totalPayment:'',
            }
        },
        components: {Pagination},
        mounted() {this.getList();},
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
                    name: this.name,
                    phone: this.tel,
                    beginTime: this.dataTime,
                    endTime: this.dataTime1,
                    userId: this.userId,
                    pageNum: this.form.page,
                    pageSize: this.form.limit,
                }
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.ymExchangeLog,
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
                let data={
                    name: this.name,
                    phone: this.tel,
                    beginTime: this.dataTime,
                    endTime: this.dataTime1,
                    userId: this.userId,
                    pageNum: this.form.page,
                    pageSize: this.total,
                };
                let res = await this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.ymExchangeLog,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
				if (res.data.success) {
				    this.tableList=res.data.data.list;
					
				}else {
					this.$message({message:res.data.msg, type: 'error'});
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
					    for (var i in this.tableList) {
					            this.tableList[i].avg_num =Number(this.tableList[i].avg_num*2)
					    }
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['订单ID','用户ID','用户电话','文交所电话','文交所ID','文交所姓名','来源方式','购买数量','赠送数量','赠送余额','是否取消该记录','兑换日期','备注'];
					    const filterVal = ['order_id','user_id','ptphone','wjsphone','accounts','username','types','buy_number',
					        'give_number','give_balance','isCancel','create_time','remark'];
					    const list = this.tableList;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data,'匀贸兑酒记录');
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
				// if (!(this.timer[0] == null && this.name=='' && this.tel=='' && this.userId=='' )) {
					
				// }
				this.name = '';
					this.tel = '';
					this.userId = '';
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

<style scoped>
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