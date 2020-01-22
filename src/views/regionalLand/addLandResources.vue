<template>
    <div style="padding:20px;">
        <div class="head-sd">
            <table class="sed-tab">
                <tr>
                    <td class="td-o">
                        联系人：
                    </td>
                    <td class="td-t">
                        <el-input class="input-one" v-model="name" placeholder="填写姓名"></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="td-o">
                        联系电话：
                    </td>
                    <td class="td-t">
                        <el-input class="input-one" v-model="tel" placeholder="填写电话"></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="td-o">
                        选择类型：
                    </td>
                    <td class="td-t">
                        <el-select class="input-one" v-model="xs" clearable placeholder="请选择" @change="obtainValue">
                            <el-option key="线上" label="线上" value="线上">线上</el-option>
                            <el-option key="线下" label="线下" value="线下" v-if="yw==14">线下</el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td class="td-o">
                        标题：
                    </td>
                    <td class="td-t">
                        <el-input class="input-one" v-model="idcard" placeholder="填身份证号"></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="td-o">
                        所在位置：
                    </td>
                    <td class="td-t">
                        <div style="overflow: hidden;" class="sedf">
                            <div class="town">
                                <el-cascader v-model="adderedOne" :options="selected" change-on-select></el-cascader>
                                <el-select v-model="adderedTwo" clearable placeholder="请选择">
                                    <el-option v-for="item in adderssM" :key="item.code" :label="item.name" :value="item.code">
                                    </el-option>
                                </el-select>
                                <el-select v-model="adderedThree" clearable placeholder="请选择">
                                    <el-option v-for="item in adderssN" :key="item.code" :label="item.name" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="td-o">
                        面积：
                    </td>
                    <td class="td-t">
                        <el-input class="input-one1" v-model="adderss" placeholder="请输入"></el-input>
                        <el-select class="input-one2" v-model="xs" clearable placeholder="请选择" @change="obtainValue">
                            <el-option key="线上" label="线上" value="线上">线上</el-option>
                            <el-option key="线下" label="线下" value="线下">线下</el-option>
                        </el-select>
                    </td>
                </tr>

                <tr>
                    <td class="td-o">
                        付款方式：
                    </td>
                    <td class="td-t">
                        <el-select class="input-one" v-model="yw" clearable placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td class="td-o">
                        土地年限：
                    </td>
                    <td class="td-t">
                        <el-input class="input-one" v-model="idcard" placeholder="请输入"></el-input>
                    </td>
                </tr>

                <tr>
                    <td class="td-o">
                        出租价格：
                    </td>
                    <td class="td-t">
                        <div class="radio_div">
                        <el-radio-group v-model="radio" @change="change">
                            <el-radio :label="1">
                                <el-input class="input-one3" v-model="idcard" placeholder="请输入"></el-input> 每年
                            </el-radio>
                            <el-radio :label="2"><p class="el-pp">面议</p></el-radio>
                        </el-radio-group>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="td-o">
                        预约带看费：
                    </td>
                    <td class="td-t">
                        <div class="radio_div">
                        <el-radio-group v-model="radioData" @change="change">
                            <el-radio :label="1">
                                <el-input class="input-one3" v-model="idcard" placeholder="请输入"></el-input>
                            </el-radio>
                            <el-radio :label="2"><p class="el-pp">免费</p></el-radio>
                        </el-radio-group>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="td-o">
                        详细介绍：
                    </td>
                    <td class="td-t">
                        <el-input class="input-one" v-model="dl_pice" placeholder="请输入"></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="td-o">
                        添加图片：
                    </td>
                    <td class="td-t">


                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="td-h-t">
                        <el-row class="inputes">
                            <el-button @click="bton()">确认发布</el-button>
                        </el-row>
                    </td>
                </tr>

            </table>
        </div>
    </div>
</template>
<script>
    import adderss from '@/api/adderss'
    import qs from 'qs'
    export default {
        name:'addLandResources',
        data() {
            return {
                hShow:true,
                fShow: false,
                options: '',
                xslist: [{
                    value: '线上',
                    label: '线上'
                }, {
                    value: '线下',
                    label: '线下'
                }],
                qx: [{
                    value: '3',
                    label: '县级'
                }, {
                    value: '4',
                    label: '乡镇级'
                }, {
                    value: '5',
                    label: '村社级'
                }],
                xz: [{
                    value: '1',
                    label: '省级'
                }, {
                    value: '2',
                    label: '区县级'
                }],
                name: '',
                idcard: '',
                adderss: '',
                tel: '',
                yw: '',
                xs: '',
                qxvalue: '',
                Timer: '',
                dl_pice: '',
                dj_pice: '',
                sj_pice: '',
                proxy_pice:'',
                proxy_money:'',
                selected: adderss,
                adderedOne: '',
                adderedTwo: '',
                adderedThree: '',
                adderssM: [],
                adderssN: [],
                adestd: [],
                m1:'',
                m2:'',
                m3:'',
                radio: 1,
                radioData:1,
                radioShow:true,
                radioShowOne:false,
                init:[],
                Money:{},
                activeType:'',

            }
        },
        created() {

        },
        mounted() {
            this.getYw();
        },
        methods: {
            change(){

            },
            //提交农家餐饮
            bton() {
                var agentCreateTime;
                if(this.Timer==''){
                    agentCreateTime='';
                }else{
                    agentCreateTime = this.Timer.getTime(); //当前时间转换成long型
                }
                var h1='',h2='';
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

                if(this.qxvalue==3&&this.radio==1){
                    this.proxy_money=this.Money.countryMoney_active
                }else if(this.qxvalue==4&&this.radio==1){
                    this.proxy_money=this.Money.townMoney_active
                }else if(this.qxvalue==5&&this.radio==1){
                    this.proxy_money=this.Money.villageMoney_active
                }else  if(this.qxvalue==3&&this.radio==2){
                    this.proxy_money=this.Money.countryMoney
                }else if(this.qxvalue==4&&this.radio==2){
                    this.proxy_money=this.Money.townMoney
                }else if(this.qxvalue==5&&this.radio==2){
                    this.proxy_money=this.Money.villageMoney
                }
                var user=sessionStorage.getItem('user');
                var userId=JSON.parse(user) ;
                let this_ = this;
                const formDatas=new FormData()
                formDatas.append('userId',userId.id);//省
                formDatas.append('typeid',this.yw);//省
                formDatas.append('province',this.province);//省
                formDatas.append('city',this.city);//省
                formDatas.append('country',this.country);//省
                formDatas.append('town',h1);//省
                formDatas.append('village',h2);//省
                formDatas.append('level',this.qxvalue);
                formDatas.append('realName',this.name);
                formDatas.append('phone',this.tel);//省
                formDatas.append('idCardNumber',this.idcard);//身份证号码
                formDatas.append('cardAddress',this.adderss);//家庭地址(请拼接后在传)
                formDatas.append('proxyMoney',this.proxy_money);//代理费用
                formDatas.append('earnestMoney','0');//定金
                formDatas.append('proxyPayed',this.proxy_pice);//实际缴纳费用
                formDatas.append('payMethod',this.radioData);//支付方式：0.未支付1.微信2.支付宝3.现金4.转账5.汇款
                formDatas.append('signType',this.xs);//签约形式:线上/线下
                formDatas.append('agentCreateTime',agentCreateTime);//代理商申请时间
                formDatas.append('activeType',this.radio);//代理商申请时间

                if(formDatas.province==undefined){
                    formDatas.province='';
                }
                if(this.city==undefined){
                    formDatas.city='';
                }
                if(this.country==undefined){
                    formDatas.country='';
                }

                console.log(formDatas);
                this.axios({
                    method: "post",
                    url: this.$local.http + this.$api.addLandProxtyInfo,
                    data:formDatas,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(data => {
                    let res = data.data;
                    console.log(res)
                    if(res.success==true){
                        this.$message({
                            message:res.msg,
                            type: 'success'
                        })

                        this.$router.push({
                            path: '/Agent'
                        })
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
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
                    let obj = {}
                    if (res.success) {
                        for (let v of arr) {
                            obj = {
                                value: v.id,
                                label: v.typeName
                            }
                            arrey.push(obj);
                        }
                        this.options = arrey;
                    }
                })
            },
        },
        watch: { //监听地址
            adderedOne: function(val, old) {
                this.adderedTwo ='';
                var arr = val;
                this.m1=arr[0];
                this.m2=arr[1];
                this.m3=arr[2];
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
                    let data = {
                        code: arr[2]
                    };
                    console.log(data);
                    this.axios({
                        method: "post",
                        url: this.$local.http + this.$api.getAid2018ByCode,
                        data: qs.stringify(data),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(data => {
                        let res = data.data;
                        console.log(res)
                        if(res.success==true){
                            this.$message({
                                message:res.msg,
                                type: 'success'
                            })
                            this.adderssM = res.data;
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }

                    })
                } else {
                    console.log('位数不够！');
                }

            },
            adderedTwo: function(Val, old) {
                this.adderedThree ='';
                let val = Val;
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
                    console.log(res)
                    if(res.success==true){
                        this.$message({
                            message:res.msg,
                            type: 'success'
                        })
                        this.adderssN = res.data;
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }


                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .town {
        display: inline-block;
        margin-left: 10px;
    }

    .sedf>div {
        float: left;
    }

    .area-select.large {
        width: 100%;
        line-height: 20px;
    }

    .sed-tab {
        margin: 0 auto;
        margin-top: 40px;

        td {
            height: 40px;
        }

        .td-o {
            text-align: right;
        }
    }

    .losed {
        margin-left: 20px;
    }
    .radio_div{
        width: 300px;
        height: 72px;
        padding-left: 10px;
       }
    .input-one {
        width: 300px;
        height: 36px;
        padding-left: 10px;
    }
    .input-one1 {
        width: 200px;
        height: 36px;
        padding-left: 10px;
    }
    .input-one3 {
        width: 267px;
        height: 36px;
        padding-left: 10px;
    }
    .input-one2 {
        width: 100px;
        height: 36px;
    }
    .el-radio {
        font-size: 14px;
        height: 36px!important;
        line-height: 36px;
        margin-left: 0!important;
    }
    .el-pp {
        font-size: 14px;
        padding-left: 15px;
        display: inline-block;
    }
    .input-one-rt {
        margin-top: 10px;
        margin-left: 30px;
    }

    input::placeholder {
        font-size: 12px;
    }

    .td-h-t {
        text-align: center;
    }

    .bton {
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #49a714;
        color: #fff;
        outline: none;
        border: 0;
        cursor: pointer;
        border-radius: 5px;
    }
    .tr_div{padding: 10px;margin-left: 20px;}
    .tr_div p{line-height: 26px;}
    .tr_div p input{
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid rgb(191, 217, 214);
        box-sizing: border-box;
        color: rgb(31, 61, 57);
        font-size: inherit;
        height: 36px;
        line-height: 1;
        outline: 0;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 12%;
        display: inline-block;
    }
</style>
