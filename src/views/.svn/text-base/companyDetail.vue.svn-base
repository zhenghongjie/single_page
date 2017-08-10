<template>
	<div id="businessDetail">
		<header>
			<h3>企业介绍</h3>
			<ul>
				<li @click="changeTab(1)" v-bind:class="{'active': curTab == 1}">基本信息</li>
				<li @click="changeTab(2)" v-bind:class="{'active': curTab == 2}">认证信息</li>
			</ul>
		</header>
		<section v-if="curTab == 1">
			<ul>
				<li> <span>企业名称</span><strong>{{companyDetail.company_name}}</strong> </li>
				<li> <span>所在地</span><strong>{{companyDetail.location}}  </strong> </li>
				<li> <span>主营业务</span><strong>{{companyDetail.main_product}}</strong> </li>
				<li> <span>联系人</span><strong>{{companyDetail.contacts}}</strong> </li>
				<li> <span>联系电话</span><strong>{{companyDetail.phone}}</strong> </li>
				<li> <span>联系地址</span><strong>{{companyDetail.address}}</strong> </li>
				<li> <span>二维码名片</span></li>
			</ul>
			<div id="qrcode" style="text-align: center"><canvas width="180" height="180"></canvas></div>
		</section>
		<section v-if="curTab == 2">
			<div class="result">{{getStatus(companyDetail.status)}}</div>
			<ul>
				<li> <span>企业名称：</span><strong>{{companyDetail.company_name}}</strong> </li>
				<li> <span>营业执照编码：</span><strong>{{companyDetail.business_number}}</strong> </li>
				<li> <span>法人代表：</span><strong>{{companyDetail.legal_person}}</strong> </li>
			</ul>
		</section>
		<div class="float_menu" id="float_menu">
			<router-link to="/download">
				<img src="../img/more.png" alt="" />
			</router-link>
		</div>
	</div>
</template>
<script>
	require('../css/companyDetail.css');
	import axios from 'axios';
	export default {
		name: 'companyDetail',
		data: function() {
			return {
				active: false,
				curTab: 1,
				companyNumber: '',
				companyDetail: {}
			}
		},
		methods: {
			changeTab: function(i) {
				this.curTab = i;
			},
			reques: function() {
				let postData = {
					companyNumber: this.$route.query.companyNumber
				}
				let _this = this;
				axios.post('http://test.miaocang.cc:12100/api/view_company_info_ba.htm', postData)
					.then(res => {
						_this.companyDetail = res.data.data;
						console.log(res)
					}).catch(error => {})
			},
			// 获取状态值
			getStatus: function(status) {
				let statusMap = {
					P: '已认证',
					W: '未认证',
					U: '认证未通过',
					O: '认证审核中'
				}
				return statusMap[status] + "企业身份"
			},
		},
		created: function() {
			this.reques();
		}
	}
</script>