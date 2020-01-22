<template>
	<!-- 上下级记录 -->
	<div class="app-container">
        <div class="head-ed">
            <ul>
                <li>
                    <span class="se-pl">用户ID</span>
                    <div class="inputes">
                        <el-input clearable v-model="name" placeholder="请输入" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">联系电话</span>
                    <div class="inputes">
                        <el-input v-model="contact" placeholder="请输入" style="width:185px;" clearable></el-input>
                    </div>
                </li>
                <!--<li>-->
                    <!--<span class="se-pl">文交所账号</span>-->
                    <!--<div class="inputes">-->
                        <!--<el-input v-model="wjs_num" placeholder="请输入" style="width:185px;" clearable></el-input>-->
                    <!--</div>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<span class="se-pl">和平村账号</span>-->
                    <!--<div class="inputes">-->
                        <!--<el-input v-model="hpc_num" placeholder="请输入" style="width:185px;" clearable></el-input>-->
                    <!--</div>-->
                <!--</li>-->
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
                        <el-button @click="showDialog()">购买设置</el-button>
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
            <!-- <el-table-column width="80px" align="center" label="标号 ">
                <template slot-scope="scope">
                    <span>{{scope.row.relationId}}</span>
                </template>
            </el-table-column> -->
            <!--<el-table-column align="center" label="文交所账号" width="140px">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.userName }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" label="和平村账号" width="140px">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.userName }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" label="用户姓名" width="250px">
                <template slot-scope="scope">
                    <span>{{ scope.row.userName }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="用户ID" width="140px">
                <template slot-scope="scope">
                    <span>{{ scope.row.userId }}</span>
                </template>
            </el-table-column>
            <el-table-column width="130px" align="center" label="联系方式">
                <template slot-scope="scope">
                    <span>{{ scope.row.phone }}</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="绑定时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.created_at}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="所属上级ID">
                <template slot-scope="scope">
                    <span>{{ scope.row.superId}}</span>
                </template>
            </el-table-column>
            <el-table-column width="180px" align="center" label="所属上级用户名">
                <template slot-scope="scope">
                    <span>{{ scope.row.superName}}</span>
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="所属上级联系方式" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.superPhone}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="拥有下级数量">
                <template slot-scope="scope">
                    <span>{{scope.row.lowerLevelNum}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="djClick(scope)" size="small">查看明细</el-button>
                    <!-- <el-button size="small" @click="dialogFormShow(scope)">更改上级</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />


        <!-- <el-dialog title="更改上级" :visible.sync="dialogFormVisible">
            <h6 class="dialog_h6">当前所属上级</h6>
            <ul class="dialog_ul">
                <li>
                    <p>ID</p><p>{{id}}</p>
                </li>
                <li>
                    <p>用户姓名</p><p>{{aname}}</p>
                </li>
                <li>
                    <p>联系方式</p><p>{{aphone}}</p>
                </li>
            </ul>
            <h6 class="dialog_h6">更改上级</h6>
            <ul class="dialog_ul">
                <li>
                    <p>ID</p>
                    <el-autocomplete class="inline-input" value-key='id'
                                     v-model="userId" :fetch-suggestions="QuerySalesOrderShop"
                                     placeholder="请输入内容" :trigger-on-focus="false"
                                     @select="handleSelect">
                    </el-autocomplete>
                </li>
                <li>
                    <p>用户姓名</p><p>{{yname}}</p>
                </li>
                <li>
                    <p>联系方式</p><p>{{yphone}}</p>
                </li>
            </ul>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogForm()">确 定</el-button>
            </div>
        </el-dialog> -->
		
		
        <el-dialog title="购买设置" :visible.sync="dialogShow">
            <ul class="dialogShow_ul">
                <li>
                    <p>购买者ID：</p>
                    <el-input v-model="purchaserID" placeholder="请输入" style="width:300px;" clearable></el-input>
                </li>
                <li>
                    <p>购买价格：</p>
                    <el-input v-model="buyingPrice" placeholder="请输入" style="width:300px;" clearable></el-input>
                </li>
                <li>
                    <p>购买数量：</p>
                    <el-input v-model="purchaseQuantity" placeholder="请输入" style="width:300px;" clearable></el-input>
                </li>
                <li>
                    <p>订单ID：</p>
                    <el-input v-model="orderID" placeholder="请输入" style="width:300px;" clearable></el-input>
                </li>
            </ul>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogShow = false">取 消</el-button>
                <el-button type="primary" @click="sendWjsGive()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name: 'superior',
        components: { Pagination },
        data() {
            return {
                dialogFormVisible: false,
                dialogShow:false,
                form: {
                    page: 1,
                    limit: 10
                },
                name: '',
                contact: '',
                id:'',
                aname:'',
                aphone:'',
                wjs_num:'',
                hpc_num:'',
                initData:[],
                total:'',
                userId:'',
                yname:'',
                yphone:'',
                restaurants: [],
                areaNames:{},
                tableList:[],
                purchaserID:'',
                buyingPrice:'',
                purchaseQuantity:'',
                orderID:'',
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            dialogFormShow(scope){
                this.id=scope.row.superId;
                this.aname=scope.row.superName;
                this.aphone=scope.row.superPhone;
                this.dialogFormVisible=true;
            },
            showDialog(){
                this.dialogShow=true;
            },
            getList(){
				this.$store.commit('setLoadingBool',true);
				var params={
					userId:this.name,
					phone:this.contact,
					pageNum: this.form.page,
					pageSize:this.form.limit,
				}
                this.axios({
                    method: "get",
                    url: this.$local.http+this.$api.queryRelation,
                    params: params,
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
                    // this.$message({message:res.data.msg, type: 'error'});
                    this.initData=[]
                })
            },
            djClick(scope) { //查看详情
                this.$router.push({path:'/subordinate',query:{userName:scope.row.userName,phone:scope.row.phone,
                        userId:scope.row.userId,superId:scope.row.superId,superPhone:scope.row.superPhone,
                        lowerLevelNum:scope.row.lowerLevelNum
                    }})
            },
            // 获取门店数据
            QuerySalesOrderShop (queryString, cb) {
                let likeThis=this;
                const formDatas=new FormData()
                formDatas.append('userId',this.userId)
                        this.axios({
                            method: "POST",
                            url: this.$local.http+this.$api.queryUserId,
                            data:formDatas,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(res=>{
                            if (res.data.success) {
                                let correctAreaNames=[];
                                for (let i of res.data.data) {
                                    correctAreaNames.push({value:i.id,nick_name: i.nick_name,phone:i.phone})
                                     //ps:必须为每个对象增加value字段！！因为autocomplete只识别value字段并在下拉列中显示
                                }
                                this.restaurants = res.data.data;
                                likeThis.areaNames=correctAreaNames;
                                let areaNames = likeThis.areaNames;
                                let results =areaNames;
                                //  let results = queryString ? areaNames.filter(likeThis.createFilter(queryString)) : areaNames;
                                // 调用 callback 返回建议列表的数据
                                cb(results);
                            }
                        }).catch(res=>{
                          // this.$message({message:res.data.msg, type: 'error'})
                         })
            },
            createFilter(queryString) {
                return (areaNames) => {
                    return (areaNames.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0 );
                };
            },
            handleSelect(item) {
                this.userId=item.value;
                this.yname=item.nick_name;
                this.yphone=item.phone;
            },
            //更改上级
            dialogForm(){
                const formDatas=new FormData();
                formDatas.append('userId',this.userId);
                formDatas.append('superUserId',this.id);
                	this.axios({
                		method: "post",
                		url: this.$local.http + this.$api.updateSuperUser,
                        data:formDatas,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                	}).then(res => {
                        if (res.data.success == true) {
                            this.$message({message: res.data.msg, type: 'success'})
                        } else {
                            this.$message({message: res.data.msg, type: 'warning'});
                        }
                	})
            },
            async getData() { //初始化 
                let params={
                    userId:this.name,
                    phone:this.contact,
                    pageNum: '',
                    pageSize: '',
                }
                let res = await this.axios({
                    method: "get",
                    url: this.$local.http + this.$api.queryRelationAll,
                    params: params,
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
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['标号','用户名','用户ID','联系方式','绑定时间','所属上级ID','所属上级用户名','所属上级联系方式', '拥有下级数量'];
					    const filterVal = ['relationId','userName','userId','phone','created_at','superId','superName','superPhone', 'lowerLevelNum',];
					    const list = this.tableList;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data,'上下级记录');
					});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消导出'
                    });
                });
            },
            sendWjsGive(){
                const formDatas=new FormData();
                let user=JSON.parse(sessionStorage.getItem('user'));
                formDatas.append('login_user_id',user.id);
                formDatas.append('buy_user_id',this.purchaserID);
                formDatas.append('buy_price',this.buyingPrice);
                formDatas.append('buy_number',this.purchaseQuantity);
                formDatas.append('order_id',this.orderID);
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.addWjsGive,
                    data:formDatas,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.success == true) {
                        this.$message({message: res.data.msg, type: 'success'})
                        this.dialogShow = false
                    } else {
                        this.$message({message: res.data.msg, type: 'warning'});
                    }
                })
            },
			//重置
			reset(){
				
				// if (!(this.contact=='' && this.name=='')) {
					
				// }
				this.contact = this.name = '';
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			}
        },
    }
</script>

<style scoped >
    .app-container{width: 100%;background-color: #fff;padding: 20px;}
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
    .edit-input {
        padding-right: 100px;
    }
    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 10px;
    }
    /deep/.el-dialog__footer{padding-bottom:30px!important;}
    /deep/.cell{padding: 0 5px!important;}
    .time{width:65%;float: left; }
    /deep/.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
        width: 100%;
        padding: 3px 0;
    }
    .h6{padding: 10px 5px;font-size: 16px;}
    .p{font-size: 14px;padding: 10px 5px;}
    .settled_nav{overflow: hidden;}
    .settled_nav_left{width: 80%;}
    .settled_nav_left ul{overflow: hidden;}
    .settled_nav_left ul li{float: left;width: 28%;padding: 10px 0;}
    .settled_nav_left ul li:nth-child(3){float: left;width: 44%;padding: 10px 0;}
    /*.settled_nav_left ul li:nth-child(6){float: left;width: 44%;padding: 10px 0;}*/
    .settled_nav_left ul li:nth-child(1) p{padding-right:42px;}
    /*.settled_nav_left ul li:nth-child(6) p{font-size: 14px;line-height: 34px;padding: 0 15px;color: #000;width: 20%;float: left;}*/
    .settled_nav_left ul li p{font-size: 14px;line-height: 34px;padding: 0 15px;color: #000;float: left;text-align: right;}
    .settled_nav_left ul li input{width: 50%;line-height: 30px;padding-left: 10px;float: left;border: 1px solid rgb(191, 217, 214);}
    .settled_nav_con{width: 6%;margin: 50px auto 0;}
    .settled_nav_right{width: 14%;margin: 50px auto 0;}
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
    }
    .daili{line-height: 34px;text-align: center;}
    .el-dropdown-link{color: #42b983;outline: none;}
    .searchDiv{background: #18c79c}
    .dialog_h6{font-size: 14px;}
    .dialog_ul{overflow: hidden;}
    .dialog_ul li{float: left;width: 30%;line-height: 30px;font-size: 14px;overflow: hidden;}
    .dialog_ul li p{padding-right: 10px;float: left;}
    .dialogShow_ul li{overflow: hidden;line-height: 50px;font-size: 14px;}
    .dialogShow_ul li p{float: left;width: 15%;text-align: right;}

</style>

