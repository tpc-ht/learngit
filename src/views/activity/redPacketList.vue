<template>
    <div class="app-container">
		<!-- 结款记录 -->
        <div class="head-ed">
            <ul>
				<li>
				    <span class="se-pl">姓名</span>
				    <div class="inputes">
				        <el-input v-model="name" placeholder="请输入" style="width:185px;"></el-input>
				    </div>
				</li>
				<li>
				    <span class="se-pl">电话</span>
				    <div class="inputes">
				        <el-input placeholder="请输入" v-model="phone" clearable style="width:185px;"></el-input>
				    </div>
				</li>
                <li>
                    <div class="block">
                        <span class="se-pl" style="margin-right:10px;">时间段</span>
						  <el-select v-model="timer" clearable placeholder="请选择">
						     <el-option
						       v-for="(item,index) in timeList"
						       :key="index"
						       :label="item.start+'-'+item.end"
						       :value="item.start+'-'+item.end">
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
				<li>
				    <el-row class="inputes">
				        <el-button @click="dialogVisible = true">生成中奖记录</el-button>
				    </el-row>
				</li>
            </ul>
        </div>
        <h6 class="h6" v-if="total>0">共{{total}}条记录，{{initData.pages}}页。当前为第{{form.page}}页</h6>
        <el-table 
		:data="initData.list" 
		border fit highlight-current-row 
		v-loading="this.$store.getters.getLoadingBool"
		element-loading-text="拼命加载中"
		style="width: 100%">
            <el-table-column  align="center" label="用户ID">
                <template slot-scope="scope">
                    <span>{{scope.row.user_id}}</span>
                </template>
            </el-table-column>
            <el-table-column  align="center" label="真实姓名">
                <template slot-scope="scope">
                    <span>{{scope.row.real_name}}</span>
                </template>
            </el-table-column>
            <el-table-column  align="center" label="手机号">
                <template slot-scope="scope">
                    <span>{{scope.row.phone}}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="100px" align="center" label="中奖等级">
                <template slot-scope="scope">
                    <span>{{ scope.row.reward_level }}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="170px" align="center" label="开始时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.start_time }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="结束时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.end_time }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.created_at }}</span>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
		
		
		<el-dialog
		  title="生成中奖记录"
		  :visible.sync="dialogVisible"
		  width="30%">
		  <div class="dialog-item">
			 <div class="item1">
				  <span class="se-pl" style="margin-right:10px;">开奖时间</span>
				  <el-date-picker
				       v-model="winningTimer"
					   format='yyyy-MM-dd'
				       type="date"
				       placeholder="选择日期" disabled>
				     </el-date-picker>
			  </div>
			  <div class="item2">
				  
				  <div>
					  <ul>
					  	<li><span class="se-pl" style="margin-right:10px;">时段</span></li>
					  	<li>
							<el-select v-model="timeFrame" clearable placeholder="请选择">
							   <el-option
							     v-for="(item,index) in timeList"
							     :key="index"
							     :label="item.start+'-'+item.end"
							     :value="item.start+'-'+item.end">
							   </el-option>
							 </el-select>
						</li>
					  	<!-- <li>到</li>
					  	<li>
							<el-select v-model="endTimer" clearable placeholder="开始时段">
							  <el-option
							    v-for="(item,index) in timeList"
							    :key="index"
							    :label="item.end"
							    :value="item.end">
							  </el-option>
							 </el-select>
						</li> -->
					  </ul>
				  </div>
			  </div>
		  </div>
		  
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submitRecord()" :disabled="!dialogVisible">生成中奖记录</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    export default {
        components: { Pagination },
        data() {
            return {
                form: {
                    page: 1,
                    limit: 10
                },
                name: '',//姓名
                phone: '',//电话
                start: '',
                end:'',
                timer: '',//时间段
                initData:[],
                total:'',
                tableList:[],
				timeList:[],//时段
				dialogVisible:false,//对话框
				winningTimer:'2020-1-24',//添加开奖时间
				timeFrame:'',//添加时段
				
				
				startTimer: '',//开始时间段
				endTimer:'',//结束时间段
				hour:['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],//时间list
			}
        },
		created(){
			this.getTimeList();
			this.getList();
		},
        mounted() {
			let date = new Date();
			let h = date.getHours();
			this.startTimer = h;
			this.endTimer = (h+1)>=24 ? 0 : h+1;
		},
		watch:{
			// 'startTimer':function(a,b){
			// 	a = Number(a);
			// 	if(a!=''){
			// 		this.endTimer=this.timeList
			// 	}
			// },
			// 'endTimer':function(a,b){
			// 	a = Number(a);
			// 	if(a==''){
					
			// 	}
			// }
		},
        methods: {
			//中奖记录提交
			submitRecord(){
				if(this.winningTimer == '' || this.winningTimer == null){
					this.$message({message:"未选择时间！", type: 'error'});
					return
				}
				if(this.timeFrame == '' || this.timeFrame == null){
					this.$message({message:"未选择时段！", type: 'error'});
					return
				}
				this.$confirm('是否生成中奖记录！', '提示', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					  type: 'warning'
					}).then(() => {
						let date = this.$util.formatDate.format(new Date(this.winningTimer),'yyy-MM-dd');
						let arr = this.timeFrame.split('-')
						var params={
							date:date,
							start:(arr[0]== '' || arr[0]== null) ? '':arr[0],
							end:(arr[1]== '' || arr[1]== null) ? '':arr[1]
						}
						this.axios({
							method: "post",
							url: this.$local.http+this.$api.genRewardRecords,
							params: params,
						}).then(res=>{
							if (res.data.success) {
								this.$message({message:res.data.msg, type: 'success'});
								this.dialogVisible=false
								this.timeFrame = '';
								//数据刷新
								this.getTimeList();
								this.getList();
							}else {
								this.$message({message:res.data.msg, type: 'error'});
								this.dialogVisible=false
								this.timeFrame = '';
							}
						}).catch(res=>{
							this.$message({message:res.data.msg, type: 'error'});
							this.dialogVisible=false
							this.timeFrame = '';
						})
					}).catch(() => {});
				
			},
			
			//获取时段列表
			getTimeList(){
			    var params={}
			    this.axios({
			        method: "get",
			        url: this.$local.http+this.$api.getRewardTimeRange,
			        params: params,
			    }).then(res=>{
			    	if(res.data.success) {
			            this.timeList=res.data.data;
			        } else {
			            this.$message({message:res.data.msg, type: 'error'});
			            this.timeList=[]
			        }
			    }).catch(res=>{
			        this.$message({message:res.data.msg, type: 'error'});
			        this.timeList=[]
			    })
			},
            getList(){
				this.$store.commit('setLoadingBool',true);
				//因为后退的情况下，在重新设置时间范围，会出现 undefined 等情况
                let arr = this.timer.split('-')
				this.start =arr[0];
				this.end =arr[1];
				console.log(arr)
				if (arr[0] == null || arr[0] == '') {
				    this.start ='';
				    this.end ='';
				}
				var params={
					phone:this.phone,
					name:this.name,
					pageNum: this.form.page,
					pageSize:this.form.limit,
					start: this.start,
					end:this.end
				}
				 this.axios({
                    method: "get",
                    url: this.$local.http+this.$api.getRewardList,
                    params: params,
                }).then(res=>{
					this.$store.commit('setLoadingBool',false);
					if (res.data.success) {
                        this.initData=res.data.data;
                        this.total=this.initData.total;
						console.log(this.initData)
						this.getData()
                    }else {
                        this.$message({message:res.data.msg, type: 'error'});
                        this.initData=[]
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'});
                    this.initData=[]
                })
            },
            getData() {//初始化 
                let arr = this.timer.split('-')
				this.start =arr[0];
				this.end =arr[1];
                if (arr[0] == null || arr[0] == '') {
                    this.start ='';
                    this.end ='';
                }
                var params={
                	phone:this.phone,
                	name:this.name,
                	pageNum: this.form.page,
                	pageSize:this.total,
                	start: this.start,
                	end:this.end
                }
				this.axios({
				    method: "get",
				    url: this.$local.http+this.$api.getRewardList,
				    params: params,
				}).then(res=>{
				    if (res.data.success) {
				        this.tableList=res.data.data.list;
				    }else {
				        this.$message({message:res.data.msg, type: 'error'});
				         this.tableList=[]
				    }
				}).catch(res=>{
				    this.$message({message:res.data.msg, type: 'error'});
				    this.tableList=[]
				})
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
				       const tHeader = ['用户ID','真实姓名','手机号','中奖等级','开始时间','结束时间','创建时间'];
				       const filterVal = ['user_id','real_name','phone','reward_level','start_time','end_time','created_at'];
				       const list = this.tableList;
				       const data = this.formatJson(filterVal, list);
				       export_json_to_excel(tHeader, data,'红包中奖记录');
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
				this.phone = this.name = '';
				this.timer = '';
				this.getList();
			}
        },
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
	.el-select-dropdown__item {color: rgb(72, 106, 103);background-color: #fff;}
	.el-select-dropdown__item.hover {background-color: #18c79c;}
	/* 对话框弹出 */
	.dialog-item{width:100%}
	.dialog-item .item1,.dialog-item .item2{float:left}
	.dialog-item .item2 ul{display: flex;align-items: center;padding-left: 20px;margin: 0;}
	/* .dialog-item .item2 ul li:nth-child(2){width: 100px;} */
	.dialog-item .item2 ul li:nth-child(3){margin: 0 5px;}
	/* .dialog-item .item2 ul li:nth-child(4){width: 100px;} */
</style>
