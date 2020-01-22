<template>
    <div class="app-container">
        <!-- 01.查询框 -->
        <div class="head-ed">
            <ul>
                <li>
                    <span class="se-pl">团队长ID</span>
                    <div class="inputes">
                        <el-input clearable v-model="headman_id" placeholder="精确查询" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">团队长电话</span>
                    <div class="inputes">
                        <el-input v-model="headman_phone" placeholder="精确查询" style="width:185px;" clearable></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">团队长姓名</span>
                    <div class="inputes">
                        <el-input v-model="headman_name" placeholder="模糊查询" style="width:185px;" clearable></el-input>
                    </div>
                </li>
                <li>
                    <el-row class="inputes">
                        <el-button @click="queryHeadman()">查询</el-button>
                    </el-row>
                </li>
                <li>
                    <el-row class="inputes">
                        <el-button @click="resetQueryCondition">重置</el-button>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-button  @click="dialogFormVisible = true"  type="info">添加团队长</el-button>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-button  @click="exportHeadman()"  type="info">导出Excel表</el-button>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-button  @click="dialogFormVisible2 = true"  type="info">开放库存</el-button>
                    </el-row>
                </li>
            </ul>
        </div>
        <!-- 02.团队长列表 -->
        <h6 class="h6" v-if="total>0">共{{total}}条记录，{{initHeadmanData.pages}}页。当前为第{{form.page}}页</h6>
        <el-table 
		:data="initHeadmanData.list"
		v-loading="this.$store.getters.getLoadingBool"
		element-loading-text="拼命加载中..."
		border fit highlight-current-row style="width: 100%">
            <el-table-column  type="index" align="center" label="序号" width="60px">
            </el-table-column>
            <el-table-column align="center" label="姓名" min-width>
                <template slot-scope="scope">
                    <span>{{ scope.row.headmanName }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="ID" >
                <template slot-scope="scope">
                    <span>{{ scope.row.headmanId }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="电话" >
                <template slot-scope="scope">
                    <span>{{ scope.row.headmanPhone }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="上级ID" >
                <template slot-scope="scope">
                    <span>{{ scope.row.superiorId}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="上级电话">
                <template slot-scope="scope">
                    <span>{{ scope.row.superiorPhone}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="拥有下级数量">
                <template slot-scope="scope">
                    <span>{{scope.row.subordinateNumber}}</span>
                </template>
            </el-table-column>
            <el-table-column :formatter="this.formatTime"  align="center" label="创建时间">
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="delHeadman(scope)">删除</el-button>
                    <el-button type="text" @click="queryHeadmanMoreInfo(scope)" size="small">更多</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 03.分页条 -->
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="queryHeadman" />
        <!-- 04.更多信息对话框 -->
        <el-dialog title="团队长信息" :visible.sync="dialogTableVisible">
            <div class="dialog1">
                <div class="dialog1">
                    <span> 团队长ID：</span><span class="span2">{{headman_id_m}}</span>
                    <span class="span1"> 总购买数：</span><span class="span2">待开发</span>
                    <span class="span1"> 总赠送数：</span><span class="span2">待开发</span>
                </div>
                <div>
                    <span> 赠送剩余：</span><span class="span2">待开发</span>
                    <span class="span1"> 库存剩余：</span><span class="span2">待开发</span>
                </div>
            </div>
            <div class="dialog1">
                <span> 下级列表：</span>
            </div>
            <el-table :data="subordinateListData" border>
                <el-table-column  type="index" align="center" label="序号" ></el-table-column>
                <el-table-column property="superior_id" align="center" label="下级ID" ></el-table-column>
                <el-table-column property="superior_name" align="center" label="下级姓名" ></el-table-column>
                <el-table-column property="superior_phone" align="center" label="下级电话" min-width></el-table-column>
            </el-table>
        </el-dialog>
        <!-- 05.添加团队长对话框-->
        <el-dialog title="添加团队长" :visible.sync="dialogFormVisible"  >
            <el-form :model="addform">
                <el-form-item label="团队长编号：">
                    <el-input v-model="addform.headman_id_s" placeholder="请输入团队长ID（必填）" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="团队长姓名：">
                    <el-input v-model="addform.nick_name" placeholder="请输入团队长姓名（选填）" style="width: 200px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addHeadman">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 06.给团队长添加库存对话框-->
        <el-dialog title="给团队长开放库存" :visible.sync="dialogFormVisible2"  >
            <div class="dialog1">
                <span> 当前库存数量：</span><span class="span2">{{init_add_number}}</span>
            </div>
            <el-form :model="addform">
                <el-form-item label="开放库存至：">
                    <el-input v-model="addform.add_number" placeholder="请输入库存数量（必填）" style="width: 200px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="addHeadmanStock">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name: 'headman',
        components: { Pagination },
        data() {
            return {
                form: {
                    page: 1,
                    limit: 10
                },
                addform: {
                    headman_id_s:'',//团队长id，添加团队长时使用
                    nick_name:'',//团队长姓名，添加团队长时使用
                    add_number:'',//更新库存至多少 || 当前库存是多少
                },
                dialogTableVisible: false,//关闭查看团队长更多信息对话框
                dialogFormVisible: false,//关闭添加团队长对话框
                dialogFormVisible2: false,//关闭给团队长开放库存对话框
                headman_id_m:'',//团队长id，查看更多信息时使用
                headman_id:'',//团队长id，查询/删除时使用
                headman_phone:'',//团队长电话，查询时使用
                headman_name:'',//团队长姓名，查询时使用
                aging_or_not:1,//是否分页，0不分页，1要分页
                exportHeadmanData:[],//导出团队长
                initHeadmanData:[],//团队长初始信息
                headmanMoreData:[],//团队长更多信息
                subordinateListData:[],//团队长下级列表信息
                total:'',//总共多少个团队长
                login_user_id:'',//当前登陆用户ID
                init_add_number:'',//当前库存数量
                user:JSON.parse(sessionStorage.getItem('user')),//当前登陆用户
            }
        },
        mounted() {
            //页面加载时初始化的方法
            this.queryHeadman();//团队长列表
            this.initAddHeadmanStock();//当前库存数据回显
        },
        methods: {
            //f01.添加团队长
            addHeadman() {
                //关闭对话框
                this.dialogFormVisible = false;
                const formDatas=new FormData();
                formDatas.append('headman_id',this.addform.headman_id_s);
                formDatas.append('nick_name',this.addform.nick_name);
                //发送请求
                this.axios({
                    method: "POST",
                    url: this.$local.http+this.$api.addHeadman,
                    data:formDatas,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    if (res.data.success) {
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        });
                        //清空数据
                        this.addform.headman_id_s = '';
                        this.addform.nick_name = '';
                        //重新加载团队长列表
                        this.queryHeadman();
                    }else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                }).catch(res=>{
                    this.$message.error(res.data.msg);
                })
            },

            //f02.删除团队长
            delHeadman(scope) {
                this.$confirm('是否确认删除该团队长', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var params={
                        headman_id:scope.row.headmanId
                    }
                    this.axios({
                        method: "post",
                        url: this.$local.http+this.$api.delHeadman,
                        params: params,
                    }).then(res=>{
                        if (res.data.success) {
                            this.$message({message:res.data.msg, type: 'success'});
                            //清空数据
                            this.addform.headman_id = '';
                            //重新加载团队长列表
                            this.queryHeadman();
                        }else {
                            this.$message({message:res.data.msg, type: 'error'});
                        }
                    }).catch(res=>{
                        this.$message({message:res.data.msg, type: 'error'});
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //f03.查询团队长
            queryHeadman(){
                var a = new Date().getTime()+"";
				this.$store.commit('setLoadingBool',true);
                var params={
                    headman_id:this.headman_id,
                    headman_phone:this.headman_phone,
                    headman_name:this.headman_name,
                    aging_or_not:this.aging_or_not,
                    pageNum: this.form.page,
                    pageSize:this.form.limit,
                }
                this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.queryHeadman,
                    params: params,
                }).then(res=>{
					this.$store.commit('setLoadingBool',false);
                    if (res.data.success) {
                        this.initHeadmanData=res.data.data;
                        this.total=this.initHeadmanData.total;
						this.getExportHeadmanData();//获得导出团队长数据，不要写在下面，ajax是异步请求
                    }else {
                        this.$message({message:res.data.msg, type: 'error'});
                        this.initHeadmanData=[]
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'});
                    this.initHeadmanData=[]
                })
            },

            //f04.查看团队长更多信息
            queryHeadmanMoreInfo(scope) {
                this.dialogTableVisible = true;//显示弹框
                this.headman_id_m = scope.row.headmanId //获得要查看的团队长ID
                var params={
                    headman_id:this.headman_id_m //获得要查看的团队长ID
                }
                this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.queryHeadmanMoreInfo,
                    params: params,
                }).then(res=>{
                    if (res.data.success) {
                        this.headmanMoreData=res.data.data;
                        this.subordinateListData=res.data.data.subordinateList;
                    }else {
                        this.$message({message:res.data.msg, type: 'error'});
                        this.headmanMoreData=[]
                        this.subordinateListData=[]
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'});
                    this.headmanMoreData=[]
                    this.subordinateListData=[]
                })
            },

            //f05.给团队长开放库存
            addHeadmanStock() {
                this.login_user_id = this.user.id //获得当前登陆用户ID
                var params={
                    add_number:this.addform.add_number,//开放库存至
                    login_user_id:this.login_user_id //获得当前登陆用户ID
                }
                this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.addHeadmanStock,
                    params: params,
                }).then(res=>{
                    if (res.data.success) {
                        this.$message({message:res.data.msg,type:'success'});
//                        this.dialogFormVisible2 = false;
                        this.initAddHeadmanStock();
                    }else {
                        this.$message({message:res.data.msg, type: 'error'});
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'});
                })
            },

            //f06.给团队长开放库存--数据回显
            initAddHeadmanStock() {
                this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.initAddHeadmanStock,
                    params: '',
                }).then(res=>{
                    if (res.data.success) {
                        this.init_add_number=res.data.data;
                    }else {
                        this.$message({message:res.data.msg, type: 'error'});
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'});
                })
            },

            //f07.时间格式化：时间戳转年月日时分秒
            formatTime(row, column, cellValue){
                return this.formatterTime(row.createdTime);
            },
            formatterTime(a){//时间格式转换器：2019-6-4 15:13:16
                if(a=="" || a==null || a==undefined){
                    return "暂无数据";
                }
                var time = new Date(a);
                var yyyy = time.getFullYear();
                var month = this.add0(time.getMonth()+1);
                var dd = this.add0(time.getDay());
                var hh = this.add0(time.getHours());
                var mm = this.add0(time.getMinutes());
                var ss = this.add0(time.getSeconds());
                return yyyy +"-"+month+"-"+dd+" "+hh+":"+mm+":"+ss;
            },
            add0(m){//月和天小于10要补0
                return m<10?('0'+m):m;
            },

            //f08.重置查询条件
            resetQueryCondition(){
				// if (!(this.headman_id==''&& this.headman_phone==''&& this.headman_name=='')) {
					
				// }
				//清除查询条件
				this.headman_id = '';
				this.headman_phone = '';
				this.headman_name = '';
				//重新加载数据
				this.queryHeadman();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
                
            },

            //f09.导出团队长数据
            exportHeadman() {
				this.$confirm('确定要导出表格数据么？', '提示', {
				    confirmButtonText: '确定',
				    cancelButtonText: '取消',
				    type: 'warning'
				}).then(() => {
					require.ensure([], () => {
					    for (var i in this.exportHeadmanData) {
					        this.exportHeadmanData[i].xuhao=++i;
					    }
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['序号','团队长ID','团队长姓名','团队长电话'];
					    const filterVal = ['xuhao','headmanId', 'headmanName','headmanPhone'];
					    const list = this.exportHeadmanData;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data, '团队长名单');
					});
				}).catch(() => {
				    this.$message({
				        type: 'info',
				        message: '取消导出'
				    });
				});
				
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            //f10.获得导出团队长数据；并导出数据
            async getExportHeadmanData(){
				// const loading = this.$loading({lock: true, text: '拼命加载中...',});
                this.aging_or_not ='0';//设置为不分页
                var params={
                    headman_id:this.headman_id,
                    headman_phone:this.headman_phone,
                    headman_name:this.headman_name,
                    aging_or_not:this.aging_or_not,
                }
                let res = await this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.queryHeadman,
                    params: params,
                })
				if (res.data.success) {
				    this.exportHeadmanData=res.data.data;
				    this.aging_or_not = '1';//还原设置为分页
					
				}else {
				    this.$message({message:res.data.msg, type: 'error'});
				    this.aging_or_not = '1';//还原设置为分页
				}
				// loading.close();
            },
        },
    }
</script>

<style scoped >
    .app-container{width: 100%;background-color: #fff;padding: 20px;}
    .inputes {display: inline-block !important;}
    .se-pl {margin-right: 10px;}
    .head-ed {margin-top: 10px;}
    .head-ed ul{overflow: hidden;padding: 0;}
    .head-ed ul li{float: left;margin: 15px 1.5% 0 0;}
    .sed-font-t>div {float: left;}
    .h6{padding: 10px 5px;font-size: 16px;}
    .settled_nav_left ul{overflow: hidden;}
    .settled_nav_left ul li{float: left;width: 28%;padding: 10px 0;}
    .settled_nav_left ul li:nth-child(3){float: left;width: 44%;padding: 10px 0;}
    .settled_nav_left ul li:nth-child(1) p{padding-right:42px;}
    .settled_nav_left ul li p{font-size: 14px;line-height: 34px;padding: 0 15px;color: #000;float: left;text-align: right;}
    .settled_nav_left ul li input{width: 50%;line-height: 30px;padding-left: 10px;float: left;border: 1px solid rgb(191, 217, 214);}
    .dialog_ul li{float: left;width: 30%;line-height: 30px;font-size: 14px;overflow: hidden;}
    .dialog_ul li p{padding-right: 10px;float: left;}
    .dialog1{ font-size: 14px;font-weight: 600;padding-bottom: 10px}
    .span1{padding-left: 60px}
    .span2{font-weight: 500;}
</style>

