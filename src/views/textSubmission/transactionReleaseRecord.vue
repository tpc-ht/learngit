<template>
	<!-- 交易释放记录 -->
    <div style="padding: 20px">
        <div class="head-ed">
            <span style="margin-right:10px;">用户姓名</span>
            <div class="inputes">
                <el-input v-model="name" placeholder="请输入" style="width:185px;"></el-input>
            </div>
            <span class="se-pl" style="margin-left:38px;">用户文交账号</span>
            <div class="inputes">
                <el-input v-model="tel" placeholder="请输入" style="width:185px;"></el-input>
            </div>
            <div class="inputes" style="margin-left: 20px">
                <div class="block">
                    <span class="demonstration" style="margin-right:10px;">请求释放时间</span>
                    <el-date-picker v-model="timer" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <el-row class="inputes" style="margin-left: 20px">
                <el-button @click="getList()">查询</el-button>
            </el-row>
			<el-row class="inputes" style="margin-right: 10px;">
			    <el-button @click="reset()">重置</el-button>
			</el-row>
            <el-row class="inputes" style="margin-left: 20px">
                <el-button @click='export2Excel()' type='primary'>导出Excel表</el-button>
            </el-row>
        </div>
        <div style="margin-top: 15px;">
            <h6 class="h6" v-show="(total>0)">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
            <el-table 
			v-loading="this.$store.getters.getLoadingBool"
			element-loading-text="拼命加载中..."
			:data="tableData.list" border style="width: 100%">
                <el-table-column prop="id" label="编号" min-width="80">
                </el-table-column>
                <el-table-column prop="customer_name" label="用户姓名" min-width="120">
                </el-table-column>
                <el-table-column prop="customer_num" label="用户文交账户" min-width="150">
                </el-table-column>
                <el-table-column prop="crelease_time" label="请求释放时间" min-width="200">
                </el-table-column>
                <el-table-column prop="release_num" label="请求释放数量" min-width="120">
                </el-table-column>
                <el-table-column prop="last_release" label="平台是否释放" min-width="200">
                    <template slot-scope="scope">
                        <span v-if="scope.row.last_release==1">释放</span>
                        <span v-else-if="scope.row.last_release==2">未释放</span>
                    </template>
                </el-table-column>
                <el-table-column prop="prelease_time" label="平台释放时间" width="160">
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <pagination v-show="(total>0)" :total="total" :page.sync="form.page" :limit.sync="form.limit"
                    @pagination="getList" />
    </div>
</template>
<script>
    import adderss from '@/api/adderss'
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name:'transactionReleaseRecord',
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
                tableData: [],
                tableList:[],
                dataTime:'',
                dataTime1:'',
				total:10,
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
                    pageNum: this.form.page,
                    pageSize: this.form.limit,
                };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.releaseRecord,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(data => {
                    let res = data.data;
					this.$store.commit('setLoadingBool',false);
                    if (res.success) {
                        this.$message({message: res.msg, type: 'success'});
                        this.tableData = res.data;
						this.total = this.tableData.total
						this.getData();
                    } else {
                        this.tableData = [];
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
                    pageNum: this.form.page,
                    pageSize: this.total,
                };
               let res = await this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.releaseRecordExport,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
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
				           if (this.tableList[i].last_release == 1) {
				               this.tableList[i].last_release = '释放'
				           } else if (this.tableList[i].last_release == 2) {
				               this.tableList[i].last_release = '未释放'
				           }
				       }
				       const { export_json_to_excel } = require('../../vendor/Export2Excel');
				       const tHeader = ['编号','用户姓名','用户文交账户','请求释放时间','请求释放数量','平台是否释放','平台释放时间',];
				       const filterVal = ['id','customer_name','customer_num','crelease_time','release_num','last_release','prelease_time'];
				       const list = this.tableList;
				       const data = this.formatJson(filterVal, list);
				       export_json_to_excel(tHeader, data,'交易释放记录');
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
				// if (!(this.timer[0] == null && this.name=='' && this.tel=='')) {
					
				// }
				this.name = this.tel = '';
				this.timer = [null,null];
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
        }
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
</style>
