<template>
    <div style="padding:20px;">
        <div class="head-ed">
            <ul>
                <li>
                    <div class="block">
                        <span class="demonstration" style="margin-right:10px;">交易时间</span>
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
                    <span class="se-pl">用户姓名</span>
                    <div class="inputes">
                        <el-input v-model="name" placeholder="请输入" style="width:185px;"></el-input>
                    </div> 
                </li>
                <li>
                    <span class="se-pl">联系方式</span>
                    <div class="inputes">
                        <el-input v-model="contact" placeholder="请输入" style="width:185px;"></el-input>
                    </div>
                </li>
                <li>
                    <span class="se-pl">支付方式</span>
                    <div class="inputes">
                        <el-select v-model="zffs" clearable placeholder="请选择">
                            <el-option v-for="item in opsedList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <span class="se-pl" style="padding-right: 15px;">订单ID</span>
                    <div class="inputes">
                        <el-input v-model="orderId" placeholder="请输入" style="width:220px;"></el-input>
                    </div>
                </li>
                <li>
                    <el-row class="inputes">
                        <el-button @click="getList()">查询</el-button>
                    </el-row>
					<el-row class="inputes" style="margin-left: 10px;">
					    <el-button @click="reset()">重置</el-button>
					</el-row>
                    <el-row class="inputes" style="margin-left: 10px;">
                        <el-button @click='export2Excel()' type='primary'>导出Excel表</el-button>
                    </el-row>
                </li>
            </ul>
        </div>

        <div>
            <h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>

            <el-table 
			:data="tableData.list" 
			v-loading="this.$store.getters.getLoadingBool" 
			element-loading-text="拼命加载中..." border style="width: 100%">
                <el-table-column prop="superior_id" label="上级ID" width="80">
                </el-table-column>
                <el-table-column width="80px" prop="order_id" label="订单ID">
                </el-table-column>
                <el-table-column prop="create_time" label="时间" width="200">
                </el-table-column>
                <el-table-column prop="consigneeName" label="用户姓名" width="150">
                </el-table-column>
                <el-table-column prop="consigneePhone" label="联系方式" width="150">
                </el-table-column>
                <el-table-column prop="total_amount" label="消费支付金额" width="200">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.total_amount||0}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="total_integral" label="积分" width="120">
                </el-table-column>
                <el-table-column prop="total_slb" label="搜了贝" width="120">
                </el-table-column>
                <el-table-column prop="price" label="平台进账收益" width="200">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.price||0}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="payment_channel" label="进账方式" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.payment_channel==2">支付宝</span>
                        <span v-if="scope.row.payment_channel==1">微信</span>
                        <span v-else-if="scope.row.payment_channel==3">银行卡</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="contentClick(scope)" type="text" size="small">查看订单</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />

        <div class="p_foot">
            <p class="p_one">筛选统计：</p>
            <div class="p_div">
                <p class="p_two">
                    消费支付金额：￥{{add.total||0}}
                </p>
                <p class="p_two">
                    平台进账收益：￥{{add.price||0}}
                </p>
            </div>
        </div>

    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name:'IncomeFromPlatform',
        data() {
            return {

                form: {
                    page: 1,
                    limit: 10
                },
                name: '',
                contact: '',
                timer: [],
                tableData: '',
                add:{},
                total:'',
                dataTime:'',
                dataTime1:'',
                orderId:'',
                tableList:[],
                opsedList:[
                    {
                        value: '0',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '人民币'
                    },
                    {
                        value: '2',
                        label: '人民币+积分'
                    },
                    {
                        value: '3',
                        label: '人民币+搜了贝'
                    },
                ],
                zffs:'',
            }
        },
        components: {Pagination},
        mounted() {
            this.getList();
        },
        methods: {
            getList() { //初始化
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
                var url = this.$local.http + this.$api.ruleList;
                if(this.name==''&& this.contact==''&&this.dataTime==''&&this.dataTime1==''&& this.zffs==''&&this.orderId==''){
                    var params={
                        pageNum: this.form.page,
                        pageSize:this.form.limit,
                    }
                }else {
                    var params={
                        userName: this.name,
                        phone: this.contact,
                        statTime: this.dataTime,
                        endTime: this.dataTime1,
                        flg:this.zffs,
                        orderId:this.orderId,
                        pageNum: this.form.page,
                        pageSize:this.form.limit,
                    }
                }
                this.axios.get(url,{params:params,}).then(data => {
					this.$store.commit('setLoadingBool',false);
                    let res = data.data;
                    if(res.success){
                        this.$message({message:res.msg, type: 'success'});
                        this.tableData = res.data.pageInfo;
                        this.total=this.tableData.total;
                        this.add=res.data.add;
                        this.getData();
                    }else{
                        this.$message({message: res.msg, type: 'warning'});
                        this.tableData =[]
                    }
                })
            },
            getData() { //初始化
                let Time = this.timer;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.dataTime = Start.getTime(); //当前时间转换成long型
                this.dataTime1 = End.getTime()+Number(86399999);//当前时间转换成long型
                if (Time[0] == null) {
                    this.dataTime ='';
                    this.dataTime1 ='';
                }
                if(this.name==''&& this.contact==''&&this.dataTime==''&&this.dataTime1==''&& this.zffs==''&&this.orderId==''){
                    var params={
                        pageNum: this.form.page,
                        pageSize:this.total,
                    }
                }else {
                    var params={
                        userName: this.name,
                        phone: this.contact,
                        statTime: this.dataTime,
                        endTime: this.dataTime1,
                        flg:this.zffs,
                        orderId:this.orderId,
                        pageNum: this.form.page,
                        pageSize:this.total,
                    }
                }
                this.axios({
                    method: "get",
                    url: this.$local.http + this.$api.ruleList,
                    params: params,
                }).then(res => {
                    if (res.data.success) {
                        this.tableList=res.data.data.pageInfo.list;
                    }else {
                        this.tableList=[]
                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    });
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
                        for (var i in this.tableList) {
                            if (this.tableList[i].payment_channel == 1) {
                                this.tableList[i].payment_channel = '微信'
                            } else if (this.tableList[i].payment_channel == 2) {
                                this.tableList[i].payment_channel = '支付宝'
                            }else if (this.tableList[i].payment_channel == 3) {
                                this.tableList[i].payment_channel = '银行卡'
                            }
                        }
                        const { export_json_to_excel } = require('../../vendor/Export2Excel');
                        const tHeader = ['上级ID','订单ID','时间','用户姓名','联系方式','消费支付金额','积分','搜了贝','平台进账收益', '进账方式'];
                        const filterVal = ['superior_id','order_id','create_time','consigneeName','consigneePhone','total_amount','total_integral','total_slb','price','payment_channel'];
                        const list = this.tableList;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data,'文交收益结款');
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
				// if (!(this.timer[0] == null && this.name=='' && this.contact=='' && this.zffs=='' && this.orderId=='' )) {
					
				// }
				this.name=this.contact=this.zffs=this.orderId='';
				this.timer = [null,null];
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
            //查看订单
            contentClick(scope){
                this.$router.push({path: '/viewOrders',query:{serial_number:scope.row.serial_number}})
            },
        },
    }
</script>

<style scoped lang="scss">
    .h6 {
        padding: 10px 5px;
        font-size: 16px;
    }

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
    .head-ed ul li{float: left;margin: 15px 3% 0 0;}

    .el-select {
        width: 220px !important;
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
    .p_foot{overflow: hidden;padding-top: 20px;}
    .p_one{float: left;font-size: 16px;font-weight: 600;line-height: 30px;}
    .p_div{float: left;padding-left: 20px;}
    .p_two {
        line-height: 30px;
        font-size: 16px;
        font-weight: 200;
        height: 30px;
    }
</style>