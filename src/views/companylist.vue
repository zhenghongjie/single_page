<template>
	<div id="businessList">
		<header>
			<router-link to="/search">
				<div id="search-group">
					<div class="styled-select">
						<select>
							<option value="2">企业</option>
						</select>
					</div><input type="search" disabled="disabled" v-model="input_word" class="companylist_input"></div>
			</router-link>
		</header>
		<section>
			<div v-show="!show1">
				<h4><em>{{businessList.total_cnt}}</em>个结果 </h4>
			</div>
			<ul class="businessItem">
				<li v-for="list in lists">
					<router-link :to="{name: 'company', params: { companyNumber: list.company_number}}" class="goodsDetail">
						<img :src="list.logo">
						<div class="detail_companylist">
							<h3 class="name"><span class="over_span">{{list.name}}</span>
								<span v-show="list.auth_status == 'P'" class="has_auth"><img src="../img/ha_auth.png" alt="" class="has_auth_img"/></span></h3>
							<span class="address"><i><img src="../img/location.png" alt="" class="address-pic" /></i>{{list.province_name ? (list.province_name + " " + list.city_name) : '无定位'}}</span>
							<span>粉丝：{{list.fans}}</span>
						</div>
					</router-link> <button class="btn" @click="show_ma">{{list.is_fav == 'Y' ? '已收藏' : '收藏'}}</button>
				</li>
			</ul>
		</section>
		<div class="no-result" v-show='show1'>
			<img v-bind:src="noResult" alt="" class="no_result_img" />
			<p>没有找到相关公司</p>
		</div>
		<div v-show="show_mask">
			<div class="weui_mask"></div>
			<div class="weui_dialog">
				<div class="weui_dialog_hd"><strong class="weui_dialog_title">通知</strong></div>
				<div class="weui_dialog_bd">收藏功能需要登录 </div>
				<div class="weui_dialog_ft">
					<a href="javascript:;" class="weui_btn_dialog default" @click="hide_ma">取消</a>
					<a class="weui_btn_dialog primary" @click="login_save">确定</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	require('../css/companylist.css');
	import axios from 'axios';
	var noResult = require('../img/no_result.png');
	export default {
		name: 'companylist',
		data: function() {
			return {
				input_word: this.$route.query.keyword,
				keyword: '',
				businessList: {},
				show_mask: false,
				lists: {},
				show2: false,
				show1: false,
				noResult: noResult,
				//有没有搜索结果 －1初始化状态，0没有，1有
				hasResult: -1,
				postData: {},
				page_size: 2,
				total_cnt: '',
				page: 1,
				option: 23,
				options: [23, 23, 23],
				currentCity: '',
				region: [],
			}
		},
		methods: {
			//收藏功能请求
			switchIsFav: function(list) {
				var _this = this;
				var url = 'http://test.miaocang.cc:12100/uapi/snsf_company_save.htm';
				if(list.is_fav == 'Y') {
					// 取消收藏
					url = 'http://test.miaocang.cc:12100/uapi/del_snsf_company.htm'
				}
				var postData = {
					company_number: list.company_number
				}
				console.log(postData)
				axios.post(url, postData).then(response => {
					console.log(response)
				}).catch(error => {
					alert("请求错误")
				})
			},
			//请求显示数据
			reques: function(page) {
				var _this = this
				var postData = this.$route.query;
				var url = 'http://test.miaocang.cc:12100/api/company_search.htm';
				axios.post(url, postData).then(response => {
					_this.businessList = response.data.data;					
						if(_this.businessList.total_cnt==0){
				            this.show1=true
		                 }
					_this.lists = response.data.data.companys;
					console.log(_this.lists);
				}).catch(error => {
					alert("请求错误")
				})
			},
			show_ma: function() {
				this.show_mask = true;
			},
			hide_ma: function() {
				this.show_mask = false;
			},
			login_save: function() {
				this.$router.push("/login")
				this.show_mask = false;
			},
		},
		created: function() {	
			var _this = this;
			_this.reques();
			window.addEventListener('scroll', function() {
				var top = document.body.scrollTop;
				if(top > 0) {
					sessionStorage.setItem("offsetTop", top);
				}
				if(top > 400 * _this.page) {
					if(_this.page_size < _this.page) {
						return;
					}
					_this.page++;
					_this.reques(_this.page);
				}
			}, 200, 1000);
		},
	}
</script>

<style scoped>

</style>