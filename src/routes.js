

import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import merchantSettlement from './views/nav1/merchantSettlement.vue'
import salesPromotion from './views/nav1/salesPromotion.vue'
import mixWine from './views/nav1/mixWine.vue'
import salesPromotionOne from './views/nav1/salesPromotionOne.vue'
//和平村记录查询
import pvCommission from './views/nav1/pvCommission'
//代理费支出
import AgencyExpenses from './views/nav1/AgencyExpenses/index.vue'
import Form from './views/nav1/AgencyExpenses/Form.vue'
import landLease from './views/nav1/AgencyExpenses/landLease.vue'
import viewOrders from './views/nav1/viewOrders.vue'
import navfind from './views/navserach/navfind.vue'
import formSearch from './views/navserach/formSearch.vue'
import landDetails from './views/navserach/landDetails.vue'
import user from './views/nav1/user.vue'
import consumptionProfitSharing from './views/nav1/consumptionProfitSharing.vue'
import UserIncomeSettlement from './views/nav1/UserIncomeSettlement.vue'
import promotionCommission from './views/nav1/promotionCommission.vue'
import associatedOrder from './views/nav1/associatedOrder.vue'
import Tableag from './views/agentanage/Table.vue'
import Formag from './views/agentanage/Form.vue'
import userag from './views/agentanage/user.vue'
import financialag from './views/agentanage/financial.vue'
import landAgencyFee from './views/agentanage/landAgencyFee.vue'
import merchantsSettle from './views/houston/merchantsSettle/index.vue'
import AgentsEnter from './views/houston/AgentsEnter/index.vue'
import landIndex from './views/houston/AgentsEnter/landIndex.vue'
import IncomeFromPlat from './views/houston/IncomeFromPlat.vue'
import uniformTradeOrder from './views/houston/uniformTradeOrder.vue'
import Agent from './views/nested/Agent/index.vue'
import AgentOne from './views/nested/menu1/AgentOne/index.vue'
import Settled from './views/nested/menu1/Settled/index.vue'
import AgencySettlement from './views/nested/menu1/AgencySettlement/index.vue'
import menu1 from './views/nested/menu1/index.vue'
import landAgency from './views/nested/menu1/landAgency.vue'
import ruleCommunication from './views/nested/ruleCommunication.vue'
import details from './views/details/index.vue'
import delisted from './views/delisted/index.vue'
import contract from './views/contract/index.vue'
import provinceContract from './views/contract/provinceContract.vue'
import cityContract from './views/contract/cityContract.vue'
import landContract from './views/contract/landContract.vue'
import merchantSb from './views/merchant/index.vue'
import transaction from './views/houston/transaction/index.vue'
import tanfind from './views/tanav/navfind.vue'
import tanSearch from './views/tanav/formSearch.vue'
import userfind from './views/usernav/navfind.vue'
import userSearch from './views/usernav/formSearch.vue'
import navagented from './views/navagented/index.vue'
import tasednav from './views/tasednav/index.vue'
import password from './views/password.vue'
//区域土地管理
import regionalLand from './views/regionalLand/regionalLand.vue'//用户委托求购
import markingDetails from './views/regionalLand/markingDetails.vue'//用户委托求购标记
import externalLand from './views/regionalLand/externalLand.vue'//外部土地资源池
import externalLandInformation from './views/regionalLand/externalLandInformation.vue'//外部土地资源池信息
import resourceManagement from './views/regionalLand/resourceManagement.vue'//土地资源管理
import addLandResources from './views/regionalLand/addLandResources.vue'//添加土地资源
import detailsLandResources from './views/regionalLand/detailsLandResources.vue'//土地资源详情
import takeLook from './views/regionalLand/takeLook.vue'//预约带看订单
//文交商品
import newArticles from './views/culturalGoods/newArticles.vue'
import addArticleGoods from './views/culturalGoods/addArticleGoods.vue'
import barterGoods from './views/culturalGoods/barterGoods.vue'
import order from './views/culturalGoods/order.vue'
import basicInformation from './views/culturalGoods/basicInformation.vue'
import transactionRelease from './views/culturalGoods/transactionRelease.vue'
//文交记录查询
import superior from './views/textSubmission/superior'//上下级记录
import headman from './views/textSubmission/headman.vue'//团队长信息
import realUser from './views/textSubmission/realUser.vue'//用户实名制
import subordinate from './views/textSubmission/subordinate'//下级信息
import buyingRecords from './views/textSubmission/buyingRecords'//求购记录
import purchaseDetails from './views/textSubmission/purchaseDetails'//交易释放
import transactionReleaseRecord from './views/textSubmission/transactionReleaseRecord'//交易释放记录
import gold from './views/textSubmission/gold'//出金
import pickingDetails from './views/textSubmission/pickingDetails'//提货
import documentSubmissionDetails from './views/textSubmission/documentSubmissionDetails'//提货
import liquorBlendingRecord from './views/textSubmission/liquorBlendingRecord'//兑酒记录
import payCommission from './views/textSubmission/payCommission'
import royaltySummary from './views/textSubmission/royaltySummary'//文交提成汇总
import royaltySummaryRecord from './views/textSubmission/royaltySummaryRecord'//文交提成汇总结款记录
import divideProfits from './views/textSubmission/divideProfits'

//文交规则
import paymentDeduction from './views/nested/paymentDeduction.vue'
import releaseQuantity from './views/nested/releaseQuantity.vue'
import tableImport from './views/tableImport.vue'

//财务结款
import financeEndMoney from './views/navMoney/financeEndMoney'
import orderDetail from './views/navMoney/orderDetail'
import RecordEndMoney from './views/navMoney/RecordEndMoney'
import RecordOrderDetail from './views/navMoney/RecordOrderDetail'

//查询进度
import selectProgress from './views/selectProgress/index'

//对外查询页面( 客服 财务 )
import foreignConsumptionProfitSharing from './views/foreignQueryPages/consumptionProfitSharing';
import foreignPromotionCommission from '@/views/foreignQueryPages/promotionCommission';
import foreignRoyaltySummary from '@/views/foreignQueryPages/royaltySummary';
import foreignSuperior from '@/views/foreignQueryPages/superior';
import foreignTableImport from './views/foreignQueryPages/tableImport.vue';
import foreignSalesPromotion from './views/foreignQueryPages/salesPromotion.vue';
import foreignPvCommission from './views/foreignQueryPages/pvCommission.vue';

//活动
//红包
import redPacketList from './views/activity/redPacketList.vue';
export const routes = [
	{	
		path: '/login',
		component: Login,
		name: '',
		hidden: true
	},
	{
		path: '/404',
		component: NotFound,
		name: '',
		hidden: true
	},
	{
		path: "/",
		component: Home,
		name: "区域代理",
		iconCls: 'fa fa-list-alt',
		children: [{
			path: "/1/1",
			name: "缴费规则",
			component: menu1,
			children: [
				{path: '/AgentOne', component: AgentOne, name: '代理费设置',meta:{a:1}},
				{path: '/Settled', component: Settled, name: '商户入驻费',},
				{path: '/AgencySettlement', component: AgencySettlement, name: '交易订单费',},
				{path: '/landAgency', component: landAgency, name: '土地代理规则',},
			]
		},
			{path: '/Agent', component: Agent, name: "代理商管理",},
		]
	},
	{
		path: '/',
		component: Home,
		name: '代理商入驻',
		hidden: true,
		children: [{path: '/details', component: details, name: '进账明细'}],
	},
    {
        path: '/',
        component: Home,
        name: '修改密码',
        hidden: true,
        children: [{path: '/password', component: password, name: '修改密码'}],
    },
	{
		path: '/',
		component: Home,
		name: '代理商管理',
		hidden: true,
		children: [{path: '/contract', component: contract, name: '合同打印'}],
	},
	{
		path: '/',
		component: Home,
		name: '代理商管理',
		hidden: true,
		children: [{path: '/provinceContract', component: provinceContract, name: '省级合同'}],
	},
	{
		path: '/',
		component: Home,
		name: '代理商管理',
		hidden: true,
		children: [{path: '/cityContract', component: cityContract, name: '区县级合同'}],
	},
	{
		path: '/',
		component: Home,
		name: '代理商管理',
		hidden: true,
		children: [{path: '/landContract', component: landContract, name: '土地租赁合同'}],
	},
	{
		path: '/',
		component: Home,
		name: '商家入驻',
		hidden: true,
		children: [{path: '/merchantSb', component: merchantSb, name: '进账明细'}],
	},
	{
		path: '/',
		component: Home,
		name: '代理费支出',
		hidden: true,
		children: [{path: '/navfind', component: navfind, name: '出账明细'},],
	},
	{
		path: '/',
		component: Home,
		name: '代理商入驻费支出',
		hidden: true,
		children: [{path: '/formSearch', component: formSearch, name: '农家餐饮详情'},
			{path: '/landDetails', component: landDetails, name: '土地租赁详情'},],
	},
	{
		path: '/',
		component: Home,
		name: '全部订单交易',
		hidden: true,
		children: [{path: '/tasednav', component: tasednav, name: '查看详情'}],
	},
	{
		path: '/',
		component: Home,
		name: '商家入驻费支出',
		hidden: true,
		children: [{path: '/tanfind', component: tanfind, name: '支出明细'}],
	},
	{
		path: '/',
		component: Home,
		name: '商家入驻费支出',
		hidden: true,
		children: [{path: '/tanSearch', component: tanSearch, name: '查看详情'}],
	},
	{
		path: '/',
		component: Home,
		name: '订单提成支出',
		hidden: true,
		children: [{path: '/userfind', component: userfind, name: '支出明细'}],
	},
	{
		path: '/',
		component: Home,
		name: '订单提成支出',
		hidden: true,
		children: [{path: '/userSearch', component: userSearch, name: '查看详情'}],
	},
	{
		path: '/',
		component: Home,
		name: '财务统计--代理加盟费',
		hidden: true,
		children: [{path: '/navagented', component: navagented, name: '查看详情'}],
	},
	{
		path: '/',
		component: Home,
		name: '财务管理--进账',
		iconCls: 'fa fa-book fa-fw',
		children: [
			{path: '/AgentsEnter', component: AgentsEnter, name: '代理商入驻'},
			{path: '/merchantsSettle', component: merchantsSettle, name: '商家入驻'},
			{path: '/transaction', component: transaction, name: '全部订单交易'},
			{path: '/landIndex', component: landIndex, name: '农庄租赁代理商入驻'},
			{path: '/IncomeFromPlat', component: IncomeFromPlat, name: '文交收益进账'},
			{path: '/uniformTradeOrder', component: uniformTradeOrder, name: '匀贸商城商家订单'},
		],
	},
	{
		path: "/",
		component: Home,
		name: "财务管理--出账",
		iconCls: 'fa fa-list-alt',
		children: [
		 {path: '/Form', component: Form, name: '农家餐饮代理费支出'},
		 {path: '/landLease', component: landLease, name: '土地租赁代理费支出'},
	     {path: '/Table', component: Table, name: '商家入驻费支出'},
		 {path: '/user', component: user, name: '订单提成支出'},
		 {path: '/UserIncomeSettlement', component: UserIncomeSettlement, name: '文交收益结款'},
		 {path: '/viewOrders', component: viewOrders, name: '查看订单'},
		 {path: '/promotionCommission', component: promotionCommission, name: '推广商家提成'},
		 {path: '/associatedOrder', component: associatedOrder, name: '推广详情'},
		 {path: '/consumptionProfitSharing', component: consumptionProfitSharing, name: '匀贸消费分润'},
		 {path: '/tableImport', component: tableImport, name: '三七分润'},
		 {path: '/merchantSettlement', component: merchantSettlement, name: '商户结算'},
		 {path: '/salesPromotion', component: salesPromotion, name: '寄存销售分润'},
		 {path: '/pvCommission', component: pvCommission, name: '和平村提成明细'},
		 {path: '/mixWine', component: mixWine, name: '匀贸兑酒记录'},
		 {path: '/salesPromotionOne', component: salesPromotionOne, name: '寄存销售推广打款记录'},
		]
	},
	{
		path: '/',
		component: Home,
		name: '代理申请',
		hidden: true,
		children: [{path: '/delisted', component: delisted, name: '代理商申请'}]
	},
	{
		path: '/',
		component: Home,
		name: '代理商',
		iconCls: 'fa fa-address-card',
		children: [
			{path: '/Formag', component: Formag, name: '农家餐饮代理加盟费'},
			{path: '/Tableag', component: Tableag, name: '财务统计--商户入驻费'},
			{path: '/userag', component: userag, name: '财务统计--交易订单费'},
			{path: '/financialag', component: financialag, name: '平台返利记录'},
			{path: '/landAgencyFee', component: landAgencyFee, name: '农庄租赁代理加盟费'},
		],
	},
	{
		path: '/',
		component: Home,
		name: '区域土地管理',
		iconCls: 'fa fa-address-card',
		children: [
			{path: '/regionalLand', component: regionalLand, name: '用户委托求购'},
			{path: '/markingDetails', component: markingDetails, name: '用户委托求购详情'},
			{path: '/externalLand', component: externalLand, name: '外部土地资源池'},
			{path: '/externalLandInformation', component: externalLandInformation, name: '外部土地资源池详情'},
			{path: '/resourceManagement', component: resourceManagement, name: '土地资源管理'},
			{path: '/addLandResources', component: addLandResources, name: '添加土地资源'},
			{path: '/detailsLandResources', component: detailsLandResources, name: '土地资源详情'},
			{path: '/takeLook', component: takeLook, name: '预约带看订单'},
		],
	},
	{
		path: '/',
		component: Home,
		name: '文交商品',
		iconCls: 'fa fa-jpy',
		children: [
			{path: '/newArticles', component: newArticles, name: '新增文交商品'},
			{path: '/addArticleGoods', component: addArticleGoods, name: '添加文交商品'},
			{path: '/barterGoods', component: barterGoods, name: '添加易货商品'},
			{path: '/order', component: order, name: '订单'},
			{path: '/basicInformation', component: basicInformation, name: '基本信息'},
			{path: '/transactionRelease', component: transactionRelease, name: '交易释放'},

		],
	},
	{
		path: '/',
		component: Home,
		name: '文交记录查询',
		iconCls: 'fa fa-edit',
		children: [
			{path: '/superior', component: superior, name: '上下级记录'},
			{path: '/headman', component: headman, name: '团队长信息'},
			{path: '/realUser', component: realUser, name: '实名制用户'},
			{path: '/documentSubmissionDetails', component: documentSubmissionDetails, name: '文交商城赠送酒交易明细'},
			{path: '/buyingRecords', component: buyingRecords, name: '求购转让记录'},
			{path: '/subordinate', component: subordinate, name:'下级信息'},
			{path: '/purchaseDetails', component: purchaseDetails, name: '买入卖出记录'},
			{path: '/transactionReleaseRecord', component: transactionReleaseRecord, name: '交易释放记录'},
			{path: '/gold', component: gold, name: '出金'},
			{path: '/pickingDetails', component: pickingDetails, name: '提货'},
			{path: '/liquorBlendingRecord', component: liquorBlendingRecord, name: '匀贸兑酒记录'},
			{path: '/payCommission', component:payCommission, name: '文交提成明细'},
			{path: '/royaltySummary', component: royaltySummary, name: '文交提成汇总'},
			{path: '/royaltySummaryRecord', component: royaltySummaryRecord, name: '文交提成汇总结款记录'},
			{path: '/divideProfits', component: divideProfits, name: '文交分润记录'},
		],
	},
	{
		path: '/',
		component: Home,
		name: '文交记录查询',
		iconCls: 'fa fa-edit',
		children: [
			{path: '/ruleCommunication', component: ruleCommunication, name: "文交规则"},
			{path: '/paymentDeduction', component: paymentDeduction, name: '支付抵扣设置'},
			{path: '/releaseQuantity', component: releaseQuantity, name: '每日最大释放量'},

		],
	},
	{
		path: '/',
		component: Home,
		name: '结款管理',
		iconCls: 'fa fa-edit',
		children: [
			{path: '/financeEndMoney', component: financeEndMoney, name: "财务结款",children:[
				
			]},
			{path: '/financeEndMoney/orderDetail', component: orderDetail, name: "财务结款明细"},
			{path: '/RecordEndMoney', component: RecordEndMoney, name: "结款记录",children:[
				
			]},
			{path: '/RecordOrderDetail', component: RecordOrderDetail, name: "结款记录明细"},

		],
	},
	{
		path: "/",
		component: Home,
		name: "数据查询",
		iconCls: 'fa fa-list-alt',
		children: [
		 {path: '/foreignConsumptionProfitSharing', component: foreignConsumptionProfitSharing, name:"匀贸消费分润"},
		 {path: '/foreignPromotionCommission', component: foreignPromotionCommission, name: '推广商家提成'},
		 {path: '/foreignRoyaltySummary', component: foreignRoyaltySummary, name: '文交寄存销售分润'},
		 {path: '/foreignSuperior', component: foreignSuperior, name: '上下级记录'},
		 {path: '/foreignTableImport', component: foreignTableImport, name: '三七分润'}, 
		 {path: '/foreignSalesPromotion', component: foreignSalesPromotion, name: '和平村寄存销售分润'}, 
		 {path: '/foreignPvCommission', component: foreignPvCommission, name: '和平村提成明细'}, 
		]
	},
	//进度查询
	{
		path: "/",
		component: Home,
		name: "进度查询",
		iconCls: 'fa fa-list-alt',
		children: [
		 {path: '/selectProgress', component: selectProgress, name:"查询 代理/消费分润 进度"},
		]
	},
	//活动
	{
		path: "/",
		component: Home,
		name: "活动",
		iconCls: 'fa fa-list-alt',
		children: [
		 {path: '/redPacketList', component: redPacketList, name:"中奖列表"},
		]
	},
	
	{
		path: '*',
		hidden: true,
		redirect: {
			path: '/404'
		}
	}
]

 export default routes;
