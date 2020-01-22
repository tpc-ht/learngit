<template>
    <div class="app-container">
        <div class="settled_nav">
            <div class="settled_nav_left fl">
                <ul>
                    <li>
                        <p class="fl">姓名</p>
                        <input type="text" placeholder="请输入" class="fl" v-model.trim='form.name'/>
                    </li>
                    <li>
                        <p class="fl">联系方式</p>
                        <input type="text" placeholder="请输入" class="fl" v-model.trim='form.phone'/>
                    </li>
                    <li> 
                        <p class="fl">代理时间</p>
                        <div class="time">
                            <el-date-picker
                                    v-model="value1"
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
                        <p class="fl">代理级别</p>
                        <el-row class="block-col-2">
                            <el-col :span="12" class="daili">
                                <el-select v-model="form.Level" placeholder="请选择">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="省级" value="1"></el-option>
                                    <el-option label="市级" value="2"></el-option>
                                    <el-option label="县区级" value="3"></el-option>
                                    <el-option label="乡镇级" value="4"></el-option>
                                    <el-option label="村社级" value="5"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </li>
                    <!--<li>-->
                        <!--<p class="fl">代理类型</p>-->
                        <!--<el-row class="block-col-2">-->
                            <!--<el-col :span="12" class="daili">-->
                                <!--<el-select v-model="form.Type" placeholder="请选择">-->
                                    <!--<el-option label="全部" value=""></el-option>-->
                                    <!--<el-option v-for="item in inList" :label="item.typeName" :value="item.typeName"></el-option>-->
                                <!--</el-select>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                    <!--</li>-->
                    <li>
                        <p class="fl">代理状态</p>
                        <el-row class="block-col-2">
                            <el-col :span="12" class="daili">
                                <el-select v-model="form.state" placeholder="请选择">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="有效" value="有效"></el-option>
                                    <el-option label="失效" value="失效"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </li>
                </ul>
            </div>
            <div class="settled_nav_con fl pointer">
                <el-button @click="getList()">查询</el-button>
				<el-button @click="reset()">重置</el-button>
            </div>
            <div class="settled_nav_right fr pointer">
                <el-button @click="toDetails()">查看进账明细</el-button>
            </div>
        </div>
        <h6 class="h6" v-if="total>0">共{{total}}条记录，{{initData.data.pages}}页。当前为第{{form.page}}页</h6>
        <!-- <el-table :data="initData.data.list" border fit highlight-current-row style="width: 100%"> -->
        <el-table :data="initData.list" border fit highlight-current-row style="width: 100%">
            <el-table-column  type="index" align="center" label="序号"  width="50">
            </el-table-column>
            <el-table-column align="center" label="姓名" width="100px">
                <template slot-scope="scope">
                    <span>{{ scope.row.nick_name }}</span>
                </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="电话">
                <template slot-scope="scope">
                    <span>{{ scope.row.phone }}</span>
                </template>
            </el-table-column>

            <el-table-column width="220px" align="center" label="身份证号">
                <template slot-scope="scope">
                    <span>{{ scope.row.id_card_number }}</span>
                </template>
            </el-table-column>
            <el-table-column width="300px" align="center" label="家庭住址">
                <template slot-scope="scope">
                    <span>{{ scope.row.card_address }}</span>
                </template>
            </el-table-column>
            <el-table-column width="450px" align="center" label="代理区域">
                <template slot-scope="scope">
                    <span>{{ scope.row.proxy_region }}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="代理类型">
                <template slot-scope="scope">
                    <span>{{ scope.row.type_name }}</span>
                </template>
            </el-table-column>
            <el-table-column width="110px" align="center" label="代理级别">
                <template slot-scope="scope">
                    <span>{{ scope.row.level}}</span>
                </template>
            </el-table-column>
            <el-table-column width="110px" align="center" label="代理时间">
                <template slot-scope="scope">
                    <span>{{scope.row.agent_create_time | formatDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="代理费用">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.proxy_money||0}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="所需定金">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.earnest_money||0}}</span>
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="代理状态" width="90">
                <template slot-scope="{row}">
                        <span v-if=" row.proxy_status==1">有效</span>
                        <span v-else-if=" row.proxy_status==2">无效</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="实际缴费">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.proxy_payed ||0}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="120">
                <template slot-scope="{row}">
                    <el-button
                            type="success"
                            size="small"
                            @click="dialogFormShow(row)"
                    >
                        缴费进账
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />

        <h6 class="h6">当前筛选结果统计</h6>
        <p class="p">代理费用&nbsp;&nbsp;&nbsp;&nbsp;     ￥{{initData.all_proxy_money||0}}</p>
        <p class="p">实际费用&nbsp;&nbsp;&nbsp;&nbsp;     ￥{{initData.all_proxy_payed||0}}</p>
        <p class="p">未缴纳 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    ￥{{initData.all_nopay_money||0}}</p>

        <el-dialog title="缴费进账" :visible.sync="dialogFormVisible">
            <el-form :model="formData">
                <el-form-item label="进账金额" :label-width="formLabelWidth">
                    <el-input v-model="formData.pay_money" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="进账方式" :label-width="formLabelWidth">
                    <el-select v-model="formData.pay_method" placeholder="请选择缴费方式">
                        <el-option label="支付宝" value="1"></el-option>
                        <el-option label="微信" value="2"></el-option>
                        <el-option label="银行卡" value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogForm()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {formatDate} from '../../../common/js/filters.js'
    import Pagination from '@/components/Pagination'
    export default {
        name: 'landIndex',
        components: { Pagination },
        filters: {
            formatDate(time){
                var data = new Date(time);
                return formatDate(data,'yyyy-MM-dd');
            }
        },
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    name: '',
                    phone: '',
                    Level:'',
                    Type:'',
                    state:'',
                    page: 1,
                    limit: 10
                },
                formLabelWidth: '120px',
                value1: [],
                inList:[],
                initData:{},
                formData:{
                    pay_money:'',
                    pay_method:'',
                },
                id:'',
                dataTime:'',
                dataTime1:'',
                total:'',
            }
        },
        mounted() {
            // this.initAgentFeeSet();
            this.getList()
        },
        methods: {
            dialogFormShow(row){
                this.id=row.agent_application_id
                this.dialogFormVisible=true;
                console.log('id',this.id)

            },
            getList(){
                let this_ = this;
                let Time = this.value1;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.dataTime = Start.getTime(); //当前时间转换成long型
                this.dataTime1 = End.getTime()+Number(86399999); //当前时间转换成long型
                if (Time[0] == null) {
                    this.dataTime ='';
                    this.dataTime1 ='';
                }
                const formDatas=new FormData()
                formDatas.append('nick_name',this_.form.name);//省
                formDatas.append('phone',this_.form.phone);//省
                formDatas.append('agent_create_time_begin',this_.dataTime);//省
                formDatas.append('agent_create_time_end',this_.dataTime1);//省
                formDatas.append('level',this_.form.Level);//省
                formDatas.append('type_name','农庄租赁');//省
                formDatas.append('proxy_status',this_.form.state);//省
                formDatas.append('pageNum',this_.form.page);
                formDatas.append('pageSize',this_.form.limit);
                this.axios({
                    method: "POST",
                    url: this.$local.http+this.$api.queryAgentApplicationList,
                    data:formDatas,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    if (res.data.success) {
                        this.initData=res.data.data;
                        this.total=this.initData.data.total;
                    }else {
                        this.$message({
                            message:res.data.msg,
                            type: 'error'
                        })
                        this.initData=[]
                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    })
                    this.initData=[]
                })
            },
            // initAgentFeeSet(){
            //     var user = JSON.parse(sessionStorage.getItem('user'))
            //     const formDatas=new FormData()
            //     formDatas.append('user_id',user.id)//法人姓名formData.pay_money
            //     this.axios({
            //         method: "POST",
            //         url: this.$local.http+this.$api.initAgentFeeSet,
            //         data:formDatas,
            //         headers: {
            //             'Content-Type': 'application/x-www-form-urlencoded'
            //         }
            //     }).then(res=>{
            //         if (res.data.success) {
            //             this.inList=res.data.data.join_fee_list
            //         }
            //     }).catch(res=>{
            //         this.$message({
            //             message:res.data.msg,
            //             type: 'error'
            //         })
            //     })
            // },
            //缴费进账
            dialogForm(){
                let this_ = this;
                var user = JSON.parse(sessionStorage.getItem('user'))
                const formDatas=new FormData()
                formDatas.append('agent_application_id',this.id)
                formDatas.append('pay_money',this_.formData.pay_money)
                formDatas.append('pay_method',this_.formData.pay_method)
                formDatas.append('user_id',user.id)//法人姓名
                this.axios({
                    method: "POST",
                    url: this.$local.http+this.$api.agentApplicationPayMoney,
                    data:formDatas,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    if (res.data.success) {
                        this.dialogFormVisible=false
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        })
                        this.getList()
                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    })
                })
            },
            toDetails(){
                this.$router.push({path: '/details'})
            },
			//重置
			reset(){
				// if (!(this.value1[0] == null && this.form.name=='' && this.form.phone=='' && this.form.Level=='' && this.form.state=='' )) {
					
				// }
				this.form.name= this.form.phone= this.form.Level= this.form.state=''
				this.value1 =[null,null];
				this.getList();
				this.$message({
					type: 'success',
					message: this.$store.getters.getResetText
				});
			}
        }
    }
</script>

<style scoped>
    .app-container{width: 100%;background-color: #fff;padding: 20px;}
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
    .settled_nav_left{width: 73%;}
    .settled_nav_left ul{overflow: hidden;}
    .settled_nav_left ul li{float: left;width: 28%;padding: 10px 0;}
    .settled_nav_left ul li:nth-child(3){float: left;width: 44%;padding: 10px 0;}
    /*.settled_nav_left ul li:nth-child(6){float: left;width: 44%;padding: 10px 0;}*/
    .settled_nav_left ul li:nth-child(1) p{padding-right:42px;}
    /*.settled_nav_left ul li:nth-child(6) p{font-size: 14px;line-height: 34px;padding: 0 15px;color: #000;width: 20%;float: left;}*/
    .settled_nav_left ul li p{font-size: 14px;line-height: 34px;padding: 0 15px;color: #000;float: left;text-align: right;}
    .settled_nav_left ul li input{width: 50%;line-height: 30px;padding-left: 10px;float: left;border: 1px solid rgb(191, 217, 214);}
    .settled_nav_con{margin: 50px auto 0;}
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
</style>

