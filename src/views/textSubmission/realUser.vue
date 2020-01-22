<template>
    <div class="app-container">
        <!-- 01.查询框 -->
        <div class="head-ed">
            <ul>
                <li>
                    <span class="se-pl">店铺ID：</span>
                    <div class="inputes">
                        <el-input clearable v-model="shop_id" placeholder="精确查询" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">店铺名称</span>
                    <div class="inputes">
                        <el-input clearable v-model="shop_name" placeholder="模糊查询" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">用户ID</span>
                    <div class="inputes">
                        <el-input clearable v-model="userReal_id" placeholder="精确查询" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">用户电话</span>
                    <div class="inputes">
                        <el-input v-model="userReal_phone" placeholder="精确查询" style="width:185px;" clearable></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">用户姓名</span>
                    <div class="inputes">
                        <el-input v-model="userReal_name" placeholder="模糊查询" style="width:185px;" clearable></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">审核状态</span>
                    <el-select v-model="value" placeholder="请选择" style="width:185px;">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <el-row class="inputes">
                        <el-button @click="queryUserReal()">查询</el-button>
                    </el-row>
                </li>
                <li>
                    <el-row class="inputes">
                        <el-button @click="resetQueryCondition">重置</el-button>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-button  @click="dialogFormVisible = true"  type="info">添加用户</el-button>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-button  @click="exportRealUser()"  type="info">导出Excel表</el-button>
                    </el-row>
                </li>
            </ul>
        </div>
        <!-- 02.用户列表 -->
        <el-table 
		:data="initUserRealData.list"
		v-loading="this.$store.getters.getLoadingBool"
		element-loading-text="拼命加载中..." 
		border fit highlight-current-row style="width: 100%">
            <el-table-column  type="index" align="center" label="序号" width="50px">
            </el-table-column>
            <el-table-column align="center" label="用户ID" width="75px">
                <template slot-scope="scope">
                    <span>{{ scope.row.user_id }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="真实姓名" width="100px">
                <template slot-scope="scope">
                    <span>{{ scope.row.real_name }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="店铺ID" width="100px">
                <template slot-scope="scope">
                    <span>{{ scope.row.shop_id }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="店铺名称" width="100px">
                <template slot-scope="scope">
                    <span>{{ scope.row.shop_name }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="电话" width="130px">
                <template slot-scope="scope">
                    <span>{{ scope.row.phone }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="身份证号" width="170px">
                <template slot-scope="scope">
                    <span>{{ scope.row.identity_card}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="手持身份证" width="180px">
                <template slot-scope="scope">
                    <a :href="scope.row.hand_identity_card_image" title="手持身份证" target="_blank">
                        <img class="hand_identity_card_image" :src="scope.row.hand_identity_card_image"  />
                    </a>
                </template>
            </el-table-column>
            <el-table-column align="center" label="银行卡号" width="180px">
                <template slot-scope="scope">
                    <span>{{scope.row.bank_card}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="开户支行" width="170px">
                <template slot-scope="scope">
                    <span>{{scope.row.open_branch_bank}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="170px">
                <template slot-scope="scope">
                    <span>{{scope.row.create_time}}</span>
                </template>
            </el-table-column>
            <el-table-column :formatter="this.formatCheckState"  align="center" label="审核状态" width="80px">
            </el-table-column>
            <el-table-column align="center" label="操作" width="180px">
                <template slot-scope="scope">
                    <el-button type="text" @click="delUserReal(scope)">删除</el-button>
                    <el-button type="text" @click="updateUserReal(scope)" size="small">编辑</el-button>
                    <el-button type="text" @click="checkRealUser(scope,1)" size="small">通过</el-button>
                    <el-button type="text" @click="checkRealUser(scope,0)" size="small">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 03.分页条 -->
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="queryUserReal" />
        <!-- 04.添加用户对话框-->
        <el-dialog title="添加/修改用户" :visible.sync="dialogFormVisible"  >
            <el-form :model="addform">
                <el-form-item label="用户编号：">
                    <el-input v-model="addform.apply_user_id" placeholder="请输入用户ID（必填）" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名：">
                    <el-input v-model="addform.real_name" placeholder="请输入用户真实姓名（选填）" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号：">
                    <el-input v-model="addform.bank_card" placeholder="请输入用户银行卡号，修改无效（选填）" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="开户支行：">
                    <el-input v-model="addform.open_branch_bank" placeholder="请输入用户开户支行（选填）" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="身份证号：">
                    <el-input v-model="addform.identity_card" placeholder="请输入用户身份证号（选填）" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="手持身份证：">
                    <input type="file" ref="avatarInput" @change="changeImage($event)" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancleAddUserReal">取 消</el-button>
                <el-button @click="delAddUserRealData">清 空</el-button>
                <el-button type="primary" @click="addUserReal">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name: 'realUser',
        components: { Pagination },
        data() {
            return {
                options: [{
                    value: '-1',
                    label: '待审核'
                }, {
                    value: '0',
                    label: '未通过'
                }, {
                    value: '1',
                    label: '已通过'
                },  {
                    value: '',
                    label: '全部'
                }],
                form: {
                    page: 1,
                    limit: 10
                },
                addform: {
                    login_user_id:'',
                    apply_user_id:'',
                    real_name:'',
                    identity_card:'',
                    hand_identity_card_image:'',
                    bank_card:'',
                    open_branch_bank:''
                },
                initUserRealData:[],//实名用户列表数据
                dialogFormVisible: false,//关闭添加实名用户对话框
                userReal_id:'',//用户id，查询时使用
                shop_id:'',//店铺id，查询时使用
                shop_name:'',//店铺名称，查询时使用
                userReal_phone:'',//用户电话，查询时使用
                userReal_name:'',//用户姓名，查询时使用
                value: '',//用户审核状态，查询时使用
                total:'',//总共多少个用户
                user:JSON.parse(sessionStorage.getItem('user')),//当前登陆用户
                login_user_id:'',//当前登陆用户ID
                avatar:'',
                check_userReal_id:'',//实名用户id，审核时使用
                check_check_state:'',//用户审核状态，审核时使用
                exportRealUserData:[],//导出实名用户
            }
        },
        mounted() {
            this.queryUserReal();//用户列表
        },
        methods: {
            //f01.修改/添加用户
                addUserReal() {
                this.login_user_id = this.user.id;
                //--------------------------------------------------------------------------------
                let files = this.$refs.avatarInput.files;
                let fileData = {};
                if(files instanceof Array) {
                    fileData = files[0]
                } else {
                    fileData = this.addform.hand_identity_card_image
                }
                //--------------------------------------------------------------------------------
                    // console.log("-------------------------")
                    // console.log(this.addform.open_branch_bank)
                const formDatas=new FormData();
                formDatas.append('login_user_id',this.login_user_id);
                formDatas.append('apply_user_id',this.addform.apply_user_id);
                formDatas.append('real_name',this.addform.real_name);
                formDatas.append('identity_card',this.addform.identity_card);
                formDatas.append('hand_identity_card_image',fileData);
                formDatas.append('bank_card',this.addform.bank_card);
                formDatas.append('open_branch_bank',this.addform.open_branch_bank);
                //发送请求
                this.axios({
                    method: "POST",
                    url: this.$local.http+this.$api.addUserReal,
                    data:formDatas,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    if (res.data.success) {
                        this.$message({message:res.data.msg,type: 'success'});//提示信息
                        this.queryUserReal();//重新加载用户列表
                    }else {
                        this.$message({message: res.data.msg,type: 'warning'});
                    }
                    //关闭对话框
                    this.dialogFormVisible = false;
                }).catch(res=>{
                    this.$message.error(res.data.msg);
                    //关闭对话框
                    this.dialogFormVisible = false;
                })
            },

            //f02.删除用户
            delUserReal(scope) {
                this.$message.error("该功能还在开发中");
            },

            //f03.查询用户
            queryUserReal(){
				this.$store.commit('setLoadingBool',true);
                var params={
                    shop_id:this.shop_id,
                    shop_name:this.shop_name,
                    userReal_id:this.userReal_id,
                    userReal_phone:this.userReal_phone,
                    userReal_name:this.userReal_name,
                    check_state:this.value,
                    pageNum: this.form.page,
                    pageSize:this.form.limit,
                }
                this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.queryUserReal,
                    params: params,
                }).then(res=>{
					this.$store.commit('setLoadingBool',false);
                    if (res.data.success) {
                        this.initUserRealData=res.data.data;
                        this.total=this.initUserRealData.total;
						this.getExportRealUserData();//获得导出团队长数据，不要写在下面，ajax是异步请求
//                        this.$message({message:res.data.msg,type: 'success'});
                    }else {
                        this.$message({message:res.data.msg, type: 'error'});
                        this.initUserRealData=[];
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'});
                    this.initUserRealData=[];
                })
            },
            //f04.重置查询条件
            resetQueryCondition(){
				// if (!(
				// this.userReal_id=='' &&
				// this.userReal_phone=='' && 
				// this.userReal_name=='' && 
				// this.value=='' && 
				// this.shop_name=='' && 
				// this.shop_id=='' )) {
					
				// }
				//清除查询条件
				this.userReal_id = '';
				this.userReal_phone = '';
				this.userReal_name = '';
				this.value = '';
				this.shop_name = '';
				this.shop_id = '';
				//重新加载数据
				this.queryUserReal();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
               
            },

            //f05.修改
            updateUserReal(scope){
                this.addform.apply_user_id = scope.row.user_id;
                this.addform.real_name = scope.row.real_name;
                this.addform.identity_card = scope.row.identity_card;
                this.addform.hand_identity_card_image = scope.row.hand_identity_card_image;
                this.addform.bank_card  = scope.row.bank_card;
                this.addform.open_branch_bank  = scope.row.open_branch_bank;

                //如果没获取到数据就设置为空，不能是undefined
                if(this.addform.apply_user_id == undefined){
                    this.addform.apply_user_id = '';
                }
                if(this.addform.real_name == undefined){
                    this.addform.real_name = '';
                }
                if(this.addform.identity_card == undefined){
                    this.addform.identity_card = '';
                }
                if(this.addform.hand_identity_card_image == undefined){
                    this.addform.hand_identity_card_image = '';
                }
                if(this.addform.bank_card == undefined){
                    this.addform.bank_card = '';
                }
                if(this.addform.open_branch_bank == undefined){
                    this.addform.open_branch_bank = '';
                }
                this.dialogFormVisible = true;
            },

            //f06.取消修改/添加
            cancleAddUserReal(){
                this.dialogFormVisible = false;//关闭弹框
            },

            //f07.清空数据
            delAddUserRealData(){
                //清空数据
                this.addform.apply_user_id='';
                this.addform.real_name='';
                this.addform.identity_card='';
                this.addform.hand_identity_card_image='';
                this.addform.bank_card='';
                this.addform.open_branch_bank='';
            },

            //f08.审核状态格式转换
            formatCheckState(row, column, cellValue){
                if(row.check_state == -1){
                    return "待审核";
                }else if(row.check_state == 0){
                    return "未通过";
                }else if(row.check_state == 1){
                    return "已通过";
                }else {
                    return "未 知";
                }
            },

            //f09.上传手持身份证
            changeImage(e){
                let file = e.target.files[0];
                if(file) {
                    this.addform.hand_identity_card_image = file;
                }
            },

            //f10.审核用户
            checkRealUser(scope,state){
                this.$confirm('是否确认审核该用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.login_user_id = this.user.id;
                    const formDatas=new FormData();
                    formDatas.append('login_user_id',this.login_user_id);
                    formDatas.append('check_userReal_id', scope.row.user_id);
                    formDatas.append('check_check_state',state);

                    //发送请求
                    this.axios({
                        method: "POST",
                        url: this.$local.http+this.$api.checkRealUser,
                        data:formDatas,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(res=>{
                        if (res.data.success) {
                            this.$message({message:res.data.msg,type: 'success'});//提示信息
                            this.queryUserReal();//重新加载用户列表
                        }else {
                            this.$message({message: res.data.msg,type: 'warning'});
                        }
                    }).catch(res=>{
                        this.$message.error(res.data.msg);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消审核'
                    });
                });
            },

            //f11.导出实名用户
            exportRealUser() {
                this.$confirm('确定要导出表格数据么？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    
					require.ensure([], () => {
					    for (var i in this.exportRealUserData) {
					        this.exportRealUserData[i].xuhao=i+1;
					        if(this.exportRealUserData[i].check_state == -1){
					            this.exportRealUserData[i].checkState = '待审核';
					        }else if(this.exportRealUserData[i].check_state == 0){
					            this.exportRealUserData[i].checkState = '审核未通过';
					        }else if(this.exportRealUserData[i].check_state == 1){
					            this.exportRealUserData[i].checkState = '审核通过';
					        }else{
					            this.exportRealUserData[i].checkState = '未知';
					        }
					    }
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['序号','用户ID','真实姓名','店铺ID','店铺名称','电话','身份证号','银行卡','开户支行','创建时间','审核状态'];
					    const filterVal = ['xuhao','user_id', 'real_name','shop_id','shop_name','phone','identity_card','bank_card','open_branch_bank','create_time','checkState'];
					    const list = this.exportRealUserData;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data, '实名用户名单');
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

            //f10.获得导出数据
            async getExportRealUserData(){ 
                var params={
                    shop_id:this.shop_id,
                    shop_name:this.shop_name,
                    userReal_id:this.userReal_id,
                    userReal_phone:this.userReal_phone,
                    userReal_name:this.userReal_name,
                    check_state:this.value,
                    needPage:'1',
                }
                let res = await this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.queryUserReal,
                    params: params,
                })
				if (res.data.success) {
				    this.exportRealUserData=res.data.data;
					
				}else {
				    this.$message({message:res.data.msg, type: 'error'});
				    this.exportRealUserData=[];
				} 
            }
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
    .settled_nav_left ul{overflow: hidden;}
    .settled_nav_left ul li{float: left;width: 28%;padding: 10px 0;}
    .settled_nav_left ul li:nth-child(3){float: left;width: 44%;padding: 10px 0;}
    .settled_nav_left ul li:nth-child(1) p{padding-right:42px;}
    .settled_nav_left ul li p{font-size: 14px;line-height: 34px;padding: 0 15px;color: #000;float: left;text-align: right;}
    .settled_nav_left ul li input{width: 50%;line-height: 30px;padding-left: 10px;float: left;border: 1px solid rgb(191, 217, 214);}
    .dialog_ul li{float: left;width: 30%;line-height: 30px;font-size: 14px;overflow: hidden;}
    .dialog_ul li p{padding-right: 10px;float: left;}
    .hand_identity_card_image{height: 60px;width: 160px;margin-top: 9px;}
</style>

