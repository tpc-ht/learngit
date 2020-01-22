<template>
	<!-- 寄存销售推广打款记录 -->
  <div class="mod-log">
      <div class="head-ed">
          <ul>
              <li>
                  <div class="block">
                      <span class="se-pl" style="margin-right:10px;">打款时间</span>
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
    <el-table 
	:data="initData.list"
	v-loading="this.$store.getters.getLoadingBool"
	element-loading-text="拼命加载中..."
	border fit highlight-current-row style="width: 100%">
      <el-table-column prop="sl_user_id" header-align="center" align="center" label="搜了农庄用户ID" width="120">
      </el-table-column>
      <el-table-column prop="real_name" header-align="center" align="center" label="真实姓名" width="100">
      </el-table-column>
      <el-table-column prop="bank_num" header-align="center" align="center" label="银行卡号" width="180">
      </el-table-column>
      <el-table-column prop="open_bank" header-align="center" align="center" label="开户支行" width="200">
      </el-table-column>
      <el-table-column prop="card_number" header-align="center" align="center" label="身份证号" width="200">
      </el-table-column>
      <!--<el-table-column prop="sl_user_id" header-align="center" align="center" label="下级买卖总额" width="120">-->
      <!--</el-table-column>-->
      <el-table-column prop="create_id" header-align="center" align="center" label="财务操作账户名" width="150">
      </el-table-column>
      <el-table-column prop="money" header-align="center" align="center" label="打款金额" width="100">
      </el-table-column>
      <el-table-column prop="created_at" header-align="center" align="center" label="打款时间" width="200">
      </el-table-column>
    </el-table>
      <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
  </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name: 'salesPromotion',
        components: { Pagination },
        data () {
            return {
                dialogFormVisible: false,
                form: {
                    page: 1,
                    limit: 10
                },
                agentCreateTime:'',
                endtime:'',
                id:'',
                timer: [],
                initData:[],
                total:'',
                tableList:[],
            }
        },
        created () {
            this.getList()
        },
        methods: {
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
                    tr_n:this.name,
                    startTime:this.agentCreateTime,
                    endTime:this.endtime,
                    pageNum: this.form.page,
                    pageSize:this.form.limit,
                };
                this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.hitMoneylog,
                    data: qs.stringify(data),
                }).then(res=>{
					this.$store.commit('setLoadingBool',false);
                    if (res.data.success) {
						this.initData=res.data.data;
						this.total=this.initData.total;
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
            async getData() { //初始化
                let Time = this.timer;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.agentCreateTime = Start.getTime(); //当前时间转换成long型
                this.endtime = End.getTime()+Number(86399999); //当前时间转换成long型
                if (Time[0] == null) {
                    this.agentCreateTime ='';
                    this.endtime ='';
                }
                // let confirmDataTime = this.confirmTimer;
                // let confirmDataStart = new Date(confirmDataTime[0]);
                // let confirmDataEnd = new Date(confirmDataTime[1]);
                // this.confirmStartTime = confirmDataStart.getTime(); //当前时间转换成long型
                // this.confirmEndTime = confirmDataEnd.getTime()+Number(86399999); //当前时间转换成long型
                // if (confirmDataTime[0] == null) {
                //     this.confirmStartTime ='';
                //     this.confirmEndTime ='';
                // }
                var data={
                    tr_n:this.name,
                    startTime:this.agentCreateTime,
                    endTime:this.endtime,
                    pageNum: this.form.page,
                    pageSize:this.total,
                }
                let res = await this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.hitMoneylog,
                    data: qs.stringify(data),
                })
				if (res.data.success) {
				    this.tableList=res.data.data.list;
					
				}else {
				    this.tableList=[]
					this.$message({
					    message:res.data.msg,
					    type: 'error'
					});
				} 
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
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['搜了农庄用户ID','真实姓名','银行卡号','开户支行','身份证号','财务操作账户名','打款金额','打款时间'];
					    const filterVal = ['sl_user_id','real_name','bank_num','open_bank','card_number','create_id','money','created_at'];
					    const list = this.tableList;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data,' 寄存销售推广打款记录');
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
				// if (!(this.timer[0] == null)) {
					
				// }
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
</style>
