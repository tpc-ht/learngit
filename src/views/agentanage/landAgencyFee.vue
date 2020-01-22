<template>
    <div class="box">
        <div class="head clearbox">
            <div class="head-o">
                <div class="t-ef">
                    <p>总代理返利</p>
                </div>
                <p class="t-ef_p">￥{{titleData.allJoinFee||0}}</p>
            </div>
            <div class="head-o m2">
                <div class="t-ef1">
                    <p>平台已返利</p>
                </div>
                <p class="t-ef_p">￥{{titleData.alreadyGetJoinFee||0}}</p>
            </div>
            <div class="head-o m2">
                <div class="t-ef2">
                    <p>未结款</p>
                </div>
                <p class="t-ef_p1">￥{{titleData.noGetJoinFee||0}}</p>
            </div>
        </div>
        <div class="agentNav">
            <ul>
                <li>
                    代理商区域：<p>{{initData.proxy_region}}</p>
                </li>
                <li>
                    代理级别：<p>{{initData.level}}</p>
                </li>
                <li>
                    代理时间：<p>{{initData.agent_create_time}} 至 {{initData.end_time}}</p>
                </li>
                <li>
                    状态：<p v-if="initData.proxy_status==1">有效</p>
                    <p v-if="initData.proxy_status==2">无效</p>
                </li>
            </ul>
        </div>
        <div class="content">
            <div class="head-ed">
                <span class="sp-df" style="margin-right:10px;">加盟商姓名</span>
                <div class="inputes">
                    <el-input v-model="name" placeholder="请输入内容" style="width:185px;"></el-input>
                </div>
                <span class="sp-df" style="margin-left:15px;margin-right:10px;">联系方式</span>
                <div class="inputes">
                    <el-input v-model="tel" placeholder="请输入内容" style="width:185px;"></el-input>
                </div>
                <div class="inputes" style="margin-left:15px;">
                    <div class="block">
                        <span class="demonstration" style="margin-right:10px;">加盟时间</span>
                        <el-date-picker v-model="timer" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
                <el-row class="AgencyFee_but">
                    <el-button @click="cleach">查询</el-button>
					<el-button @click="reset">重置</el-button>
                </el-row>
                <!--<span class="se-pl-t" style="margin-left:20px;margin-right:10px;">代理类型</span>-->
                <!--<el-select class="input-one" v-model="dltype" clearable placeholder="请选择">-->
                    <!--<el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">-->
                    <!--</el-option>-->
                <!--</el-select>-->

            </div>
            <div class="head-ed">
                <!--<span class="se-pl" style="margin-right:14px;">代理级别</span>-->
                <!--<el-select v-model="dljb" clearable placeholder="请选择" style="width:185px;">-->
                    <!--<el-option v-for="item in opsed" :key="item.value" :label="item.label" :value="item.value">-->
                    <!--</el-option>-->
                <!--</el-select>-->


            </div>
        </div>
        <div class="bvodry">
            <h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
            <el-table :data="tableData.list" border style="width: 100%">
                <el-table-column  type="index" align="center" label="序号"  width="50">
                </el-table-column>
                <el-table-column prop="real_name" label="姓名" align="center" min-width>
                </el-table-column>
                <el-table-column prop="phone" label="联系方式" align="center" min-width>
                </el-table-column>
                <el-table-column prop="proxy_region" label="代理区域" align="center" width="400" >
                </el-table-column>
                <el-table-column prop="type_name" label="代理类型" align="center" min-width>
                </el-table-column>
                <el-table-column prop="level" label="代理级别" align="center" min-width>
                    <template slot-scope="scope">
                        <span v-if="scope.row.level==1">省级代理商</span>
                        <span v-else-if="scope.row.level==2">市级代理商</span>
                        <span v-else-if="scope.row.level==3">县级代理商</span>
                        <span v-else-if="scope.row.level==4">乡级代理商</span>
                        <span v-else-if="scope.row.level==5">村级代理商</span>
                    </template>
                </el-table-column>
                <el-table-column prop="agent_create_time" label="加盟时间" align="center" min-width>
                </el-table-column>
                <el-table-column prop="returnJoinFee" label="加盟返利" align="center" min-width>
                </el-table-column>
                <el-table-column label="操作" align="center" min-width>
                    <template slot-scope="scope">
                        <el-button @click="djClick(scope)" type="text" size="small">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit"
                        @pagination="cleach" />
        </div>
        <div>
            <p class="t-se">当前筛选统计结果</p>
            <p class="t-sf">加盟返利总金额 ￥{{totalJoinFee||0}}</p>
        </div>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        data() {
            return {
                opt: '',
                form: {
                    page: 1,
                    limit: 10
                },
                opsed: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '省级'
                    },
                    {
                        value: '2',
                        label: '市级'
                    },
                    {
                        value: '3',
                        label: '县区级'
                    }, {
                        value: '4',
                        label: '乡镇级'
                    }, {
                        value: '5',
                        label: '村社级'
                    }
                ],
                name: '',
                tel: '',
                timer: [],
                dljb: '',
                dltype: '',
                tableData:[],
                titleData:{},
                initData:{},
                user:JSON.parse(sessionStorage.getItem('user')),
                total:'',
                totalJoinFee:'',
                dataTime:'',
                dataTime1:'',
            }
        },
        components: {
            Pagination
        },
        created() {
            this.getInit()
            this.getData()
            this.cleach();
        },
        mounted() {

        },
        methods: {
			//重置
			reset(){
				// if (!(
				// this.timer[0] == null && 
				// this.name==''  &&
				// this.tel=='')) {
					
				// }
				this.name = '';//姓名
				this.tel = '';//联系方式
				this.timer = [null,null];//时间
				this.cleach();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
            getData() { //代理加盟费--统计
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.agentUserLandFeeStatistics,
                    data: qs.stringify({
                        user_id:this.user.id
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.titleData=res.data.data;
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        })
                    }else {
                        this.$message({
                            message:res.data.msg,
                            type: 'warning'
                        });
                        this.titleData={}
                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    });
                    this.titleData={}
                })
            },
            getInit() { //初始化
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.queryAgentUserInfo,
                    data: qs.stringify({
                        user_id:this.user.id
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.initData=res.data.data;
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        })
                    }else {
                        this.$message({
                            message:res.data.msg,
                            type: 'warning'
                        });
                        this.initData={}
                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    });
                    this.initData={}
                })
            },
            cleach() { //查询
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
                    user_id:this.user.id,
                    real_name: this.name,
                    phone: this.tel,
                    begin_time: this.dataTime,
                    end_time: this.dataTime1,
                    pageNum: this.form.page,
                    pageSize: this.form.limit
                }
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.agentUserLandFee,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.tableData=res.data.data.dataList;
                        this.total=this.tableData.total;
                        this.totalJoinFee=res.data.data.totalJoinFee;
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        })
                    }else {
                        this.$message({
                            message:res.data.msg,
                            type: 'warning'
                        });
                        this.tableData=[]
                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    });
                    this.tableData=[]
                })
            },
            djClick(scope) { //查看详情
                this.$router.push({path: '/navagented',query:{real_name:scope.row.real_name,phone:scope.row.phone,
                        proxy_region:scope.row.proxy_region,type_name:scope.row.type_name,level:scope.row.level,
                        agent_create_time:scope.row.agent_create_time,returnJoinFee:scope.row.returnJoinFee,card_address:scope.row.card_address,
                        id_card_number:scope.row.id_card_number,agent_user_id:scope.row.agent_user_id,
                    }})
            },
        }
    }
</script>
<style scoped="scoped" lang="scss">
    .h6{font-size: 14px;line-height: 30px;}
    .clearbox::after{
        content:'';
        display:block;
        visibility:hidden;
        height:0;
        clear:both;
    }
    .box{
        padding:20px;
        .head>div{
            float: left;
        }
        .head-o>p{
            font-weight:bold;
        }
        .t-ef{
            width:128px;
            height:128px;
            text-align: center;
            background-color: #fdd631;
            border-radius: 8px;
            line-height: 128px;
            font-size: 16px;
            color: #fff;
            display: inline-block;
        }
        .t-ef_p{
            font-size: 20px;
            color: #18c79c;
            line-height: 128px;
            display: inline-block;
            width: 128px;
            text-align: center;
        }
        .t-ef_p1{
            font-size: 20px;
            color: #ef776d;
            line-height: 128px;
            display: inline-block;
            width: 128px;
            text-align: center;
        }
        .t-ef1{
            width:128px;
            height:128px;
            text-align: center;
            background-color: #1fc6f3;
            border-radius: 8px;
            line-height: 128px;
            font-size: 16px;
            color: #fff;
            display: inline-block;
        }
        .t-ef2{
            width:128px;
            height:128px;
            text-align: center;
            background-color: #34c874;
            border-radius: 8px;
            line-height: 128px;
            font-size: 16px;
            color: #fff;
            display: inline-block;
        }
        .m2{
            margin-left:50px;
        }

        .inputes{
            display: inline-block;
        }
        .head-ed{
            margin-top:20px;
        }
        .bvodry{
            margin-top:20px;
        }
        .t-se{
            font-size:16px;
            font-weight:bold;
            margin-top:20px;
        }
        .t-sf{
            margin-top:40px;
        }

    }
    .AgencyFee_but{float: right;}
    .agentNav{width: 100%;padding-top: 10px;}
    .agentNav ul{overflow: hidden;padding: 0;}
    .agentNav ul li{float: left;width: 40%;font-size: 14px;color: #333;line-height: 30px;}
    .agentNav ul li p{color: #18c79c;display: inline-block;}
</style>