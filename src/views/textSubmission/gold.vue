<template>
	<!-- 出金 -->
    <div style="padding: 20px">
        <div class="head-ed">
            <span style="margin-right:10px;">用户姓名</span>
            <div class="inputes">
                <el-input v-model="name" placeholder="请输入" style="width:185px;"></el-input>
            </div>
            <span class="se-pl" style="margin-left:38px;">文交账号</span>
            <div class="inputes">
                <el-input v-model="tel" placeholder="请输入" style="width:185px;"></el-input>
            </div>
            <div class="inputes" style="margin-left: 20px">
                <div class="block">
                    <span class="demonstration" style="margin-right:10px;">转出时间</span>
                    <el-date-picker v-model="timer" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <el-row class="inputes" style="margin-left: 20px">
                <el-button @click="getList()">查询</el-button>
            </el-row>
			<el-row class="inputes">
			    <el-button @click="reset()">重置</el-button>
			</el-row>
            <el-row class="inputes" style="margin-left: 20px">
                <el-button @click='export2Excel()' type='primary'>导出Excel表</el-button>
            </el-row>
        </div>
        <div style="margin-top: 15px;">
            <h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
            <el-table 
			v-loading="this.$store.getters.getLoadingBool"
			element-loading-text="拼命加载中..."
			:data="tableData.list" border style="width: 100%">
                <el-table-column prop="id" label="编号" min-width="80">
                </el-table-column>
                <el-table-column prop="usn" label="用户姓名" min-width="120">
                </el-table-column>
                <el-table-column prop="usi" label="文交账户" min-width="150">
                </el-table-column>
                <el-table-column prop="st" label="出入金状态" min-width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.st==0">成功</span>
                        <span v-else-if="scope.row.st==1">失败</span>
                    </template>
                </el-table-column>
                <el-table-column prop="usb" label="银行代码" min-width="140">
                </el-table-column>
                <el-table-column prop="ti" label="时间" min-width="200">
                </el-table-column>
                <el-table-column prop="ty" label="出入金类型" min-width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.ty==1">入金</span>
                        <span v-else-if="scope.row.ty==2">出金</span>
                    </template>
                </el-table-column>
                <el-table-column prop="fn" label="流水号" min-width="200">
                </el-table-column>
                <el-table-column prop="mon" label="金额" min-width="160">
                    <template slot-scope="scope">
                        <span>￥{{scope.row.mon}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit"
                    @pagination="getList" />
    </div>
</template>
<script>
    import adderss from '@/api/adderss'
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name:'gold',
        data() {
            return {
                opt: '',
                form: {
                    page: 1,
                    limit: 10
                },
                total:'',
                name: '',
                tel: '',
                timer: [],
                tableData: [],
                tableList:[],
                dataTime:'',
                dataTime1:'',
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
                    url: this.$local.http + this.$api.fundFlowRecord,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(data => {
					this.$store.commit('setLoadingBool',false);
                    let res = data.data;
                    if (res.success) {
                        this.$message({message: res.msg, type: 'success'});
                        this.tableData = res.data;
                        this.total=this.tableData.total;
						this.getData()
                    } else {
                        this.tableData =[];
                        this.$message({message: res.msg, type: 'warning'});
                    }
                })
            },
           async getData() {//初始化
				// const loading = this.$loading({ lock: true,text: '拼命加载中...'});
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
                    pageNum: '',
                    pageSize: '',
                };
                let res = await this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.fundFlowRecordExport,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
				if (res.data.success) {
				    this.tableList=res.data.data;
					
				}else {
					this.$message({message:res.data.msg, type: 'error'})
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
					        if (this.tableList[i].st == 0) {
					            this.tableList[i].st = '成功'
					        } else if (this.tableList[i].st == 1) {
					            this.tableList[i].st = '失败'
					        }
					    }
					    for (var i in this.tableList) {
					        if (this.tableList[i].ty == 1) {
					            this.tableList[i].ty = '入金'
					        } else if (this.tableList[i].ty == 2) {
					            this.tableList[i].ty = '出金'
					        }
					    }
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['编号','用户姓名','文交账户','出入金状态','银行代码','时间','出入金类型','流水号','金额'];
					    const filterVal = ['id','usn','usi','st','usb','ti','ty','fn','mon'];
					    const list = this.tableList;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data,'出金记录');
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
				// if (!(this.timer[0] == null && this.tel=='' && this.name=='' )) {
					
				// }
				this.tel = this.name = ''
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
