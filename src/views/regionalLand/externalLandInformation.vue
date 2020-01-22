<template>
    <div class="markingDetails">
        <div class="markingDetails_head">
            <ul>
                <li>
                    <p class="markingDetails_head_left">发布人</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">联系方式</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">发布日期</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">类型</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">标题</p>
                    <p class="markingDetails_head_right">良田急租年付5000起</p>
                </li>
                <li>
                    <p class="markingDetails_head_left">所在位置</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">面积</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">付款方式</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">土地年限</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">出租价格</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">预约带看费</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li class="li">
                    <p class="markingDetails_head_left1">详细介绍</p>
                    <p class="markingDetails_head_right"></p>
                </li>
            </ul>
            <div class="markingDetails_head_img">
                <div>
                    <img src=" "/>
                </div>

            </div>
        </div>
        <div class="title">
            <h6 class="h6">历史跟踪记录</h6>
            <el-row class="h6_right">
                <el-button @click="add_dl">添加跟踪记录</el-button>
            </el-row>
        </div>
        <div class="markingDetails_con">
            <ul>
                <li>
                    <div class="markingDetails_con_left">A</div>
                    <div class="markingDetails_con_right">
                        <p>合作状态：已合作</p>
                        <p>备注：这个客户有强烈意向，值得追踪！</p>
                        <p class="markingDetails_con_right_p">2017-10-10  10：10：10</p>
                    </div>
                </li>
                <li>
                    <div class="markingDetails_con_left1">B</div>
                    <div class="markingDetails_con_right">
                        <p>合作状态：已合作</p>
                        <p>备注：这个客户有强烈意向，值得追踪！</p>
                        <p class="markingDetails_con_right_p">2017-10-10  10：10：10</p>
                    </div>
                </li>
                <li>
                    <div class="markingDetails_con_left2">C</div>
                    <div class="markingDetails_con_right">
                        <p>合作状态：已合作</p>
                        <p>备注：这个客户有强烈意向，值得追踪！</p>
                        <p class="markingDetails_con_right_p">2017-10-10  10：10：10</p>
                    </div>
                </li>
            </ul>
        </div>
        <el-dialog title="添加跟踪记录" :visible.sync="centerDialogVisible" width="30%" center>
            <div class="dialog_div">
                <p>用户等级</p>
                <el-radio-group v-model="radio">
                    <el-radio :label="1">A类优质客户</el-radio>
                    <el-radio :label="2">B类中等客户</el-radio>
                    <el-radio :label="3">C类劣质客户</el-radio>
                </el-radio-group>
            </div>
            <div class="dialog_div">
                <p>备注</p>
                <textarea type="text" placeholder="请输入" rows="4"></textarea>
            </div>
            <div class="dialog_div">
                <p>是否合作</p>
                <el-radio v-model="radioOne" label="1">已合作</el-radio>
                <el-radio v-model="radioOne" label="2">未合作</el-radio>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
         </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "externalLandInformation",
        data() {
            return {
                opt: '',
                form: {
                    page: 1,
                    limit: 10
                },
                options: [{
                    value: '0',
                    label: '已结清'
                }, {
                    value: '1',
                    label: '未结清'
                }],
                opsed: [{
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
                opted: [{
                    value: '1',
                    label: '有效'
                }, {
                    value: '2',
                    label: '无效'
                }],
                shzt: '',
                name: '',
                tel: '',
                timer: [],
                dljb: '',
                dltype: '',
                dlzt: '',
                tableData: [],
                centerDialogVisible: false,
                radio: 1,
                radioOne:'1',
            }
        },
        created() {


        },
        mounted() {

        },
        methods: {
            getList(){

            },
            add_dl() {
                this.centerDialogVisible = true
            },
        }
    }
</script>

<style scoped>
    .markingDetails_head{width: 100%;padding-bottom: 20px;overflow: hidden;}
    .markingDetails_head ul{overflow: hidden;padding: 0;float: left;width: 75%;}
    .markingDetails_head ul li{float: left;overflow: hidden;width: 33%;line-height: 40px;font-size: 16px;}
    .li{width: 100%!important;line-height: 40px;font-size: 16px; }
    .markingDetails_head_left{float: left;text-align: left;width: 20%;color: #333333;}
    .markingDetails_head_left1{float: left;text-align: left;width: 6.6%;color: #333333;}
    .markingDetails_head_right{float: left;text-align: left;width: 80%;color: #666666;}
    .markingDetails_head_img{float: left;width: 25%;padding-left: 2%}
    .markingDetails_head_img div{width: 300px;height: 200px;background-color: #dddddd;border-radius: 5px;}
    .markingDetails_head_img div img{width: 100%;border-radius: 5px;height: 100%;}
    .title{overflow: hidden;}
    .h6 {float: left;padding: 10px 5px;font-size: 16px;}
    .h6_right{margin-bottom: 10px;margin-left: 15px;float: left;}
    .markingDetails_con{width: 100%;}
    .markingDetails_con ul{padding: 0;}
    .markingDetails_con ul li{padding: 15px;overflow: hidden;}
    .markingDetails_con_left{width: 84px;height: 84px;background-color: #ff6e5b;border-radius: 8px;float: left;line-height: 84px;text-align: center;color: #fff;
        font-size: 52px;}
    .markingDetails_con_right{float: left;width: 80%;padding-left: 20px;}
    .markingDetails_con_right p{color: #333333;line-height: 30px;font-size: 14px;}
    .markingDetails_con_right_p{color: #666666!important;font-size: 12px!important;}
    .markingDetails_con_left1{width: 84px;height: 84px;background-color: #49c9c8;border-radius: 8px;float: left;line-height: 84px;text-align: center;color: #fff;
        font-size: 52px;}
    .markingDetails_con_left2{width: 84px;height: 84px;background-color: #fdd631;border-radius: 8px;float: left;line-height: 84px;text-align: center;color: #fff;
        font-size: 52px;}
    .dialog_div{overflow: hidden;padding-bottom: 15px;}
    .dialog_div p{float: left;width: 20%;text-align: right;padding-right: 30px;color: #000;}
    .dialog_div textarea{float: left;width: 50%;outline: none;padding: 10px;}

</style>