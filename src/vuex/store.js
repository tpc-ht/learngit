import Vue from 'vue'
import Vuex from 'vuex'  
import * as actions from './actions'
// import * as getters from './getters'

Vue.use(Vuex)
 
// 应用初始状态
const state = {
    count: 10,
	loadingBool:false,//Excel 表格数据导出数据加载bool事件
	resetText:'已重置!',
	clickLimit:true,//重复点击限制
	timeHorizon:1000,//重复点击时间范围 (毫秒)
}
// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
	setLoadingBool(state,bool){
		state.loadingBool = bool;
	}, 
	//是否重复点击限制
	startClickLimit(state){
		state.clickLimit = false;
	},
	endClickLimit(state){
		setTimeout(()=>{
			state.clickLimit = true;
		},350)
		
	}
}
const getters = {
	getCount(state){
		return state.count
	},
	getLoadingBool(state){
		return state.loadingBool;
	}, 
	getResetText(state){
		return state.resetText;
	},
	//重复点击限制
	getClickLimit(state){
		return state.clickLimit;
	}, 
	getTimeHorizon(state){
		return state.timeHorizon;
	},
}
// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})