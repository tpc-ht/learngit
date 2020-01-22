/*全局配置接口*/

const api = {
    //代理商管理
    proxyLogin:'api/common/v1/system/proxyLogin',//登录
    agentLikeList: 'api/common/v1/application/agentLikeList',
    initAgentFeeSet:'api/common/v1/application/initAgentFeeSet',//代理费设置--数据回显
    queryAgentApplicationList:'api/common/v1/application/queryAgentApplicationList',//代理商入驻
    agentApplicationPayMoney:'api/common/v1/application/agentApplicationPayMoney',//缴费进账
    queryAgentApplicationDetail:'api/common/v1/application/queryAgentApplicationDetail',//进账明细
    joinFeeSet:'api/common/v1/application/joinFeeSet',//商家入驻费
    agentFeeSet:'api/common/v1/application/agentFeeSet',//代理费设置
    orderRateSet:'api/common/v1/application/orderRateSet',//交易订单费
    landAgentFeeSet:'api/common/v1/agentuser/landAgentFeeSet',//土地规则-设置值
    initLandAgentFeeSet:'api/common/v1/agentuser/initLandAgentFeeSet',//土地规则-数据回显
    sumLandMoney:'api/common/v1/application/sumLandMoney',//计算土地代理费
    addLandProxtyInfo:'api/common/v1/application/addLandProxtyInfo',//添加土地代理商
    //代理商管理
    agentList: 'api/common/v1/application/agentList',//代理商初始化
    contractOperation: 'api/common/v1/application/contractOperation',//合同操作
    freezeStatus: 'api/common/v1/application/freezeStatus',//冻结
    addProxtyInfo: 'api/common/v1/application/addProxtyInfo',//添加代理商
    getAid2018ByCode: 'api/common/v1/application/code/getAid2018ByCode',//查询镇
    sumMoney: 'api/common/v1/application/sumMoney',//查询代理费用
    //财务管理进账-商家入驻
	merchantsInfo: 'api/common/v1/proxyBusInfo/merchantsInfo',//初始化和查询
	receiptsDetail: 'api/common/v1/proxyBusInfo/receiptsDetail',//查看明细
	//财务管理进账-全部交易
	successOrderInfoOne: 'api/common/v1/proxyBusInfo/successOrderInfoOne',//查看详情
	successOrderInfoList: 'api/common/v1/proxyBusInfo/successOrderInfoList',//初始化和查询
    ymConfirmOfflinePayment:'api/common/v1/wjs/queryMyData/ymConfirmOfflinePayment',//财务确认线下已经打款
	//代理商 商户入驻
	agentFinceAll: 'api/common/v1/agentShopIndex/agentFinceAll',//查询返利
	agentListindex: 'api/common/v1/agentShopIndex/agentListindex',//初始化和查询
    agentUserFeeStatistics:'api/common/v1/agentuser/agentUserFeeStatistics',//代理加盟费--统计
    queryAgentUserInfo:'api/common/v1/agentuser/queryAgentUserInfo',//公共接口--查询代理商信息
    agentUserFee:'api/common/v1/agentuser/agentUserFee',//代理加盟费--列表
    agentOrderFeeStatistics:'api/common/v1/agentuser/agentOrderFeeStatistics',//交易订单费--统计
    agentOrderFee:'api/common/v1/agentuser/agentOrderFee',//交易订单费--列表
    getMoneyRecord:'api/common/v1/agentuser/getMoneyRecord',//平台返利记录
    agentShopFee:'api/common/v1/agentuser/agentShopFee',//商户入驻费--列表
    agentShopFeeStatistics:'api/common/v1/agentuser/agentShopFeeStatistics',//交易订单费--统计
    agentUserLandFeeStatistics:'api/common/v1/agentuser/agentUserLandFeeStatistics',//代理加盟费--土地统计
    agentUserLandFee:'api/common/v1/agentuser/agentUserLandFee',//土地代理加盟费--列表
    yunList:'api/common/v1/gy/util/yunList',
    //财务管理--出账
    getAgentInfo:'api/common/v1/agent/getAgentInfo',//农家餐饮代理费支出
    queryAgentFarmLeaseInfo:'api/common/v1/agent/queryAgentFarmLeaseInfo',//土地租赁代理费支出
    getLowerAgentInfo:'api/common/v1/agent/getLowerAgentInfo1',//农家餐饮代理商的下级信息
    getLowerAgentInfo2:'api/common/v1/agent/getLowerAgentInfo2',//农家餐饮代理商的下下级信息
    queryLowerAgentFarmLeaseInfo1:'api/common/v1/agent/queryLowerAgentFarmLeaseInfo1',//土地租赁代理商的下级信息
    insertProxyPay:'api/common/v1/agent/insertProxyPay',//结款
    getPayDetails:'api/common/v1/agent/getPayDetails',//支出明细
    queryAgentInfoByBusinessPay:'api/common/v1/agent/queryAgentInfoByBusinessPay',//商家入驻费支出详情
    queryAutoBusinnessByAgentId:'api/common/v1/agent/queryAutoBusinnessByAgentId',//自主开发商家费支出
    queryRegionBusinnessByAgentId:'api/common/v1/agent/queryRegionBusinnessByAgentId',//区域代理商家费支出
    queryAgentOderList:'api/common/v1/agentuser/queryAgentOderList',//订单提成支出
    payAgentOderFeeDetail:'api/common/v1/agentuser/payAgentOderFeeDetail',//查看支出明细
    queryAgentOderDetailList:'api/common/v1/agentuser/queryAgentOderDetailList',//订单提成支出代理商代理区域的订单列表
    payAgentOderFee:'api/common/v1/agentuser/payAgentOderFee',//订单提成支出马上结款
    promotionFeeDeduction:'api/common/v1/ymShop/platformPaymentRecord1',//推广商家提成
    confirmationPayment:'api/common/v1/ymShop/confirmationPayment1',//确认打款
    updateBatchRoyalty:'api/common/v1/ymShop/updateBatchRoyalty',//批量确认打款
    buySuperiorPaymentList:'api/common/v1/ymMarket/buySuperiorPaymentList',//订单购买者上级提成--列表
    buySuperiorPayment:'api/common/v1/ymMarket/buySuperiorPayment',//订单购买者上级提成--财务结款
//    修改密码
    changePwd:'api/common/v1/system/changePwd',
    pwd:'api/common/v1/sms/pwd',
    setPassword:'api/common/v1/system/setPassword',
//交易释放
    queryReleaseInfo:'api/common/v1/release/queryReleaseInfo',//交易释放
    exportList:'api/common/v1/release/export',//交易释放导出
    webReleaseOperation:'api/common/v1/release/webReleaseOperation',//释放
//
    IncomeFromPlatformList:'api/common/v1/gy/util/list',//平台出账列表
    ruleList:'api/common/v1/gy/util/rule',//查询用户收益结算
    updateData:'api/common/v1/gy/util/update',//设置结款
//文交记录查询
    buyAndSellRecord:'api/common/v1/exTradeRecord/buyAndSellRecord',//买入卖出交易记录
    releaseRecord:'api/common/v1/exTradeRecord/releaseRecord',//交易已释放记录
    queryRelation:'api/common/v1/culturalExchange/back/queryRelation',//查询上下级关系信息
    queryLowerLevel:'api/common/v1/culturalExchange/back/queryLowerLevel',//根据用户ID查询所有下级信息
    queryUserId:'api/common/v1/culturalExchange/back/queryUserId',//模糊查询用户ID
    updateSuperUser:'api/common/v1/culturalExchange/back/updateSuperUser',//修改上级
    purchaseTransferRecord:'api/common/v1/culturalExchange/back/purchaseTransferRecord',//求购转让记录
    fundFlowRecord:'api/common/v1/exTradeRecord/fundFlowRecord',//出入金记录
    memberBillListRecord:'api/common/v1/exTradeRecord/memberBillListRecord',//提货记录
    purchaseTransferRecordAll:'api/common/v1/culturalExchange/back/purchaseTransferRecordAll',//求购转让记录导出
    confirmWjsOrder:'api/common/v1/order/confirmWjsOrder',//求购转让记录线下确认订单
    queryRelationAll:'api/common/v1/culturalExchange/back/queryRelationAll',//上下级关系信息（导出Excel）
    queryLowerLevelAll:'api/common/v1/culturalExchange/back/queryLowerLevelAll',//根据用户ID查询所有下级信息(Excel导出)
    buyAndSellRecordExport:'api/common/v1/exTradeRecord/buyAndSellRecordExport',//买入卖出交易记录导出EXCL
    releaseRecordExport:'api/common/v1/exTradeRecord/releaseRecordExport',//交易已释放记录导出EXCL
    fundFlowRecordExport:'api/common/v1/exTradeRecord/fundFlowRecordExport',//出入金记录导出EXCL
    memberBillListRecordExport:'api/common/v1/exTradeRecord/memberBillListRecordExport',//提货记录导出EXCL
    updateWjsOrder:'api/common/v1/wjs/queryMyData/updateWjsOrder',//修改订单
    addWjsGive:'api/common/v1/wjs/queryMyData/addWjsGive',
    confirmPaySlb:'api/common/v1/wjs/queryMyData/confirmPaySlb',
    queryUserWine:'api/common/v1/wjs/queryMyData/queryUserWine',//查询用户赠送酒来源及去向
    ymExchangeLog:'api/common/v1/ymdjj/ymExchangeLog',//兑酒卷兑换记录
//实名制用户
    queryUserReal:'api/common/v1/wjs/queryMyData/queryRealUser',//实名制用户查询
    addUserReal:'api/common/v1/wjs/queryMyData/addRealUser',//实名制用户添加
    checkRealUser:'api/common/v1/wjs/queryMyData/checkRealUser',//实名制用户审核

//酒来源,去向明细
    queryOneUserWine:'api/common/v1/wjs/queryMyData/queryOneUserWine',//酒来源明细
    queryOneUserWineFlow:'api/common/v1/wjs/queryMyData/queryOneUserWineFlow',//某次赠送酒去向明细
    queryOneUserWineAllFlow:'api/common/v1/wjs/queryMyData/queryOneUserWineAllFlow',//所有酒去向明细

//团队长
    addHeadman:'api/common/v1/wjs/queryMyData/addHeadman',//添加团队长
    delHeadman:'api/common/v1/wjs/queryMyData/delHeadman',//删除团队长
    queryHeadman:'api/common/v1/wjs/queryMyData/queryHeadman',//查询团队长
    queryHeadmanMoreInfo:'api/common/v1/wjs/queryMyData/queryHeadmanMoreInfo',//团队长更多信息
    //给团队长开放库存
    addHeadmanStock:'api/common/v1/wjs/queryMyData/addHeadmanStock',//给团队长开放库存
    initAddHeadmanStock:'api/common/v1/wjs/queryMyData/initAddHeadmanStock',//给团队长开放库存--数据回显
    //团队长买酒限制
    queryWjsBuyLimit:'api/common/v1/wjs/queryMyData/queryWjsBuyLimit',//查询团队长（普通会员）每日买酒金额上限
    updateWjsBuyLimit:'api/common/v1/wjs/queryMyData/updateWjsBuyLimit',//修改团队长（普通会员）每日买酒金额上限
//    文交规则
    queryRuleInfo:'api/common/v1/exchangeRule/queryRuleInfo',//查询SLB/积分兑换信息
    updateRuleInfo:'api/common/v1/exchangeRule/updateRuleInfo',//修改SLB/积分兑换信息
    queryMaxReleaseNum:'api/common/v1/exchangeRule/queryMaxReleaseNum',//查询文交所每日最大释放量
    updateMaxReleaseNum:'api/common/v1/exchangeRule/updateMaxReleaseNum',//修改文交所每日最大释放量
    queryWjsDetailsRoyalty:'api/common/v1/culturalExchange/transaction/queryWjsDetailsRoyalty',//文交提成明细
    queryWjsDetailsSummary:'api/common/v1/culturalExchange/transaction/queryWjsDetailsSummary',//文交提成汇总
    hidWjsDownMoney:'api/common/v1/culturalExchange/transaction/hidWjsDownMoney',//
    inportProfitDetail:'api/common/v1/release/inportProfitDetail',
    selectProfitDetail:'api/common/v1/release/selectProfitDetail',
    shopPaymentList:'api/common/v1/royalty/shopPaymentList',
    shopPayment:'api/common/v1/royalty/shopPayment',
    queryHpcDetailsSummary:'api/common/v1/trade/queryHpcDetailsSummary',
    hidhpcDownMoney:'api/common/v1/trade/hidhpcDownMoney',
    hitMoneylog:'api/common/v1/trade/hitMoneylog',
    financeExchangeList:'api/common/v1/trade/financeExchangeList',
	//和平村
	// pvCommission:'api/common/v1/trade/queryHpcDetailsSummary',
	hidWjsDownMoneyRecord:'api/common/v1/culturalExchange/transaction/hidWjsDownMoneyRecord',
	pvCommission:'api/common/v1/trade/queryWjsDetailsRoyalty',
	buySuperiorPaymentAll:'api/common/v1/ymMarket/buySuperiorPaymentAll',
	
	//结款管理
	paymentUserList:'api/common/v1/SalesOperations/paymentUserList',
	paymentOrderList:'api/common/v1/SalesOperations/paymentOrderList',//明细
	agentRoyaltyPayment:'api/common/v1/SalesOperations/agentRoyaltyPayment',//代理提成财务批量结款
	agentRoyaltyPaymentAll:'api/common/v1/SalesOperations/agentRoyaltyPaymentAll',//代理提成财务全部结款
	//结款记录
	agentUserList:'api/common/v1/SalesOperations/agentUserList',//提成用户列表
	agentOrderList:'api/common/v1/SalesOperations/agentOrderList',//提成用户订单明细。
	
	//查询d代理进度
	queryAgentCondition:'api/common/v1/SalesOperations/queryAgentCondition',//代理进度
	queryBuyRoyaltyCondition:'api/common/v1/SalesOperations/queryBuyRoyaltyCondition', //消费分润条件进度

	//活动
	getRewardList: 'api/common/v1/CoverageReward/getRewardList',//中奖列表
	getRewardTimeRange: 'api/common/v1/CoverageReward/getRewardTimeRange',//中奖列表
	genRewardRecords: 'api/common/v1/CoverageReward/genRewardRecords',//生成中奖记录
};

export default api;
