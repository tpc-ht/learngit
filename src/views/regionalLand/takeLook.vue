<template>
    <div style="padding:20px;">
        <div class="head-ed">
            <ul>
                <li>
                    <div class="block">
                        <span class="demonstration" style="margin-right:10px;">下单时间</span>
                        <el-date-picker
                                v-model="timerData"
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
                    <span class="se-pl">订单状态</span>
                    <el-select v-model="qyxs" clearable placeholder="请选择">
                        <el-option v-for="item in losed" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <el-row class="inputes">
                        <el-button @click="cleach">查询</el-button>
                    </el-row>
                </li>
            </ul>
        </div>

        <div>
            <h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>

            <el-table :data="tableData.list" border style="width: 100%">
                <el-table-column prop="agent_create_time" label="订单编号" width="150">
                </el-table-column>
                <el-table-column prop="agent_create_time" label="下单时间" width="150">
                </el-table-column>
                <el-table-column prop="agent_create_time" label="付款人" width="150">
                </el-table-column>
                <el-table-column prop="agent_create_time" label="联系方式" width="150">
                </el-table-column>
                <el-table-column prop="card_address" label="带看费" width="300">
                </el-table-column>
                <el-table-column prop="proxy_region" label="土地面积" width="300">
                </el-table-column>
                <el-table-column prop="proxy_region" label="土地年限" width="300">
                </el-table-column>
                <el-table-column prop="typeid" label="费用" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.typeid==10">共享农场</span>
                        <span v-if="scope.row.typeid==12">农庄租赁</span>
                        <span v-else-if="scope.row.typeid==13">共享工厂</span>
                        <span v-else-if="scope.row.typeid==14">农家餐饮</span>
                        <span v-else-if="scope.row.typeid==15">旅游景点</span>
                        <span v-else-if="scope.row.typeid==16">民宿客栈</span>
                        <span v-else-if="scope.row.typeid==17">共享商城</span>
                        <span v-else-if="scope.row.typeid==18">绿色扶持</span>
                        <span v-else-if="scope.row.typeid==19">农庄租赁</span>
                    </template>
                </el-table-column>
                <el-table-column prop="proxy_region" label="土地位置" width="300">
                </el-table-column>
                <el-table-column prop="proxy_money" label="状态" width="100">
                    <template slot-scope="scope">
                        <span>￥{{scope.row.proxy_money}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button @click="contentClick(scope)" type="text" size="small">查看</el-button>
                        <el-button @click="contentClick(scope)" type="text" size="small">已带看</el-button>
                        <el-button @click="contentClick(scope)" type="text" size="small">确认成交</el-button>
                        <el-button @click="contentClick(scope)" type="text" size="small">取消单</el-button>
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
        name:'takeLook',
        data() {
            return {
                Djshow: false,
                Tgshow: true,
                Jushow: true,
                opt: '',
                form: {
                    page: 1,
                    limit: 10
                },
                options: [{
                    value: '1',
                    label: '待审批'
                }, {
                    value: '3',
                    label: '已通过'
                }, {
                    value: '2',
                    label: '已拒绝'
                }],
                unit: [{
                    value: '1',
                    label: '平方米'
                }, {
                    value: '2',
                    label: '亩'
                }],
                opsed: [{
                    value: '1',
                    label: '月付'
                }, {
                    value: '2',
                    label: '年付'
                }],
                shzt: '',
                name: '',
                tel: '',
                timer: [],
                dljb: '',
                dltype: '',
                dlzt: '',
                qyxs: '',
                selected: adderss,
                adderedOne: '',
                adderedTwo: '',
                adderedThree: '',
                adderssM: [],
                adderssN: [],
                tableData: '',
                total:'',
                dataTime:'',
                dataTime1:'',
            }
        },
        components: {
            Pagination
        },
        created() {
            this.getList();
            this.getYw();
        },
        mounted() {

        },
        methods: {
            getList() { //初始化
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.agentList,
                    data: qs.stringify({
                        pageNum: this.form.page,
                        pageSize: this.form.limit
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(data => {
                    let res = data.data;
                    if(res.success==true){
                        this.tableData = res.data;
                        this.total=this.tableData.total;
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
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
                let h1='',h2='';
                var obj=this.adderssM;
                var ob=this.adderssN;
                for (var v of obj) {
                    if (v.code == this.adderedTwo) {
                        h1=v.name;
                    }
                }
                for (var v of ob) {
                    if (v.code == this.adderedThree) {
                        h2=v.name;
                    }
                }
                let data = {
                    agentCheckState: this.shzt,
                    realName: this.name,
                    phone: this.tel,
                    agentCreateTime: this.dataTime,
                    endtime: this.dataTime1,
                    province: this.province,
                    city: this.city,
                    country: this.country,
                    town: h1,
                    village:h2,
                    level: this.dljb,
                    typeid: this.dltype,
                    proxyStatus: this.dlzt,
                    signType: this.qyxs,
                    pageNum: this.form.page,
                    pageSize:this.form.limit,
                };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.agentLikeList,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(data => {
                    let res = data.data;
                    if(res.success==true){
                        this.$message({
                            message:res.msg,
                            type: 'success'
                        });
                        this.tableData = res.data;
                        this.total=this.tableData.total;
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                })
            },
            contentClick(scope) { //查看
                this.$router.push({path: '/detailsLandResources',query:{}})
            },
            //添加土地资源
            toAddLand(){
                this.$router.push({path: '/addLandResources',query:{}})
            },
            passClick(row, e) { //通过
                var dtas = row;
                var el = e.target;
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.contractOperation,
                    data: qs.stringify({
                        id: dtas.id,
                        phone: dtas.phone,
                        agentCheckState: 3,
                        typeid:dtas.typeid,
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        });
                        this.cleach();
                    }else {
                        this.$message({
                            message:res.data.msg,
                            type: 'warning'
                        })

                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    })
                })
            },
            noClick(row) { //不通过
                var dtas = row;
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.contractOperation,
                    data: qs.stringify({
                        id: dtas.id,
                        phone: dtas.phone,
                        agentCheckState: 2,
                        typeid:dtas.typeid,
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        });
                        this.cleach();
                    }else {
                        this.$message({
                            message:res.data.msg,
                            type: 'warning'
                        })

                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    })
                })
            },
            add_dl() { //代理申请
                this.$router.push({
                    path: '/delisted'
                })
            },
            djClick(row) { //冻结
                var dtas = row;
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.freezeStatus,
                    data: qs.stringify({
                        id: dtas.id,
                        freezeType:1,
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(data => {
                    let res = data.data;
                    if (res.success == true) {
                        this.getList()
                    }
                })
            },
            djClickOne(row) { //取消冻结
                var dtas = row;
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.freezeStatus,
                    data: qs.stringify({
                        id: dtas.id,
                        freezeType:2,
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(data => {
                    let res = data.data;
                    if (res.success == true) {
                        this.getList()
                    }
                })
            },
            getYw() { //查询业务
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.initAgentFeeSet,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(data => {
                    let res = data.data;
                    let arr = res.data.join_fee_list;
                    let arrey = [];
                    let obj = {};
                    if (res.success) {
                        for (var v of arr) {
                            obj = {
                                value: v.id,
                                label: v.typeName
                            };
                            arrey.push(obj);
                        }
                        this.opt = arrey;
                    }
                })
            },
        },
        watch: {
            adderedOne: function(val, old) {
                var arr = val;
                var obj = this.selected;
                for (var v of obj) {
                    if (v.value == arr[0]) {
                        console.log(v.label)
                        this.province = v.label;
                        for (var h of v.children) {
                            if (h.value == arr[1]) {
                                this.city = h.label;
                                for (var m of h.children) {
                                    if (m.value == arr[2]) {
                                        this.country = m.label;
                                    }
                                }
                            }
                        }
                    }
                }
                if (arr.length == 3) {
                    var data = {
                        code: arr[2]
                    };
                    this.axios({
                        method: "post",
                        url: this.$local.http + this.$api.getAid2018ByCode,
                        data: qs.stringify(data),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(data => {
                        let res = data.data;
                        this.adderssM = res.data;
                    })
                } else {
                    console.log('位数不够！');
                }
            },
            adderedTwo: function(val, old) {
                var val = val;
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.getAid2018ByCode,
                    data: qs.stringify({
                        code: val
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(data => {
                    let res = data.data;
                    this.adderssN = res.data;
                })
            }
        }
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
