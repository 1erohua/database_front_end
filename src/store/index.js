// 该文件是store
// 该文件是store
// 该文件是store
import Vue from "vue";
import Vuex from "vuex";

// 导入用于操作token的工具函数
import {
	setToken,
	getToken,
	removeToken
} from "@/utils/auth.js";

// 导入用于登录和获取用户信息的API请求函数
import {
	getLogin,
	getInfo
} from "@/api/request";

// 使用Vuex插件
Vue.use(Vuex);

// 创建并导出一个Vuex Store实例
export default new Vuex.Store({
	// state是存储应用状态的地方
	state: {
		// 侧边栏开关状态，默认为关闭
		sideBarIsOpen: false,
		// 当前选中的菜单项
		currentMenu: null,
		// 路由标签列表，初始包含一个主页标签
		tagslist: [{
			path: "/",
			name: "home",
			label: "主页",
		}, ],

		// 登录状态，默认为未登录
		isLogin: false,
		// 从本地存储中获取的token
		token: getToken(),

		// 用户职位
		// 用户职位包括有 Manager、BandMember、Fan三种
		role: 'BandMember',
		// 用户名
		username: "",
		// 用户头像
		avatar: "",
		// 用户性别
		gender:"",
		// 用户年龄
		age:"",
		// 粉丝Id
		fanId:"",
		// 乐队Id
		bandId:"",
		// 成员Id
		MemberId:"",
	},
	// mutations是修改state的唯一途径，必须是同步函数
	mutations: {
		// 修改侧边栏开关状态
		changeSideBarIsOpen(state, isCollapse) {
			state.sideBarIsOpen = isCollapse;
		},
		// 选择菜单项
		selectmenu(state, val) {
			if (val.name === "home") {
				// 如果选择的是主页，清空当前菜单项
				state.currentMenu = null;
			} else {
				// 否则设置当前菜单项为选中的菜单项
				state.currentMenu = val;
				// 如果tagslist中不存在该菜单项，则插入
				let result = state.tagslist.findIndex((item) => item.name === val.name);
				result === -1 ? state.tagslist.push(val) : "";
			}
		},
		// 关闭标签页
		closeTab(state, val) {
			// 找到要关闭的标签页的索引
			let result = state.tagslist.findIndex((item) => item.name === val.name);
			// 从tagslist中移除该标签页
			state.tagslist.splice(result, 1);
		},

		// 设置token
		SET_TOKEN(state, token) {
			state.token = token;
		},
		// 设置用户名
		SET_NAME: (state, name) => {
			state.username = name;
		},
		// 设置用户头像
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar;
		},
		// 设置用户职位
		SET_ROLE: (state, role) => {
			state.role= role;
		},
		// 设置用户性别
		SET_GENDER: (state, gender) => {
			state.gender = gender;
		},
		// 设置粉丝Id
		SET_FANID: (state, fanId) => {
			state.fanId = fanId;
		},
		// 设置乐队Id
		SET_BANDID: (state, bandId) => {
			state.bandId = bandId;
		},
		// 设置用户年龄
		SET_AGE: (state, age) => {
			state.age = age;
		},
		// 设置乐队成员Id
		SET_BANDMEMBER: (state, MemberId) => {
			state.MemberId = MemberId;
		},
	},

	// actions用于处理异步操作，可以包含任意异步操作
	actions: {
		// 登录操作
		login({
			commit
		}, userPass) {
			const {
				username,
				pass
			} = userPass;
			return new Promise((resolve, reject) => {

				// 模拟登录成功
				if(username !== "admin" || pass !== "123456"){
					// 如果用户名或密码错误，返回错误信息
					reject(new Error("用户名或密码错误"))

				// 登录失败
				}else{
					// 模拟设置token
					setToken("123456")
					// 返回登录成功的信息
					resolve({data:{
						code:1000,
						message:"登录成功",
					}})
				}

				// 当搭建好后端和MySQL开启以下注释，并将上面模拟登录操作注释
				// getLogin({ username: username, pass: pass })
				//   .then((res) => {
				//     const { data } = res;
				//     commit("SET_TOKEN", data.token);
				//     setToken(data.token);
				//     resolve(res);
				//   })
				//   .catch((error) => {
				//     reject(error);
				//   });
			});
		},
		// 获取用户信息
		getInfo1({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				// 模拟设置用户名
				commit("SET_NAME", '林华');
				// 模拟设置用户头像
				commit("SET_AVATAR", 'https://p1.ssl.qhimg.com/t019a23480c7749785e.jpg');
				// 模拟设置用户职位
				// commit("SET_ROLE", 'Manager');
				// 返回成功信息
				resolve();

				// // 当搭建好后端和MySQL开启以下注释，并将上面代码注释
				// getInfo({ token: state.token })
				//   .then((res) => {
				//     let { data } = res;
				//     commit("SET_NAME", data.username);
				//     commit("SET_AVATAR", data.avatar);
				//     commit("SET_ROLE", data.role);
				//     commit("SET_BANDID", data.bandId);
				// 	commit("SET_FANID",data.fanId);
				// 	commit("SET_AGE",data.age);
				// 	commit("SET_GENDER",data.gender);
				// 	commit("SET_BANDMEMBER",data.MemberId);
				//     resolve();
				//   })
				//   .catch((err) => {
				//     reject(err);
				//   });
			});
		},
		// 登出操作
		logout() {
			// 移除token
			removeToken();
		},
	},
	// modules用于将store分割成模块，每个模块拥有自己的state、mutations、actions等
	modules: {},
});
// 该文件是store
// 该文件是store
// 该文件是store