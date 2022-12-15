import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
	state() {
		return {
			//数据字典的选项
			dicts: {}
		}
	},
	getters: {
		listDictByKey(state) { 
			return state.dicts;
		}
	},
	mutations: {
		setDict(state, key, dicts) {
			state.dicts[key] = dicts;
		},
	}
})

export default store;
