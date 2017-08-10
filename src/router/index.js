import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import goods from '@/views/goods'
import goodslist from '@/views/goodslist'
import company from '@/views/company'
import register from '@/views/register'
import login from '@/views/login'
import search from '@/views/search'
import Password from '@/views/Password'
import warehouseAddress from '@/views/warehouseAddress'
import download from '@/views/download'
import companylist from '@/views/companylist'
import seccode from '@/views/seccode'
import getBackPsd from '@/views/getBackPsd'
import companyDetail from '@/views/companyDetail'
import map from '@/views/map'
Vue.use(Router)
export default new Router({
	mode:'history',
	routes: [{
			path: '/',
			name: 'index',
			component: index,
			meta: { keepAlive: true }
		},
		{
			path: '/goods/:skuNumber',
			name: 'goods',
			component: goods,
			meta: { keepAlive: false }
		},
		{
			path: '/company/:companyNumber',
			name: 'company',
			component: company,
			meta: { keepAlive: false}
		},
		{
			path: '/companylist',
			name: 'companylist',
			component: companylist,
			meta: { keepAlive: false }
		},
		{
			path: '/companyDetail',
			name: 'companyDetail',
			component: companyDetail,
			meta: { keepAlive: false }
		},
		{
			path: '/seccode',
			name: 'seccode',
			component:seccode,
			meta: { keepAlive: false }
		},
		{
			path: '/register',
			name: 'register',
			component: register,
			meta: { keepAlive: false }
		},
		{
			path: '/login',
			name: 'login',
			component: login,
			meta: { keepAlive: false }
		},
		{
			path: '/Password',
			name: 'Password',
			component: Password,
			meta: { keepAlive: false }
		},
		{
			path: '/getBackPsd',
			name: 'getBackPsd',
			component:getBackPsd,
			meta: { keepAlive: false }
		},
		{
			path: '/warehouseAddress/:warehouseNumber',
			name: 'warehouseAddress',
			component: warehouseAddress,
			meta: { keepAlive: false }
		},
		{
			path: '/goodslist',
			name: 'goodslist',
			component: goodslist,
			meta: { keepAlive: false }
		},
		{
			path: '/search',
			name: 'search',
			component: search,
			meta: { keepAlive: false }
		},
		{
			path: '/map',
			name: 'map',
			component:map,
			meta: { keepAlive: false }
		},
		{
			path: '/download',
			name: 'download',
			component: download,
			meta: { keepAlive: false }
		}
	
	]
})