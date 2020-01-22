<template>
    <div class="markingDetails">
        <div class="markingDetails_head">
            <ul>
                <li>
                    <el-row class="inputes">
                        <el-button @click="addArticle()">+  文交商品</el-button>
                    </el-row>
                </li>
                <li>
                    <el-row class="inputes">
                        <el-button @click="barterGoods()">+  易货商品</el-button>
                    </el-row>
                </li>
                <li>
                    <span class="se-pl">状态</span>
                    <el-select v-model="shzt" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <div class="inputes">
                        <el-input placeholder="请输入查找内容" v-model="input3" class="input-with-select">
                          <el-button slot="append" icon="el-icon-search">查找</el-button>
                        </el-input>
                    </div>
                </li>
                <li>
                    <el-row class="inputes">
                        <el-button >查询</el-button>
                    </el-row>
                </li>

            </ul>
        </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="文交商品列表" name="first">
                <div class="show_one">
                    <div>
                        <h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
                        <el-table :data="tableData.list" border style="width: 100%">
                            <el-table-column prop="serial_number" label="商品名称" width="220">
                            </el-table-column>
                            <el-table-column prop="payment_state" label="商品分类" width="80">
                            </el-table-column>
                            <el-table-column prop="payment_channel" label="商品属性" width="80">
                            </el-table-column>
                            <el-table-column prop="create_time" label="销量" width="200">
                            </el-table-column>
                            <el-table-column prop="nick_name" label="状态" width="90">
                            </el-table-column>
                            <el-table-column prop="shop_name" label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button @click="contentClick(scope)" type="text" size="small">查看</el-button>
                                    <el-button @click="contentClick(scope)" type="text" size="small">编辑</el-button>
                                    <el-button @click="contentClick(scope)" type="text" size="small">下架</el-button>
                                    <el-button @click="contentClick(scope)" type="text" size="small">查看评价</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- 分页 -->

                    <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit"
                                @pagination="getList" />
                </div>
            </el-tab-pane>
            <el-tab-pane label="易货商品列表" name="second">
                <div class="show_two">
                    <div>
                        <h6 class="h6" v-if="totalOne>0">共{{totalOne}}条记录，{{tableList.pages}}页。当前为第{{form.page}}页</h6>

                        <el-table :data="tableList.list" border style="width: 100%">
                            <el-table-column prop="serial_number" label="商品名称" width="220">
                            </el-table-column>
                            <el-table-column prop="payment_state" label="商品分类" width="80">
                            </el-table-column>
                            <el-table-column prop="payment_channel" label="商品属性" width="80">
                            </el-table-column>
                            <el-table-column prop="create_time" label="销量" width="200">
                            </el-table-column>
                            <el-table-column prop="nick_name" label="状态" width="90">
                            </el-table-column>
                            <el-table-column prop="shop_name" label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button @click="contentClick(scope)" type="text" size="small">查看</el-button>
                                    <el-button @click="contentClick(scope)" type="text" size="small">编辑</el-button>
                                    <el-button @click="contentClick(scope)" type="text" size="small">下架</el-button>
                                    <el-button @click="contentClick(scope)" type="text" size="small">查看评价</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- 分页 -->
                    <pagination v-if="totalOne>0" :total="totalOne" :page.sync="form.page" :limit.sync="form.limit"
                                @pagination="getLowerAgentData" />
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "newArticles",
        data() {
            return {
                activeName: 'first',
                form: {
                    page: 1,
                    limit: 10
                },
                options: [{
                    value: '1',
                    label: '全部'
                }, {
                    value: '3',
                    label: '待审核'
                }, {
                    value: '2',
                    label: '上架'
                }, {
                    value: '3',
                    label: '已下架'
                }],

                shzt: '',
                name: '',
                tel: '',
                tableData:[],
                tableList:[],
                total:'',
                totalOne:'',
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            //添加文交产品
            addArticle(){
                this.$router.push({path: '/addArticleGoods',query:{}})
            },
            barterGoods(){
                this.$router.push({path: '/barterGoods',query:{}})
            },
            getList() { //初始化
                let data = {
                    user_id:this.user.id,
                    begin_time: this.dataTime,
                    end_time: this.dataTime1,
                    agent_application_id:this.id,//代理商ID
                    myOrder:0,//是否自主开发，0区域交易量代理费,1自主开发交易量
                    pageNum: this.form.page,
                    pageSize: this.form.limit,
                };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.queryAgentOderDetailList,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.tableData=res.data.data;
                        this.total=this.tableData.total;
                        this.dataTime='';
                        this.dataTime1='';
                        this.timer=[];
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
            getLowerAgentData() { //查询
                let data = {
                    user_id:this.user.id,
                    begin_time: this.dataTime2,
                    end_time: this.dataTime3,
                    agent_application_id:this.id,//代理商ID
                    myOrder:1,//是否自主开发，0区域交易量代理费,1自主开发交易量
                    pageNum: this.form.page,
                    pageSize: this.form.limit,
                }
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.queryAgentOderDetailList,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.tableList=res.data.data;
                        this.totalOne=this.tableList.total;
                        this.dataTime2='';
                        this.dataTime3='';
                        this.timer=[];
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        })
                    }else {
                        this.$message({
                            message:res.data.msg,
                            type: 'warning'
                        })
                        this.tableList=[]
                    }
                }).catch(res=>{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    })
                    this.tableList=[]
                })
            },
        }
    }
</script>

<style scoped>
    .markingDetails_head{width: 100%;}
    .markingDetails_head ul{overflow: hidden;padding: 0;}
    .markingDetails_head ul li{float: left;overflow: hidden;width: 22%;line-height: 40px;font-size: 16px; }
    .markingDetails_head ul li:nth-child(1){width: 10%;}
    .markingDetails_head ul li:nth-child(2){width: 10%;}
    .se-pl {margin-right: 10px;}
    .inputes {display: inline-block !important;}
</style>