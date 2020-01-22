<template>
    <div style="padding:20px;">
        <div class="head-ed">
            <div class="p_one">
                <div class="se-pl">姓名：{{real_name}}</div>
                <div class="se-pl" style="margin-left:20%;width: 40%;">代理时间：{{agent_create_time}}至{{end_time}}</div>
            </div>
            <div class="p_one">
                <div class="se-pl">电话：{{phone}}</div>
                <div class="se-pl" style="margin-left:20%;width: 40%;">代理状态：{{proxy_status}}</div>
            </div>
            <div class="p_one">
                <span class="se-pl">身份证号：{{id_card_number}}</span>
            </div>
            <div class="p_one">
                <span class="se-pl">家庭住址：{{card_address}}</span>
            </div>
            <div class="p_one">
                <span class="se-pl">代理区域：{{proxy_region}}</span>
            </div>
            <div class="p_one">
                <span class="se-pl">代理类型：{{type_name}}</span>
            </div>
            <div class="p_one">
				<span class="se-pl">代理级别：
					<span v-if="level==1">省级代理商</span>
						<span v-else-if="level==2">市级代理商</span>
						<span v-else-if="level==3">县级代理商</span>
						<span v-else-if="level==4">乡级代理商</span>
						<span v-else-if="level==5">村级代理商</span></span>
            </div>
        </div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="下级代理" name="first">
                <div class="show_one">
                    <div class="head-ed">
                        <div class="inputes">
                            <div class="block">
                                <span class="demonstration" style="margin-right:10px;">代理时间</span>
                                <el-date-picker
                                        v-model="timer"
                                        value-format="timestamp"
                                        type="daterange"
                                        placeholder="请选择"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        @change="change"
                                ></el-date-picker>
                            </div>
                        </div>
                        <el-row class="inputes">
                            <div class="bot_div" @click="getList">查询</div>
                        </el-row>
                    </div>
                    <div>
                        <h6 class="h6" v-if="tableData.total>0">共{{tableData.total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>

                        <el-table :data="tableData.list" border style="width: 100%">
                            <el-table-column prop="agent_check_time" label="审核通过时间" width="110">
                            </el-table-column>
                            <el-table-column prop="real_name" label="姓名" width="90">
                            </el-table-column>
                            <el-table-column prop="phone" label="电话" width="120">
                            </el-table-column>
                            <el-table-column prop="id_card_number" label="身份证号" width="220">
                            </el-table-column>
                            <el-table-column prop="card_address" label="家庭地址" width="300">
                            </el-table-column>
                            <el-table-column prop="proxy_region" label="代理区域" width="400">
                            </el-table-column>
                            <el-table-column prop="type_name" label="代理类型" width="100">
                            </el-table-column>
                            <el-table-column prop="level" label="代理级别" width="120">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.level==1">省级代理商</span>
                                    <span v-else-if="scope.row.level==2">市级代理商</span>
                                    <span v-else-if="scope.row.level==3">县级代理商</span>
                                    <span v-else-if="scope.row.level==4">乡级代理商</span>
                                    <span v-else-if="scope.row.level==5">村级代理商</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="end_time" label="代理时间" width="200">
                                <template slot-scope="scope">
                                    <span>{{scope.row.agent_create_time}}</span>至
                                    <span>{{scope.row.end_time}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="proxy_status" label="代理状态" width="100">
                            </el-table-column>
                            <el-table-column prop="proxyMoney" label="代理费提成" width="100">
                                <template slot-scope="scope">
                                    <span>￥{{scope.row.proxyMoney||0}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- 分页 -->
                    <pagination v-if="tableData.total>0" :total="tableData.total" :page.sync="form.page" :limit.sync="form.limit"
                                @pagination="getList" />
                </div>
            </el-tab-pane>
        </el-tabs>
        <div>
            <p class="p_two" style="text-align:center;">
                <el-popover ref="popover4" placement="right" width="300" trigger="click">
                    <div>
                        <span>结款金额：</span>
                        <div class="inputes" style="width:185px;">
                            <el-input v-model="money" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div style="margin-top:20px;">
                        <span>结款方式：</span>
                        <el-select v-model="stype" placeholder="请选择">
                            <el-option v-for="item in sptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="text-align: center;margin-top:20px;">
                        <el-row class="inputes" style="margin:0 auto;">
                            <el-button @click="bton">结款</el-button>
                        </el-row>
                    </div>
                </el-popover>
                <el-button v-popover:popover4 style="margin:0 auto;">马上结款</el-button>
            </p>
            <p class="p_two">
                总代理费提成：￥{{proxyMoney||0}}
            </p>
            <p class="p_two">
                总代理费已结清：￥{{pay_money||0}}
            </p>
            <p class="p_two">
                总代理费未结清：￥{{proxyMoney-pay_money||0}}
            </p>
        </div>
    </div>
</template>
<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        data() {
            return {
                activeName: 'first',
                form: {
                    page: 1,
                    limit: 10
                },
                options: [{
                    value: '1',
                    label: '已结清'
                }, {
                    value: '2',
                    label: '未结清'
                }],
                sptions: [{
                    value: '1',
                    label: '支付宝'
                }, {
                    value: '2',
                    label: '微信'
                },
                    {
                        value: '3',
                        label: '银行卡'
                    }
                ],
                timer: [],
                timerData:[],
                stype:'',
                money:'',
                tableData:[],
                tableList:[],
                real_name:this.$route.query.real_name,
                phone:this.$route.query.phone,
                proxy_region:this.$route.query.proxy_region,
                type_name:this.$route.query.type_name,
                level:this.$route.query.level,
                agent_create_time:this.$route.query.agent_create_time,
                end_time:this.$route.query.end_time,
                card_address:this.$route.query.card_address,
                id_card_number:this.$route.query.id_card_number,
                id:this.$route.query.id,
                proxy_status:this.$route.query.proxy_status,
                proxyMoney:this.$route.query.proxyMoney,
                pay_money:this.$route.query.pay_money,
                province:this.$route.query.province,
                city:this.$route.query.city,
                country:this.$route.query.country,
                town:this.$route.query.town,
                village:this.$route.query.village,
                typeid:this.$route.query.typeid,
                dataTime:'',
                dataTime1:'',
            }
        },
        components: {
            Pagination
        },

        mounted() {
            this.getList();
        },
        methods: {
            change() {
                this.dataTime= this.timer[0].getTime();
                this.dataTime1= this.timer[1].getTime();
            },
            getList() { //查询
                let data = {
                    startDate: this.dataTime,
                    endDate: this.dataTime1,
                    level:this.level,
                    province:this.province,
                    city:this.city,
                    country:this.country,
                    town:this.town,
                    village:this.village,
                    typeId:this.typeid,
                    pageNum: this.form.page,
                    pageSize:this.form.limit,
                };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.queryLowerAgentFarmLeaseInfo1,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.tableData=res.data.data;
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        })
                    }else {
                        this.$message({
                            message:res.data.msg,
                            type: 'warning'
                        })
                        this.tableData=[]
                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    })
                    this.tableData=[]
                })
            },
            bton() { //提交
                var user = JSON.parse(sessionStorage.getItem('user'))
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.insertProxyPay,
                    data: qs.stringify({
                        agent_application_id:this.id,
                        record_user_id:user.id,
                        pay_method: this.stype,
                        pay_money: this.money,
                        income_type:1,
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                        this.$router.push({path:'/navfind'})
                    }
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
    .active{
        background: #59a7e4;
        color:#ffffff;
    }
    .inputes {
        display: inline-block !important;
    }

    .sp-df {
        margin-left: 400px;
        margin-right: 10px;
    }

    .se-pl {
        margin-right: 10px;
        font-size: 16px;
        font-weight: 200px;
        width: 10%;
    }

    .head-ed {
        margin-top: 10px;
    }

    .head-ed>div {
        height: 40px;
    }

    .el-select {
        width: 185px !important;
    }

    .p_one>div {
        float: left;
    }

    .se-pl-t {
        margin-right: 10px;
    }

    .p_two {
        padding-top: 20px;
        font-size: 16px;
        font-weight: 200;
        height: 30px;
    }
    .bot_div{
        width: 60px;line-height:36px;text-align: center;border-radius: 5px;border: 1px solid rgb(191, 217, 214);margin: 0 20px 0;
        color: rgb(131, 165, 162);
    }
    .bot_div:hover {
        outline: 0;
        border-color: rgb(31, 61, 57);
        color: rgb(31, 61, 57);
        cursor: pointer;
    }
</style>
