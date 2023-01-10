import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
	state() {
		return {
			//数据字典的选项
			dicts: {},
			speciesList: {}
		}
	},
	getters: {
		listDictByKey(state) { 
			return state.dicts;
		},
		getSpeciesList(state) {
			return state.speciesList;
		}
	},
	mutations: {
		setDict(state, key, dicts) {
			state.dicts[key] = dicts;
		},
		setSpeciesList(state,speciesList){
			state.speciesList = speciesList
		}
	}
})

export default store;
