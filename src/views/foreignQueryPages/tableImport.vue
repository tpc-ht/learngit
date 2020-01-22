<template>
    <div class="app-container">
        <div class="head-ed">
            <ul>
               <!-- <li>
                    <el-row class="inputes1">选择Excel文件
                        <input type="file" @change="importf(this)"
                               accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                    </el-row>
                </li> -->
                <li>
                <div class="block">
                <span class="se-pl" style="margin-right:10px;">交易时间</span>
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
                <!-- <li> -->
                <!--<div class="block">-->
                <!--<span class="se-pl" style="margin-right:10px;">确认收货时间</span>-->
                <!--<el-date-picker-->
                <!--v-model="confirmTimer"-->
                <!--value-format="timestamp"-->
                <!--type="daterange"-->
                <!--placeholder="请选择"-->
                <!--range-separator="至"-->
                <!--start-placeholder="开始日期"-->
                <!--end-placeholder="结束日期"-->
                <!--&gt;</el-date-picker>-->
                <!--</div>-->
                <!--</li>-->
                <li>
                <span class="se-pl">购买人账号</span>
                <div class="inputes">
                <el-input placeholder="请输入" v-model="name" clearable style="width:185px;"></el-input>
                </div>
                </li>
                <li>
                <span class="se-pl">挂单号</span>
                <div class="inputes">
                <el-input v-model="contact" placeholder="请输入" style="width:185px;"></el-input>
                </div>
                </li>
				<li>
				<span class="se-pl">商品代码</span>
				<div class="inputes">
				<el-input v-model="goodsNum" placeholder="请输入" style="width:185px;"></el-input>
				</div>
				</li>
				<li>
				<span class="se-pl">商品名称</span>
				<div class="inputes">
				<el-input v-model="goodsName" placeholder="请输入" style="width:185px;"></el-input>
				</div>
				</li>
				
				
                <!--<li>-->
                <!--<span class="se-pl">结款状态</span>-->
                <!--<div class="inputes">-->
                <!--<el-select v-model="money" clearable placeholder="请选择">-->
                <!--<el-option v-for="item in opsed" :key="item.value" :label="item.label" :value="item.value">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</div>-->
                <!--</li>-->
                <!--<li>-->
                <!--<span class="se-pl">支付方式</span>-->
                <!--<div class="inputes">-->
                <!--<el-select v-model="zffs" clearable placeholder="请选择">-->
                <!--<el-option v-for="item in opsedList" :key="item.value" :label="item.label" :value="item.value">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</div>-->
                <!--</li>-->
                <!--<li>-->
                <!--<span class="se-pl">订单ID</span>-->
                <!--<div class="inputes">-->
                <!--<el-input v-model="orderId" placeholder="请输入" style="width:185px;"></el-input>-->
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

            </ul>
        </div>
        <h6 class="h6" v-if="total>0">共{{total}}条记录，{{initData.pages}}页。当前为第{{form.page}}页</h6>
        <el-table 
		:data="initData.list" 
		v-loading="this.$store.getters.getLoadingBool"
		element-loading-text="拼命加载中..."
		border fit highlight-current-row style="width: 100%">
            <el-table-column width="80px" align="center" label="序号">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="交易日期">
                <template slot-scope="scope">
                    <span>{{scope.row.trade_time}}</span>
                </template>
            </el-table-column>
            <!--<el-table-column width="160px" align="center" label="时间">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{scope.row.create_time}}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" label="购买人姓名" width="100px">
                <template slot-scope="scope">
                    <span>{{ scope.row.user_name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="购买人账号" width="140px">
                <template slot-scope="scope">
                    <span>{{ scope.row.accounts }}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="购买数量">
                <template slot-scope="scope">
                    <span>{{ scope.row.amount }}</span>
                </template>
            </el-table-column>
            <el-table-column width="60px" align="center" label="单价">
                <template slot-scope="scope">
                    <span>{{ scope.row.unit_price }}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="支付金额">
                <template slot-scope="scope">
                    <span>{{ scope.row.pay_money }}</span>
                </template>
            </el-table-column>
            <!--<el-table-column width="140px" align="center" label="转让盈亏">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.totalMoney}}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column width="100px" align="center" label="商品代码">
                <template slot-scope="scope">
                    <span>{{ scope.row.goods_num}}</span>
                </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="商品名称">
                <template slot-scope="scope">
                    <span>{{ scope.row.goods_name}}</span>
                </template>
            </el-table-column>
            <!--<el-table-column width="200px" align="center" label="成交类型">-->
                <!--<template slot-scope="scope">-->
                    <!--<span v-if="scope.row.qty<10">没有</span>-->
                    <!--<span v-if="scope.row.qty>=10">有</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column width="200px" align="center" label="买卖方向">-->
                <!--<template slot-scope="scope">-->
                    <!--<span v-if="scope.row.qty<10">没有</span>-->
                    <!--<span v-if="scope.row.qty>=10">有</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column width="120px" align="center" label="挂单号">
                <template slot-scope="scope">
                    <span>{{ scope.row.single_num}}</span>
                </template>
            </el-table-column>
            <el-table-column width="70px" align="center" label="手续费">
                <template slot-scope="scope">
                    <span>{{ scope.row.poundage}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="分润">
                <template slot-scope="scope">
                    <span>{{ scope.row.profit_money }}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="购物券">
                <template slot-scope="scope">
                    <span>{{ scope.row.voucher }}</span>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-if="total>0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
        <el-dialog title="导入Excel文件错误提示" :visible.sync="dialogFormVisible" width="30%" center>
             <div class="Excel">
                 <h6>此编号为Excel文件的编号</h6>
                <ul>
                    <li v-for="(item,index) in inList">
                        <p>编号:{{item}}</p>
                    </li>
                </ul>
             </div>
            <!--<div slot="footer" class="dialog-footer">-->
                <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
            <!--</div>-->
        </el-dialog>
        <div class="loading" v-if="loading">
          <img src="../../assets/5-121204193R0-50.gif">
        </div>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import { Loading } from 'element-ui';
    import qs from 'qs'
    export default {
        components: { Pagination },

        data() {
            return {
                dialogFormVisible: false,
                form: {
                    page: 1,
                    limit: 10
                },
                name: '',//文交所账号
                contact: '',//挂单号
				goodsName:'',//商品名称
				goodsNum:'',//商品id
                money:'',
                agentCreateTime:'',
                endtime:'',
                confirmStartTime:'',
                confirmEndTime:'',
                id:'',
                order_id:'',
                orderId:'',
                timer: [],
                confirmTimer: [],
                formLabelWidth: '120px',
                inList:[],
                initData:[],
                total:'',
                formData:{
                    pay_money:'',
                    pay_method:'',
                    couponsNumber:'',
                },
                opsed: [{
                    value: '',
                    label: '全部'
                },{
                    value: '0',
                    label: '未结清'
                }, {
                    value: '1',
                    label: '已结清'
                }],
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
                tableList:[],
                loading:false,
				

            }
        },
        mounted() {this.getList()},
        methods: {
            getList(){
				this.$store.commit('setLoadingBool',true);
                let Time = this.timer;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.agentCreateTime = Start.getTime(); //当前时间转换成long型
                this.endtime = End.getTime()+Number(86399999); //当前时间转换成long型
                if (Time[0] == null) {
                    this.agentCreateTime ='';
                    this.endtime ='';
                }
                var data={
                    beginTime:this.agentCreateTime,
                    endTime:this.endtime,
                    accounts:this.name,
                    singleNum:this.contact,
					goods_name:this.goodsName,//商品名搜索
					goods_num:this.goodsNum,//商品ID搜索
                    pageNum: this.form.page,
                    pageSize:this.form.limit,
                };
                this.axios({
                    method: "post",
                    url: this.$local.http+this.$api.selectProfitDetail,
                    data:qs.stringify(data),
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
                    this.$message({message:res.data.msg, type: 'error'});
                    this.initData=[]
                })
            },
            async getData() { //初始化
				// const loading = this.$loading({lock: true,text: '拼命加载中...',});
                let Time = this.timer;
                let Start = new Date(Time[0]);
                let End = new Date(Time[1]);
                this.agentCreateTime = Start.getTime(); //当前时间转换成long型
                this.endtime = End.getTime()+Number(86399999); //当前时间转换成long型
                if (Time[0] == null) {
                    this.agentCreateTime ='';
                    this.endtime ='';
                }
                var data={
                    beginTime:this.agentCreateTime,
                    endTime:this.endtime,
                    accounts:this.name,
                    singleNum:this.contact,
					goods_name:this.goodsName,//商品名搜索
					goods_num:this.goodsNum,//商品ID搜索
                    pageNum: this.form.page,
                    pageSize:this.total,

                };
				let res =  await this.axios({
					method: "post",
					url: this.$local.http + this.$api.selectProfitDetail,
					data:qs.stringify(data),
				});
				if(res.data.success){
					this.tableList=res.data.data.list; 
				}else{
					this.$message({
						type:'error',
						message:res.data.msg
					});
					this.tableList=[];
				}
					
				// loading.close();
                // this.axios({
                //     method: "post",
                //     url: this.$local.http + this.$api.selectProfitDetail,
                //     data:qs.stringify(data),
                // }).then(res => {
                //     if (res.data.success) {
                //         this.tableList=res.data.data.list;
                //     }else {
                //         this.tableList=[]
                //     }
                // }).catch(res=>{
                //     this.$message({
                //         message:res.data.msg,
                //         type: 'error'
                //     });
                //     this.tableList=[]
                // })
				
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            export2Excel() {
                this.$confirm('确定要导出表格数据么？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
					require.ensure([], () => {
					    for (var i in this.tableList) {
					        if (this.tableList[i].payment_state == 0) {
					            this.tableList[i].payment_state = '未结款'
					        } else if (this.tableList[i].payment_state == 1) {
					            this.tableList[i].payment_state = '已结款'
					        }
					    }
					    const { export_json_to_excel } = require('../../vendor/Export2Excel');
					    const tHeader = ['交易日期','购买人姓名','购买人文交账号','购买数量','单价','支付金额','商品代码','商品名称','挂单号','手续费','分润','购物券'];
					    const filterVal = ['trade_time','user_name','accounts','amount','unit_price','pay_money','goods_num','goods_name','single_num',
					        'poundage','profit_money','voucher'];
					    const list = this.tableList;
					    const data = this.formatJson(filterVal, list);
					    export_json_to_excel(tHeader, data,'三七分润');
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
				// if (!(
				// this.timer[0] == null && 
				// this.goodsName=='' && 
				// this.goodsNum=='' && 
				// this.contact=='' && 
				// this.name=='')) {
					
				// }
				this.goodsName = '';
				this.goodsNum = '';
				this.contact = '';
				this.name = '';
				this.timer = [null,null];
				this.getList();
				this.$message({
				    type: 'success',
				    message: this.$store.getters.getResetText
				});
			},
            importf(obj) {
                this.loading=true;
                let _this = this;
                let inputDOM = this.$refs.inputer;   // 通过DOM取文件数据
                this.file = event.currentTarget.files[0];
                var rABS = false; //是否将文件读取为二进制字符串
                var f = this.file;
                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString)
                FileReader.prototype.readAsBinaryString = function(f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for (var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require('xlsx');
                        if (rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: 'binary'
                            });
                        }
                        // outdata就是你想要的东西 excel导入的数据
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                        console.log('11', outdata)
                        // excel 数据再处理
                        let arr = [];
                        outdata.map(v => {
                            let obj = {};
                            let time= v.交易日期+' '+v.时间;
                            let Start = new Date(time);
                            let dataTime=Start.getTime();
                            console.log('233', dataTime)
                            console.log('2334', time)
                            obj.id = v.编号;
                            obj.tradeDate = dataTime;
                            obj.userName = v.购买人姓名;
                            obj.accounts = v.购买人文交账号;
                            obj.number = v.购买数量;
                            obj.price = v.单价;
                            obj.factMoney = v.支付金额;
                            obj.profitAndLoss = v.转让盈亏;
                            obj.goodsNum = v.商品代码;
                            obj.goodsName = v.商品名称;
                            obj.dealType = v.成交类型;
                            obj.transaction = v.买卖方向;
                            obj.transNum = v.挂单号;
                            obj.poundage = v.手续费;
                            obj.profitNum = v.分润;
                            obj.vouchers = v.购物券;
                            arr.push(obj)
                        });
                        _this.accountList = [...arr];
                        // _this.$message({
                        //     message: '请耐心等待导入成功',
                        //     type: 'success'
                        // });
                        let data={
                            list: JSON.stringify(_this.accountList)
                        };
                        _this.axios({
                            method: "POST",
                            url: _this.$local.http+_this.$api.inportProfitDetail,
                            data:qs.stringify(data),
                        }).then(res=>{
                            if (res.data.success) {
                                _this.loading=false;
                                console.log(res.data.data[0]);
                                if(res.data.data[0]==undefined){
                                }else {
                                    _this.dialogFormVisible=true;
                                    _this.inList=res.data.data;
                                }
                                _this.$message({message:res.data.msg, type: 'success'});
                                _this.getList()

                            }else {
                                _this.loading=false;
                                _this.$message({message:res.data.msg, type: 'error'})
                            }
                        }).catch(res=>{
                            _this.$message({message:res.data.msg, type: 'error'})
                        });
                    };
                    reader.readAsArrayBuffer(f);
                };
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            },

        }
    }
</script>

<style scoped>
    .app-container{width: 100%;background-color: #fff;padding: 20px;}
    .inputes1 {
        position: relative;
        display: inline-block;
        background:#18c79c;
        border: 1px solid rgb(191, 217, 214);
        border-radius: 4px;
        padding: 6px 12px;
        overflow: hidden;
        color: #fff;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
    }
    .inputes1 input {
        position: absolute;
        font-size: 14px;
        right: 0;
        top: 0;
        opacity: 0;
        width:116px ;
        line-height: 28px;
    }
    .inputes1:hover {
        text-decoration: none;
        padding: 6px 13px;
    }
    .inputes {display: inline-block !important;}
    .se-pl {margin-right: 10px;}
    .head-ed {margin-top: 10px;}
    .head-ed ul{overflow: hidden;padding: 0;}
    .head-ed ul li{float: left;margin: 15px 1% 0 0;}
    .el-select {width: 185px !important;}
    /deep/.el-dialog__footer{padding-bottom:30px!important;}
    /deep/.cell{padding: 0 5px!important;}
    /deep/.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {width: 100%;padding: 3px 0;}
    .h6{padding: 10px 5px;font-size: 16px;}
    .Excel h6{
        line-height: 30px;
        font-size: 16px;
    }
    .Excel ul{
        overflow: hidden;
    }
    .Excel ul li{
        line-height: 30px;
        font-size: 14px;
        float: left;
        width: 10%;
    }
    .loading{
        background:rgba(0, 0, 0, 0.4);
        width: 100%;
        height: 100vh;
        position: fixed;
        top:0;
        left: 0;
        z-index: 100;
    }
    .loading img{
        width: 50px;
        top: 50%;
        position: relative;
        left: 50%;
    }
</style>
