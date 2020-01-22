<template>
    <div class="AgencyFee">
        <h6>文交所每日最大释放量</h6>
        <div class="buylimit2">
            <div>
                <div class="buylimit1">释放最大值 / 笔</div>
                <input type="text" :placeholder="initBuyLimit.maxReleaseNum||'请输入'" v-model.trim='maxReleaseNum'/>
                <p>（ 注 ）文交所订单 / <span style="color: red;">每笔</span> ：释放数量大于设定值时，按设定值做释放计算；释放数量小于设定值，按订单的实际释放值计算</p>
            </div>
            <div>
                <div class="buylimit1">释放最大值 / 天</div>
                <input type="text" :placeholder="initBuyLimit.maxDayReleaseNum||'请输入'" v-model.trim='maxdayreleasenum'/>
                <p>（ 注 ）文交所订单 / <span style="color: red;">每天</span> ：释放数量大于设定值时，按设定值做释放计算；释放数量小于设定值，按订单的实际释放值计算</p>
            </div>
            <el-row class="buylimit3">
                <el-button  @click="saveBuyLimit()">提交修改</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "releaseQuantity",
        data() {
            return {
                maxReleaseNum:'',
                maxdayreleasenum:'',
                initBuyLimit:[],
            }
        },
        mounted() {
            this.initBuyLimitSet();
        },
        methods: {
            //初始化购买上限数据
            initBuyLimitSet(){
                this.axios({
                    method: "POST",
                    url: this.$local.http+this.$api.queryMaxReleaseNum,
                    data:"",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    if (res.data.success) {
                        this.initBuyLimit=res.data.data;
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'})
                })
            },
            //保存购买上限
            saveBuyLimit(){
                let this_ = this;
                const formDatas=new FormData();
                formDatas.append('maxreleasenum',this_.maxReleaseNum||this_.initBuyLimit.maxReleaseNum);//释放最大值
                formDatas.append('maxdayreleasenum',this_.maxdayreleasenum||this_.initBuyLimit.maxDayReleaseNum);//释放最大值
                this.axios({
                    method: "POST",
                    url: this.$local.http+this.$api.updateMaxReleaseNum,
                    data:formDatas,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    if (res.data.success) {
                        this.$message({message:res.data.msg, type: 'success'})
                    }else {
                        this.$message({message: res.data.msg, type: 'warning'});
                    }
                }).catch(res=>{
                    this.$message({message:res.data.msg, type: 'error'})
                })
            },
        }
    }
</script>

<style scoped>
    .AgencyFee{width: 100%;background-color: #fff;padding: 20px;}
    h6{font-size: 16px;color: #000;margin: 20px 0;}
    .buylimit1{
        font-size: 14px;
        line-height: 34px;
        padding:15px 20px 15px 0;
        color: #000;
        width: 200px;
    }
    .buylimit2 input{
        width: 300px;
        line-height: 30px;
        padding-left: 10px;
    }
    .buylimit3{
        margin-top: 20px;
    }
    p{padding-top: 20px;}
</style>