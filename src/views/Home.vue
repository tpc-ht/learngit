<template>
	<div>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				 <img src="../assets/logo.png"/>
				{{collapsed?'':sysName}}
			</el-col>
			<!--<el-col :span="10">-->
				<!--<div class="tools" @click.prevent="collapse">-->
					<!--<i class="fa fa-align-justify"></i>-->
				<!--</div>-->
			<!--</el-col>-->
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<img :src="sysUserAvatar? sysUserAvatar:require('../assets/bjpng.png')" />
						{{sysUserName}} &nbsp;&nbsp;欢迎您
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="handleCloseOne()">修改密码</el-dropdown-item>
						<!--<el-dropdown-item>设置</el-dropdown-item>-->
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<!--<aside :class="collapsed?'menu-collapsed':'menu-expanded'">-->
				<!--&lt;!&ndash;导航菜单&ndash;&gt;-->
				<!--&lt;!&ndash;<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"&ndash;&gt;-->
					 <!--&lt;!&ndash;unique-opened router v-show="!collapsed">&ndash;&gt;-->
					<!--&lt;!&ndash;<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">&ndash;&gt;-->
						<!--&lt;!&ndash;<el-submenu :index="index+''" v-if="!item.leaf">&ndash;&gt;-->
							<!--&lt;!&ndash;<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>&ndash;&gt;-->
							<!--&lt;!&ndash;<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>&ndash;&gt;-->
						<!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
						<!--&lt;!&ndash;<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>&ndash;&gt;-->
					<!--&lt;!&ndash;</template>&ndash;&gt;-->
				<!--&lt;!&ndash;</el-menu>&ndash;&gt;-->

				<!--<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"-->
						 <!--unique-opened router v-show="!collapsed">-->
					<!--<el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" v-if="!item.hidden" :key="index">-->
						<!--<template slot="title">-->
							<!--<i class="el-icon-location" ></i>-->
							<!--<span slot="title">{{item.name}}</span>-->
						<!--</template>-->
						<!--&lt;!&ndash; 二级菜单 &ndash;&gt;-->
						<!--<template v-for="child in item.children">-->
							<!--<el-submenu v-if="child.children && child.children.length" :index="child.path" :key="child.path">-->
								<!--<template slot="title"><i :class="child.icon"></i><span>{{child.name}}</span></template>-->

								<!--&lt;!&ndash; 三级菜单 &ndash;&gt;-->
								<!--<el-menu-item v-for="itemChild_Child in child.children" :index="itemChild_Child.path" :key="itemChild_Child.path">-->
									<!--<i :class="itemChild_Child.icon"></i><span slot="title">{{itemChild_Child.name}}</span></el-menu-item>-->
							<!--</el-submenu>-->

							<!--<el-menu-item v-else :index="child.path" :key="child.path"><i :class="child.icon"></i><span slot="title">{{child.name}}</span></el-menu-item>-->
						<!--</template>-->
					<!--</el-submenu>-->
				<!--</el-menu>-->


			<!--</aside>-->

				<aside :class="collapsed?'menu-collapsed':'menu-expanded'" v-if="!nav4">
						<el-col :span="24">
							<el-menu :default-active="'1'" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
									 @select="handleSelect" unique-opened v-show="!collapsed">
								<el-submenu index="1" v-show="nav1">
									<template slot="title">
										<i class="fa fa-list-alt"></i>
										<span>区域代理</span>
									</template>
									<el-submenu index="1-1">
										<template slot="title">缴费规则</template>
										<el-menu-item index="1-1-1" @click="link1()">餐饮代理费</el-menu-item>
										<el-menu-item index="1-1-2" @click="link2()">商户入驻费</el-menu-item>
										<el-menu-item index="1-1-3" @click="link3()">餐饮交易订单</el-menu-item>
										<el-menu-item index="1-1-4" @click="link15()">土地代理规则</el-menu-item>
									</el-submenu>
									<el-menu-item index="1-2" @click="link4()">代理商管理</el-menu-item>
								</el-submenu>
								<el-submenu index="2" v-show="nav2">
									<template slot="title">
										<i class="fa fa-book fa-fw"></i>
										<span> 财务管理--进账</span>
									</template>
									<el-submenu index="2-1">
										<template slot="title">农家餐饮</template>
										<el-menu-item index="2-1-1" @click="link5()">代理商入驻</el-menu-item>
										<el-menu-item index="2-1-2" @click="link6()">商家入驻</el-menu-item>
										<el-menu-item index="2-1-3" @click="link7()">全部订单交易</el-menu-item>
									</el-submenu>
									<el-submenu index="2-2">
										<template slot="title">土地租赁</template>
										<el-menu-item index="2-2-1" @click="link17()">代理商入驻</el-menu-item>
									</el-submenu>
									<el-menu-item index="2-3" @click="link26()">文交收益进账</el-menu-item>
									<el-menu-item index="2-4" @click="link31()">匀贸商城商家订单</el-menu-item>
								</el-submenu>
								<el-submenu index="3" v-show="nav2">
									<template slot="title">
										<i class="fa fa-list-alt"></i>
										<span>财务管理--出账</span>
									</template>
									<el-submenu index="3-1">
										<template slot="title">农家餐饮</template>
										<el-menu-item index="3-1-1" @click="link8()">代理费支出</el-menu-item>
										<el-menu-item index="3-1-2" @click="link9()">商家入驻费支出</el-menu-item>
										<el-menu-item index="3-1-3" @click="link10()">订单提成支出</el-menu-item>
									</el-submenu>
									<el-submenu index="3-2">
										<template slot="title">农庄租赁</template>
										<el-menu-item index="3-2-1" @click="link16()">代理费支出</el-menu-item>
									</el-submenu>
									<el-menu-item index="3-3" @click="link27()">文交收益结款</el-menu-item>
									<el-menu-item index="3-4" @click="link32()">推广商家提成</el-menu-item>
									<el-menu-item index="3-5" @click="link33()">匀贸消费分润</el-menu-item>
									<el-menu-item index="3-6" @click="link35()">三七分润</el-menu-item>
									<!--<el-menu-item index="3-6" @click="link34()">文交分润记录</el-menu-item>-->
                                    <el-menu-item index="3-7" @click="link36()">商户结算</el-menu-item>
								</el-submenu>
								<el-submenu index="4" v-show="nav3">
									<template slot="title">
										<i class="fa fa-address-card"></i>
										<span>代理商</span>
									</template>
									<el-submenu index="4-1">
										<template slot="title">农家餐饮</template>
										<el-menu-item index="4-1-1" @click="link11()">财务统计--代理加盟费</el-menu-item>
									</el-submenu>
									<el-submenu index="4-2">
										<template slot="title">农庄租赁</template>
										<el-menu-item index="4-2-1" @click="link18()">财务统计--代理加盟费</el-menu-item>
									</el-submenu>
									<el-menu-item index="4-2" @click="link12()">财务统计--商户入驻费</el-menu-item>
									<el-menu-item index="4-3" @click="link13()">财务统计--交易订单费</el-menu-item>
									<el-menu-item index="4-4" @click="link14()">平台返利记录</el-menu-item>
								</el-submenu>
								<!--<el-submenu index="5" v-show="nav3">-->
									<!--<template slot="title">-->
										<!--<i class="fa fa-address-card"></i>-->
										<!--<span>区域土地管理</span>-->
									<!--</template>-->
									<!--<el-menu-item index="5-1" @click="link19()">用户委托求购</el-menu-item>-->
									<!--<el-menu-item index="5-2" @click="link23()">外部土地资源池</el-menu-item>-->
									<!--<el-menu-item index="5-3" @click="link24()">土地资源管理</el-menu-item>-->
									<!--<el-menu-item index="5-4" @click="link25()">预约带看订单</el-menu-item>-->
								<!--</el-submenu>-->
                                <el-submenu index="6" v-show="nav2">
                                    <template slot="title">
                                        <i class="fa fa-jpy"></i>
                                        <span>文交商品管理</span>
                                    </template>
                                    <!--<el-menu-item index="6-1" @click="link20()">新增文交商品</el-menu-item>-->
									<!--<el-menu-item index="6-2" @click="link21()">订单</el-menu-item>-->
									<el-menu-item index="6-3" @click="link22()">交易释放</el-menu-item>
                                </el-submenu>
								<el-submenu index="7" v-show="nav1">
									<template slot="title">
										<i class="fa fa-edit"></i>
										<span>文交记录查询</span>
									</template>
									<el-submenu index="7-1">
										<template slot="title">内盘查询</template>
										<el-menu-item index="7-1-0" @click="tolink0()">团队长信息</el-menu-item>
										<el-menu-item index="7-1-1" @click="tolink1()">上下级记录</el-menu-item>
										<el-menu-item index="7-1-2" @click="tolink2()">求购转让记录</el-menu-item>
										<el-menu-item index="7-1-3" @click="tolink3()">实名制用户</el-menu-item>
										<el-menu-item index="7-1-4" @click="tolink4()">文交商城赠送酒交易明细</el-menu-item>
										<el-menu-item index="7-1-5" @click="tolink9()">匀贸兑酒记录</el-menu-item>
									</el-submenu>
									<el-submenu index="7-2">
										<template slot="title">外盘查询</template>
										<el-menu-item index="7-2-1" @click="tolink5()">买入卖出记录</el-menu-item>
										<el-menu-item index="7-2-2" @click="tolink6()">交易释放记录</el-menu-item>
										<el-menu-item index="7-2-3" @click="tolink7()">出金</el-menu-item>
										<el-menu-item index="7-2-4" @click="tolink8()">提货</el-menu-item>
										<el-menu-item index="7-2-5" @click="tolink80()">文交提成明细</el-menu-item>
										<el-menu-item index="7-2-6" @click="tolink81()">文交提成汇总</el-menu-item>
										<el-menu-item index="7-2-7" @click="tolink82()">文交提成汇总结款记录</el-menu-item>
									</el-submenu>
								</el-submenu>
								<el-submenu index="8" v-show="nav1">
									<template slot="title">
										<i class="fa fa-address-card"></i>
										<span>文交规则</span>
									</template>
									<el-menu-item index="8-1" @click="link28()">文交规则设置</el-menu-item>
									<el-menu-item index="8-2" @click="link29()">支付抵扣设置</el-menu-item>
                                    <el-menu-item index="8-3" @click="link30()">每日最大释放量</el-menu-item>
								</el-submenu>
								<el-submenu index="9" v-show="nav2">
									<template slot="title">
										<i class="fa fa-address-card"></i>
										<span>和平村记录查询</span>
									</template>
									<el-menu-item index="9-1" @click="link37()">寄存销售分润</el-menu-item>
									<el-menu-item index="9-2" @click="link38()">匀贸兑酒记录</el-menu-item>
									<el-menu-item index="9-3" @click="link39()">寄存销售推广打款记录</el-menu-item>
									<el-menu-item index="9-4" @click="link40()">和平村提成明细</el-menu-item>
								</el-submenu>
								<el-submenu index="10" v-show="nav1">
									<template slot="title">
										<i class="fa fa-address-card"></i>
										<span>代理提成</span>
									</template>
									<el-menu-item index="10-1" @click="tolink83()">财务结账</el-menu-item>
									<el-menu-item index="10-2" @click="tolink84()">结账记录</el-menu-item>
								</el-submenu>
								<!-- <el-submenu index="11" v-show="nav1">
									<template slot="title">
										<i class="fa fa-address-card"></i>
										<span>查看进度</span>
									</template>
									<el-menu-item index="10-1" @click="link41()">查询 代理/消费分润 进度</el-menu-item>
								</el-submenu> -->
								<el-submenu index="12" v-show="nav1">
									<template slot="title">
										<i class="fa fa-address-card"></i>
										<span>活动</span>
									</template>
									<el-menu-item index="11-1" @click="link42()">中奖列表</el-menu-item>
								</el-submenu>
							</el-menu>
						</el-col>
						
						
					<!--&lt;!&ndash;导航菜单-折叠后&ndash;&gt;-->
					<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
						<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
							<template v-if="!item.leaf">
								<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
								<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
									<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
								</ul>
							</template>
							<template v-else>
								<ul>
									<li class="el-submenu">
										<div class="el-submenu__title el-menu-item" style="height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
									</li>
								</ul>
							</template>
						</li>
					</ul>
				</aside>
				<aside :class="'menu-expanded'"  v-if="nav4">
						<el-col :span="24">
							<el-menu :default-active="'1'" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
									 @select="handleSelect" unique-opened>
								<el-submenu index="10">
									<template slot="title">
										<i class="fa fa-address-card"></i>
										<span>数据查询</span>
									</template>
									<el-menu-item index="1-1" @click="tolink85()">推广商家提成</el-menu-item>
									<el-menu-item index="1-2" @click="tolink86()">匀贸消费分润</el-menu-item>
									<el-menu-item index="1-3" @click="tolink87()">文交寄存销售分润</el-menu-item>
									<el-menu-item index="1-6" @click="tolink90()">和平村寄存销售分润</el-menu-item>
									<el-menu-item index="1-4" @click="tolink88()">上下级记录</el-menu-item>
									<el-menu-item index="1-5" @click="tolink89()">三七分润</el-menu-item>
									<el-menu-item index="1-7" @click="tolink91()">和平村提成明细</el-menu-item>
								</el-submenu>
								
							</el-menu>
						</el-col>
				</aside>
				
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path" >
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'搜了农庄后台',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				user:JSON.parse(sessionStorage.getItem('user')),
				rules:1,
				rulesTwo:2,
				rulesThree:3,
				rulesFour :4,
				rulesCurrency:100,
				nav1:false,
				nav2:false,
				nav3:false,
				nav4:false,
				bjIMG:require('../assets/bjpng.png'),
			}
		},
		methods: {
			handleCloseOne() {
				this.$router.push({path: '/password'})
			},
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				
			},
			handleOpen(key, keyPath) {

			},
			handleClose(key, keyPath) {

			},

			handleSelect(key,keyPath){

			},
			link1(){
				if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
					this.$router.push({path: '/AgentOne'})}else {this.$message('您没有权限');}},
			link2(){
				if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
					this.$router.push({path: '/Settled'})}else {this.$message('您没有权限');}},
			link3(){
				if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){this.$router.push({path: '/AgencySettlement'})}else {
					this.$message('您没有权限');}},
			link4(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){this.$router.push({path: '/Agent'})}else {
				this.$message('您没有权限');}},
			link28(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){this.$router.push({path: '/ruleCommunication'})}else {
				this.$message('您没有权限');}},
			link29(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){this.$router.push({path: '/paymentDeduction'})}else {
				this.$message('您没有权限');}},
            link30(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){this.$router.push({path: '/releaseQuantity'})}else {
                this.$message('您没有权限');}},
			link15(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){this.$router.push({path: '/landAgency'})}else {
				this.$message('您没有权限');}},
			tolink0(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
				this.$router.push({path: '/headman'})}else {this.$message('您没有权限');}},
			tolink1(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
				this.$router.push({path: '/superior'})}else {this.$message('您没有权限');}},
			tolink2(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
				this.$router.push({path: '/buyingRecords'})}else {this.$message('您没有权限');}},
            tolink3(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
                this.$router.push({path: '/realUser'})}else {this.$message('您没有权限');}},
			tolink4(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
				this.$router.push({path: '/documentSubmissionDetails'})}else {this.$message('您没有权限');}},
			tolink9(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
				this.$router.push({path: '/liquorBlendingRecord'})}else {this.$message('您没有权限');}},
			tolink5(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
				this.$router.push({path: '/purchaseDetails'})}else {this.$message('您没有权限');}},
			tolink6(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
				this.$router.push({path: '/transactionReleaseRecord'})}else {this.$message('您没有权限');}},
			tolink7(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
				this.$router.push({path: '/gold'})}else {this.$message('您没有权限');}},
			tolink8(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
				this.$router.push({path: '/pickingDetails'})}else {this.$message('您没有权限');}},
			tolink80(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
				this.$router.push({path: '/payCommission'})}else {this.$message('您没有权限');}},
			tolink81(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
				this.$router.push({path: '/royaltySummary'})}else {this.$message('您没有权限');}},
			tolink82(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
				this.$router.push({path: '/royaltySummaryRecord'})}else {this.$message('您没有权限');}},
			tolink83(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
				this.$router.push({path: '/financeEndMoney'})}else {this.$message('您没有权限');}},
			tolink84(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){
				this.$router.push({path: '/RecordEndMoney'})}else {this.$message('您没有权限');}},
			link5(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency) {this.$router.push({path: '/AgentsEnter'})}else {this.$message('您没有权限');}},
			link17(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency) {this.$router.push({path: '/landIndex'})}else {this.$message('您没有权限');}},
			link26(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency) {this.$router.push({path: '/IncomeFromPlat'})}else {this.$message('您没有权限');}},
			link6(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/merchantsSettle'})}else {
				this.$message('您没有权限');}},
			link7(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/transaction'})}else {
				this.$message('您没有权限');}},
			link8(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/Form'})}else {
				this.$message('您没有权限');}},
			link16(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/landLease'})}else {
					this.$message('您没有权限');}},
			link27(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/UserIncomeSettlement'})}else {
				this.$message('您没有权限');}},
			link31(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/uniformTradeOrder'})}else {
				this.$message('您没有权限');}},
			link32(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/promotionCommission'})}else {
				this.$message('您没有权限');}},
			link34(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/divideProfits'})}else {
				this.$message('您没有权限');}},
			link9(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/Table'})}else {
				this.$message('您没有权限');}},
			link10(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/user'})}else {
				this.$message('您没有权限');}},
			link33(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/consumptionProfitSharing'})}else {
				this.$message('您没有权限');}},
			link35(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/tableImport'})}else {
				this.$message('您没有权限');}},
            link36(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/merchantSettlement'})}else {
                this.$message('您没有权限');}},
			link37(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/salesPromotion'})}else {
				this.$message('您没有权限');}},
			link38(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/mixWine'})}else {
				this.$message('您没有权限');}},
			link39(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/salesPromotionOne'})}else {
				this.$message('您没有权限');}},
			link40(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/pvCommission'})}else {
				this.$message('您没有权限');}},
			link11(){if(this.user.rules==this.rulesThree||this.user.rules==this.rulesCurrency){this.$router.push({path: '/Formag'})}else {
				this.$message('您没有权限');}},
			link18(){if(this.user.rules==this.rulesThree||this.user.rules==this.rulesCurrency){this.$router.push({path: '/landAgencyFee'})}else {
				this.$message('您没有权限');}},
			link12(){if(this.user.rules==this.rulesThree||this.user.rules==this.rulesCurrency){this.$router.push({path: '/Tableag'})}else {
				this.$message('您没有权限');}},
			link13(){if(this.user.rules==this.rulesThree||this.user.rules==this.rulesCurrency){this.$router.push({path: '/userag'})}else {
				this.$message('您没有权限');}},
			link14(){if(this.user.rules==this.rulesThree||this.user.rules==this.rulesCurrency){this.$router.push({path: '/financialag'})}else {
				this.$message('您没有权限');}},
			link19(){if(this.user.rules==this.rulesThree||this.user.rules==this.rulesCurrency){this.$router.push({path: '/regionalLand'})}else {
				this.$message('您没有权限');}},
            link20(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/newArticles'})}else {
                this.$message('您没有权限');}},
			link21(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/order'})}else {
				this.$message('您没有权限');}},
			link22(){if(this.user.rules==this.rulesTwo||this.user.rules==this.rulesCurrency){this.$router.push({path: '/transactionRelease'})}else {
				this.$message('您没有权限');}},
			link23(){if(this.user.rules==this.rulesThree||this.user.rules==this.rulesCurrency){this.$router.push({path: '/externalLand'})}else {
				this.$message('您没有权限');}},
			link24(){if(this.user.rules==this.rulesThree||this.user.rules==this.rulesCurrency){this.$router.push({path: '/resourceManagement'})}else {
				this.$message('您没有权限');}},
			link25(){if(this.user.rules==this.rulesThree||this.user.rules==this.rulesCurrency){this.$router.push({path: '/takeLook'})}else {
				this.$message('您没有权限');}},
			link41(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){this.$router.push({path: '/selectProgress'})}else {
				this.$message('您没有权限');}},
			link42(){if(this.user.rules==this.rules||this.user.rules==this.rulesCurrency){this.$router.push({path: '/redPacketList'})}else {
				this.$message('您没有权限');}},
			
			//权限4
			tolink85(){if(this.user.rules==this.rulesFour){this.$router.push({path: '/foreignPromotionCommission'})}else {
				this.$message('您没有权限');}},
			tolink86(){if(this.user.rules==this.rulesFour){this.$router.push({path: '/foreignConsumptionProfitSharing'})}else {
				this.$message('您没有权限');}},
			tolink87(){if(this.user.rules==this.rulesFour){this.$router.push({path: '/foreignRoyaltySummary'})}else {
				this.$message('您没有权限');}},
			tolink88(){if(this.user.rules==this.rulesFour){this.$router.push({path: '/foreignSuperior'})}else {
				this.$message('您没有权限');}},
			tolink89(){if(this.user.rules==this.rulesFour){this.$router.push({path: '/foreignTableImport'})}else {
				this.$message('您没有权限');}},
			tolink90(){if(this.user.rules==this.rulesFour){this.$router.push({path: '/foreignSalesPromotion'})}else {
				this.$message('您没有权限');}},
			tolink91(){if(this.user.rules==this.rulesFour){this.$router.push({path: '/foreignPvCommission'})}else {
				this.$message('您没有权限');}},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
				}).then(() => {
                    sessionStorage.removeItem('token');
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},
			// onClickTitle(){
			// 	var user = sessionStorage.getItem('user');
            //    for (var i in this.$router.options.routes) {
            //    	   var num=this.$router.options.routes[i].meta
			// 	   if(num.role==user.rules){
			//
			// 	   }
			//
			//
			//    }
			// },

		},
		mounted() {
			var user = sessionStorage.getItem('user');
            //var token = sessionStorage.getItem('token');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.nickName || '';
				this.sysUserAvatar = user.avatar || '';
			}
			if(this.user.rules==this.rules){
				this.nav1=true
			}else if(this.user.rules==this.rulesTwo){
				this.nav2=true
			}else if(this.user.rules==this.rulesThree){
				this.nav3=true
			}else if(this.user.rules==this.rulesFour){
				this.nav4 = true
			}else if(this.user.rules==this.rulesCurrency){
				this.nav1=true;
				this.nav2=true;
				this.nav3=true
			}
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: #fff;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#333333;
					img {
						width: 42px;
						height: 42px;
						border-radius: 20px;
						margin: 8px 0px 8px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				/*padding-left:20px;*/
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				background: $color-primary;
				img {
					width: 40px;
					float: left;
					margin: 10px 5px 10px 8px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			background: #fff;
			position: absolute;
			top: 60px;
			bottom: 0;
			overflow: hidden;
			/*aside {*/
				/*flex:0 0 230px;*/
				/*width: 230px;*/
				 /*position: absolute;*/
				 /*top: 0px;*/
				 /*bottom: 0px;*/
				/*{*/
					/*height: 100%;*/
					/*background-color: rgb(48, 65, 86);*/
				/*}*/
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				/*}*/
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding:0 20px 20px;
				.breadcrumb-container {
					line-height: 50px;
					box-shadow: 0px 1px 8px 0px rgba(48, 65, 86, 0.1);
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #333333;
						font-size: 16px;
					}
					.breadcrumb-inner {
						float: right;
						line-height: 50px;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
