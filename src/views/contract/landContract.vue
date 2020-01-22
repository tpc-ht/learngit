<template>
    <div>
        <div class="pa_t">
            <p>搜了农庄app</p>
            <p>区域经营商代理合同</p>
        </div>
        <div class="pt_a">
            <p>甲方：<span class="block"> 海口市搜了科技有限公司</span></p>
            <p>乙方：<span class="block"> {{real_name}}</span></p>
            <p>根据《中华人民共和国合同法》、《电子商务法》等相关法律规定，甲乙双方本着平等互利、诚实守信、发展共赢的原则，经协商一致，特签定本合同。具体条款如下：</p>
            <p class="wag">一、双方主体</p>
            <p>1、甲方是“搜了农庄APP”的持有者，合法拥有“搜了农庄APP”的所有权。</p>
            <p>2、乙方是具有独立民事权利能力和行为能力的民事主体，经自愿申请获得甲方同意后成为“搜了农庄APP”线下销售代理商，并满足各项资质条件，能够为各类用户相关的需求提供优质服务。同时乙方在线下开展业务过程中，能独立享受本合同约定的权利并承担约定的义务与责任。</p>
            <p class="wag">二、代理关系 </p>
            <p>1、乙方自愿申请作为甲方在本合同约定地区范围内、约定业务范围内做区域代理商，代理在当地的具体运营、市场拓展和管理服务等业务工作。</p>
            <p>2、乙方代理业务为<span class="block">搜了农庄APP – 土地流转、农庄租赁、闲置宅基地、农产品类目 </span> 。</p>
            <p>3、乙方代理区域为{{proxy_region}}</p>
            <p>4、乙方代理期限为壹年，自<span class="block">{{agent_create_time}}</span>开始至<span class="block">{{endtime}}</span>终止。
                合同期满后，乙方享有优先续签权，需提前30天向甲方申请续签，如双方未提前续签，本合同即自行终止。</p>
            <p>5、乙方代理区域以合同签订时的行政规划区域为准。</p>
            <p class="wag">三、代理模式及付款方式</p>
            <p v-if="level==3">代理商级别： <span class="gouxuan">☑</span>县区级       <span class="gou">□</span>乡镇级       <span class="gou">□</span>村社级</p>
            <p v-if="level==4">代理商级别：<span class="gou">□</span>县区级       <span class="gouxuan">☑</span>乡镇级       <span class="gou">□</span>村社级</p>
            <p v-if="level==5">代理商级别：<span class="gou">□</span>县区级       <span class="gou">□</span>乡镇级       <span class="gouxuan">☑</span>村社级</p>
            <p v-if="radio==1">1、活动期  <span class="gouxuan">☑</span></p>
            <p v-if="radio==2">1、活动期  <span class="gou">□</span></p>
            <p>①代理收费标准：</p>
            <p v-if="radio==1&&level==3">A、县区级代理免收代理费，收取定金<span class="block">{{proxy_money}}</span>元；</p>
            <p v-if="radio==1&&level==3"> B、乡镇级代理免收代理费，收取定金<span class="block"></span>元；</p>
            <p v-if="radio==1&&level==4">A、县区级代理免收代理费，收取定金<span class="block"></span>元；</p>
            <p v-if="radio==1&&level==4"> B、乡镇级代理免收代理费，收取定金<span class="block">{{proxy_money}}</span>元；</p>
            <p v-if="radio==1&&level==5">A、县区级代理免收代理费，收取定金<span class="block"></span>元；</p>
            <p v-if="radio==1&&level==5"> B、乡镇级代理免收代理费，收取定金<span class="block"></span>元；</p>
            <p>C、村社级收取代理费3000元；</p>
            <p v-if="radio==2">A、县区级代理免收代理费，收取定金<span class="block"></span>元；</p>
            <p v-if="radio==2">B、乡镇级代理免收代理费，收取定金<span class="block"></span>元；</p>
            <p v-if="radio==2">②付款方式：<span class="gou">□</span>现金    <span class="gou">□</span>微信    <span class="gou">□</span>支付宝    <span class="gou">□</span>转账    <span class="gou">□</span>汇款</p>
            <p v-if="pay_method==3&&radio==1">②付款方式：<span class="gouxuan">☑</span>现金    <span class="gou">□</span>微信    <span class="gou">□</span>支付宝    <span class="gou">□</span>转账    <span class="gou">□</span>汇款</p>
            <p v-if="pay_method==1&&radio==1">②付款方式：<span class="gou">□</span>现金    <span class="gouxuan">☑</span>微信     <span class="gou">□</span>支付宝    <span class="gou">□</span>转账    <span class="gou">□</span>汇款</p>
            <p v-if="pay_method==2&&radio==1">②付款方式：<span class="gou">□</span>现金    <span class="gou">□</span>微信    <span class="gouxuan">☑</span>支付宝    <span class="gou">□</span>转账    <span class="gou">□</span>汇款</p>
            <p v-if="pay_method==4&&radio==1">②付款方式：<span class="gou">□</span>现金    <span class="gou">□</span>微信    <span class="gou">□</span>支付宝    <span class="gouxuan">☑</span>转账    <span class="gou">□</span>汇款</p>
            <p v-if="pay_method==5&&radio==1">②付款方式：<span class="gou">□</span>现金    <span class="gou">□</span>微信    <span class="gou">□</span>支付宝    <span class="gou">□</span>转账    <span class="gouxuan">☑</span>汇款</p>
            <p>双方在签定此合同当日，乙方向甲方一次性支付：</p>
            <p v-if="radio==2">人民币： <span class="block"></span>元（大写：<span class="block"></span>）元；</p>
            <p v-if="radio==2">欠余款：人民币：<span class="block"></span>元（大写：<span class="block"></span>）元；</p>
            <p v-if="radio==1">人民币： <span class="block">{{proxy_payed}}</span>元（大写：<span class="block">{{textone}}</span>）元；</p>
            <p v-if="radio==1">欠余款：人民币：<span class="block">{{earnest_money}}</span>元（大写：<span class="block">{{texttwo}}</span>）元；</p>
            <p v-if="radio==2">2、非活动期  <span class="gouxuan">☑</span></p>
            <p v-if="radio==1">2、非活动期  <span class="gou">□</span></p>
            <p>①代理申请及收费标准：</p>
            <p v-if="radio==1">A、申请县区级代理交纳代理费 <span class="block"></span> 元（根据所属乡镇数量确定）；</p>
            <p v-if="radio==1">B、申请乡镇级代理交纳代理费  <span class="block"></span> 元（根据所属村社数量确定），
                其中甲方（平台）收取30%的服务费用，剩余70%的费用由甲方支付给区域内上一级代理商（即：县区级代理商计提乡镇级代理费）；</p>
            <p v-if="radio==2&&level==3">A、申请县区级代理交纳代理费 <span class="block">{{proxy_money||0}}</span> 元（根据所属乡镇数量确定）；</p>
            <p v-if="radio==2&&level==4">A、申请县区级代理交纳代理费 <span class="block"></span> 元（根据所属乡镇数量确定）；</p>
            <p v-if="radio==2&&level==3">B、申请乡镇级代理交纳代理费  <span class="block"></span> 元（根据所属村社数量确定），
                其中甲方（平台）收取30%的服务费用，剩余70%的费用由甲方支付给区域内上一级代理商（即：县区级代理商计提乡镇级代理费）；</p>
            <p v-if="radio==2&&level==4">B、申请乡镇级代理交纳代理费  <span class="block">{{proxy_money||0}}</span> 元（根据所属村社数量确定），
                其中甲方（平台）收取30%的服务费用，剩余70%的费用由甲方支付给区域内上一级代理商（即：县区级代理商计提乡镇级代理费）；</p>
            <p>C、申请村社级交纳代理费5000元，其中甲方（平台）收取30%的服务费用，剩余70%的费用由甲方支付给区域内上一级代理商（即：乡镇级代理商计提村社级代理费）；</p>
            <p>甲方在收到（乡镇级/村级经纪人）代理费后，以每月结算一次方式给区域内上一级代理商。</p>
            <p v-if="radio==1">②付款方式：<span class="gou">□</span>现金    <span class="gou">□</span>微信    <span class="gou">□</span>支付宝    <span class="gou">□</span>转账    <span class="gou">□</span>汇款</p>
            <p v-if="pay_method==3&&radio==2">②付款方式：<span class="gouxuan">☑</span>现金    <span class="gou">□</span>微信    <span class="gou">□</span>支付宝    <span class="gou">□</span>转账    <span class="gou">□</span>汇款</p>
            <p v-if="pay_method==1&&radio==2">②付款方式：<span class="gou">□</span>现金    <span class="gouxuan">☑</span>微信     <span class="gou">□</span>支付宝    <span class="gou">□</span>转账    <span class="gou">□</span>汇款</p>
            <p v-if="pay_method==2&&radio==2">②付款方式：<span class="gou">□</span>现金    <span class="gou">□</span>微信    <span class="gouxuan">☑</span>支付宝    <span class="gou">□</span>转账    <span class="gou">□</span>汇款</p>
            <p v-if="pay_method==4&&radio==2">②付款方式：<span class="gou">□</span>现金    <span class="gou">□</span>微信    <span class="gou">□</span>支付宝    <span class="gouxuan">☑</span>转账    <span class="gou">□</span>汇款</p>
            <p v-if="pay_method==5&&radio==2">②付款方式：<span class="gou">□</span>现金    <span class="gou">□</span>微信    <span class="gou">□</span>支付宝    <span class="gou">□</span>转账    <span class="gouxuan">☑</span>汇款</p>
            <p>双方在签定此合同当日，乙方向甲方一次性支付：</p>
            <p v-if="radio==1">人民币： <span class="block"></span>元（大写：<span class="block"></span>）元；</p>
            <p v-if="radio==1">欠余款：人民币：<span class="block"></span>元（大写：<span class="block"></span>）元；</p>
            <p v-if="radio==2">人民币： <span class="block">{{proxy_payed}}</span>元（大写：<span class="block">{{textone}}</span>）元；</p>
            <p v-if="radio==2">欠余款：人民币：<span class="block">{{earnest_money}}</span>元（大写：<span class="block">{{texttwo}}</span>）元；</p>
            <p>账户名称：海口市搜了科技有限公司</p>
            <p>开 户 行：兴业银行股份有限公司海口滨海支行</p>
            <p>账    号：622020100112688888</p>
            <p>乙方须在本合同签订3个自然日内以汇款转账的形式向甲方账户补齐所欠代理费/定金的余款。若乙方未能按时支付所欠余款，则乙方失去该代理权，乙方支付的代理费/定金不予退还，合同自动终止。</p>
            <p class="wag">四、甲方权责 </p>
            <p>1、在乙方代理区域内，甲方不得在乙方未违反本合同的情况下设立与乙方相同类目级别的代理商，保障乙方合法权益。</p>
            <p>2、甲方应向乙方提供项目技术指导、业务咨询培训、电子宣传资料、代理后台管理权限等综合服务支持。</p>
            <p>3、甲方根据市场情况不定期举办项目推广会、培训、宣传等活动，乙方应积极配合。</p>
            <p class="wag">五、乙方权责</p>
            <p>1、乙方在签订本合同前已充分了解并知悉代理业务和代理区域的各项信息及要求，熟悉相关代理业务中自身须提供的各项市场服务内容、具体业务流程和相关资料手续等，并确保能独立享受并承担本合同的权利和责任。</p>
            <p>2、乙方自本合同签订日起60天内不开展业务的（以是否新增“下层代理”、“有效信息”为评判标准），视为乙方不能履行本合同责任且对甲方市场运营造成损失，甲方有权无条件单方面解除合同，乙方已交纳的代理费不予退还。</p>
            <p>3、以乙方代理区域内的行政规划区域为依据，本合同期内乙方（县区级、乡镇级）保证代理区域内新增 40 %以上的下层代理，本合同期内乙方（村社级）保证代理区域最低新增  10 条（含）以上有效信息。</p>
            <p>4、乙方在代理区域开展代理业务时，须完整按照甲方规定的业务流程实施与服务。</p>
            <p>5、乙方在开展业务宣传过程中，应确保各种宣传准确无误，不得擅自夸大宣传和捏造事实，不得做有损甲方利益和市场形象的事。</p>
            <p>6、合作期间，乙方应依法开展业务，若因乙方违约或违法造成商户、客户等的任何损失均由乙方自行承担。若商户、客户等与乙方发生投诉争议或经济纠纷，均由乙方处理并承担责任。</p>
            <p>7、乙方须按甲方要求，对代理区域内所属层级的代理商进行有效管理，杜绝因管理不善给甲方造成损失。</p>
            <p>8、乙方应对其自甲方获取或知悉的任何与甲方或甲方APP或服务有关的可被合理认为具有保密性的信息，包括但不限于：技术信息、客户信息、合作方信息、经营方法、交易网络、销售数据、定价方案等非公开的信息，予以严格保密。非经甲方书面同意，乙方不得以任何目的直接或间接向任何第三方透露或允许任何第三方使用保密信息。此保密责任在本合同终止后 2 年内继续有效。</p>
            <p>9、甲方向乙方提供的所有线上及线下培训资料、宣传资料等，均由甲方享有知识产权，非经甲方书面允许，乙方不得用于任何其他方或向其他第三方以任何方式提供。乙方对相关资料的使用，必须遵守《中华人民共和国著作权法》及相关法律法规的规定。</p>
            <p>10、若乙方有违反上述约定的，或因乙方原因导致合同无法继续履行或提前终止、解除合同的，甲方有权取消乙方的代理商资格且无需向乙方退还代理费，同时甲方有权要求乙方承担相应的违约责任。违约金按乙方代理费的50%计算承担，情节严重并造成严重后果的，按实际损失计算承担（包括但不限于律师费、差旅费、诉讼费用等）。</p>
            <p class="wag">六、不可抗力免责</p>
            <p>由于发生地震、台风、火灾、战争等在订立本合同时不能预见、不能避免的事件，或由于国家政策的调整改变，致使本合同无法履行或遭受重大影响时，需要延期或解除（全部或部分）本合同时，由甲乙双方协商解决。鉴于计算机及互联网的特殊性，若因黑客、病毒、电信部门技术调整等引起的事件，乙方亦认同不属于甲方违约。</p>
            <p class="wag">七、其他约定</p>
            <p>1、任何与本合同有关的需要送达或给予的通知、资料、文件、文书等，必须以书面形式发至收件人在本合同中留有的通讯地址、电话号码，或有关方面为达到本合同的目的而通知对方的其他有效联系地址。乙方在本合同中提供的通讯地址、电话号码等信息，甲方及时登记备案。如有变动，乙方须及时书面通知甲方。 </p>
            <p>2、因本合同履行过程中产生的争议，先由双方友好协商解决，协商不成，任何一方均可有权向甲方所在地人民法院提起诉讼。</p>
            <p>3、未经双方书面同意，甲、乙双方不得将自己的任何权利和义务转让第三方，双方相互之间做出的任何承诺，均应由双方代表签字盖章后方为有效。</p>
            <p>4、本合同一式贰份，甲乙双方各执壹份，经甲乙双方签字盖章后正式生效，均具有同等法律效力（双方可于期满前一个月通知对方是否续约）。 </p>
            <div class="footer">
                <div class="foot_left">
                    <div>
                        <p>甲方：</p>  <img src="../../assets/gongzhang.png" />
                    </div>
                    <p>联系电话：0898-31304158</p>
                    <p>联系地址：海南省海口市秀英区长滨三路鲁能中心16层1601室</p>
                    <p>签约日期：{{agent_create_time}}</p>
                </div>
                <div class="foot_right">
                    <p>乙方：{{real_name}}</p>
                    <p>联系电话：{{phone}}</p>
                    <p>联系地址：{{card_address}}</p>
                    <p>签约日期：{{agent_create_time}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "landContract",
        data() {
            return {
                real_name: this.$route.query.real_name,
                id_card_number: this.$route.query.id_card_number,
                card_address: this.$route.query.card_address,
                phone: this.$route.query.phone,
                typeid: this.$route.query.typeid,
                proxy_region: this.$route.query.proxy_region,
                level: this.$route.query.level,
                agent_create_time: this.$route.query.agent_create_time,
                endtime: this.$route.query.endtime,
                proxy_money: this.$route.query.proxy_money,
                earnest_money:parseFloat(this.$route.query.proxy_money-this.$route.query.proxy_payed).toFixed(2) ,
                pay_method:this.$route.query.pay_method,
                proxy_payed:this.$route.query.proxy_payed,
                radio:this.$route.query.active_type,
                textone:'',
                texttwo:'',
                unit: new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"),

            }
        },
         mounted() {
                this.NumberToChinese(this.proxy_payed);
                this.NumberToChineseTwo(this.earnest_money)
            },
            methods: {
                toDx(n) {   //阿拉伯数字转换函数
                    switch (n) {
                        case "0":
                            return "零";
                        case "1":
                            return "壹";
                        case "2":
                            return "贰";
                        case "3":
                            return "叁";
                        case "4":
                            return "肆";
                        case "5":
                            return "伍";
                        case "6":
                            return "陆";
                        case "7":
                            return "柒";
                        case "8":
                            return "捌";
                        case "9":
                            return "玖";
                    }
                },

                NumberToChinese(m) {
                    m *= 100;
                    m += "";
                    var length = m.length;

                    var result = "";
                    for (var i = 0; i < length; i++) {
                        if (i == 2) {
                            result = "元" + result;
                        } else if (i == 6) {
                            result = "万" + result;
                        }
                        if (m.charAt(length - i - 1) == 0) {
                            if (i != 0 && i != 1) {
                                if (result.charAt(0) != '零' && result.charAt(0) != '元' && result.charAt(0) != '万') {
                                    result = "零" + result;
                                }
                            }
                            continue;
                        }
                        result = this.toDx(m.charAt(length - i - 1)) + this.unit[this.unit.length - i - 1] + result;
                    }
                    result += result.charAt(result.length - 1) == '元' ? "整" : "";
                    this.textone = result;
                },
                NumberToChineseTwo(m) {
                    m *= 100;
                    m += "";
                    var length = m.length;

                    var result = "";
                    for (var i = 0; i < length; i++) {
                        if (i == 2) {
                            result = "元" + result;
                        } else if (i == 6) {
                            result = "万" + result;
                        }
                        if (m.charAt(length - i - 1) == 0) {
                            if (i != 0 && i != 1) {
                                if (result.charAt(0) != '零' && result.charAt(0) != '元' && result.charAt(0) != '万') {
                                    result = "零" + result;
                                }
                            }
                            continue;
                        }
                        result = this.toDx(m.charAt(length - i - 1)) + this.unit[this.unit.length - i - 1] + result;
                    }
                    result += result.charAt(result.length - 1) == '元' ? "整" : "";
                    this.texttwo = result;
                },
            }
    }
</script>

<style scoped>
    /* 查看合同 */
    * {
        padding: 0;
        margin: 0;
    }

    p {
        line-height: 30px;
    }
    .footer{overflow: hidden}
    .foot_left{float: left;width: 30%;}
    .foot_left div{overflow: hidden;}
    .foot_left div p{float: left;}
    .foot_left div img{width: 88px;height: 88px;float: left}
    .block {
        display: inline-block;
        padding: 2px 10px 2px 10px;
        text-align: center;
        border-bottom: 1px solid #000;
    }

    .pa_t {
        text-align: center;
        width: 100%;

    }

    .pa_t p {
        font-size: 1.5rem;
        margin-top: 30px;
    }

    .pt_a {
        margin-bottom: 60px;
    }

    .pt_a p {
        margin-top: 15px;
        margin-left: 15px;
        margin-right: 15px;
        font-size: 1rem;
    }
    .wag{font-weight: 600}
    .gou{font-size: 30px;padding-left: 15px;}
    .gouxuan{font-size: 20px;padding-left: 15px;}
</style>