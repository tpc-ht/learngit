<template>
    <div style="padding:20px;">
        <div class="head-ed">
            <div class="p_one">
                <p class="se-pl">用户姓名：{{userName}}</p>
                <p class="se-pl">用户ID：{{userId}}</p>
                <p class="se-pl">联系方式：{{userPhone}}</p>
                <p class="se-pl">所属上级ID：{{superId}}</p>
                <p class="se-pl">所属上级联系方式：{{superPhone}}</p>
                <p class="se-pl">拥有下级数量：{{lowerLevelNum}}</p>
            </div>
        </div>
                <div class="title">
                    <h5>下级列表</h5>
                    <el-row class="inputes">
                        <el-button @click='export2Excel()' type='primary'>导出Excel表</el-button>
                    </el-row>
                </div>
                <h6 class="h6" v-if="total>0">共{{total}}条记录，{{tableData.pages}}页。当前为第{{form.page}}页</h6>
                <div class="show_one">
                    <el-table :data="tableData.list" border style="width: 100%">
                        <el-table-column prop="id" label="标号" width="60">
                        </el-table-column>
                        <el-table-column prop="nick_name" label="用户姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="user_id" label="用户ID" width="100">
                        </el-table-column>
                        <el-table-column prop="phone" label="联系方式" width="120">
                        </el-table-column>
                    </el-table>
                </div>
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import qs from 'qs'
    export default {
        name: "subordinate",
        data() {
            return {
                activeName: 'first',
                tableData:[],
                userName:this.$route.query.userName,
                userPhone:this.$route.query.phone,
                userId:this.$route.query.userId,
                superId:this.$route.query.superId,
                superPhone:this.$route.query.superPhone,
                lowerLevelNum:this.$route.query.lowerLevelNum,
                form:{page: 1, limit: 10},
                total:'',
                tableList:[],
            }
        },
        components: {
            Pagination
        },
        mounted() {
            this.getList();
            this.getData();
        },
        methods: {
            getList() { //查询
                let data = {
                    userId: this.userId,
                    pageNum: this.form.page,
                    pageSize: this.form.limit,
                };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.queryLowerLevel,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(data => {
                    let res = data.data;
                    if (res.success) {
                        this.tableData = res.data;
                        this.total=this.tableData.total;
                        this.$message({message: res.msg, type: 'success'});
                    } else {
                        this.tableData =[];
                        this.$message({message: res.msg, type: 'warning'});
                    }
                })
            },
            getData() { //初始化
                let data={
                    userId: this.userId,
                    pageNum: '',
                    pageSize: '',
                };
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.queryLowerLevelAll,
                    data: qs.stringify(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.tableList=res.data.data;
                    }else {
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
                        const tHeader = ['标号','用户姓名','用户ID','联系方式',];
                        const filterVal = ['id','nick_name','user_id','phone',];
                        const list = this.tableList;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data,'下级列表');
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消导出'
                    });
                });
            },
        },
    }
</script>

<style scoped>
    .se-pl {
        margin-right: 10px;
        font-size: 16px;
        width: 100%;
        line-height: 40px;
    }
    .head-ed {
        margin-top: 10px;
    }
    .p_one div {
        float: left;
    }
    .h6{padding: 5px 5px 15px;font-size: 16px;}
    .title{overflow: hidden;padding: 10px 0;}
    h5{font-size: 18px;color: #18c79c;float: left;line-height: 36px;}
    .title div{float: left;margin-left: 40px;}
</style>