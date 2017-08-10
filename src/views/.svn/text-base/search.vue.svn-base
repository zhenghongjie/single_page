<template>
	<div id="search">
		<header>
			<div class="search-group">
				<div>
					<div class="styled-select" v-if="!isFromCompany">
						<select v-model="selected" @change="test" id="show-select">
							<option v-for="option in options">
								{{option.value }}
							</option>
						</select>
					</div>
				</div>
				<i></i>
				<input type="search" v-bind:placeholder="holderText" v-model="keyword" @keyup="reques" id="seach_box">
			</div>
			<router-link to="/">
				<button class="btn">取消</button>
			</router-link>
		</header>
		<section>
			<ul class="miao" v-show="!isInput && category == 1">
				<li>
					<p class="search-title">历史搜索</p>
				</li>
				<li v-for="res in se" @click="autoSearch(res)">
					{{res.keyword}}<button class="category" v-for="type in res.types">{{type.type_name}}</button>
				</li>
			</ul>
			<ul v-show="!isInput && category == 2">
				<li>
					<p class="search-title">历史搜索</p>
				</li>
				<li v-for="res in comp" @click="autoSearch(res)">
					{{res.keyword}}
				</li>
			</ul>
			<ul v-if="isInput">
				<li>
					<p class="search-title">搜索结果</p>
				</li>
				<li v-for="res in searchResult"  @click="autoSearch(res)">
					{{res.keyword}} <button class="category" v-for="type in res.types">{{type.type_name}}</button>
				</li>
			</ul>
			<p v-if="!isInput && searchHistoryResult.length > 0" @click="clearHistory" class="clear_p">清除历史纪录</p>
		</section>
	</div>
</template>
<script>
	require('../css/search.css');
	import axios from 'axios';
	export default {
		name: 'search',
		data: function() {
			return { // 1 苗木 2 企业
				selected: '苗木',
				options: [
					{ id: '1', value: '苗木' },
					{ id: '2', value: '企业' },				
				],
				category: 1,
				keyword: '',
				search_type:'',
				// 当前是否在输入？ 历史纪录／搜索结果
				isInput: false,
				noInput: true,
				// 联想结果
				searchSuggestResutl: [],
				se:[],
				comp:[],
				// 搜索历史
				searchHistoryResult: [],
				isFromCompany: false,
			}
		},
		methods: {
			filter:function(){
				this.search_type=='seedling'
			},
			// 监听键盘点击搜索事件
			searchHandler: function() {
				var obj = {
					keyword: this.keyword
				}
				this.autoSearch(obj);
			},
			// 跳转到对应的搜索界面
			autoSearch: function(obj) {
				var _this=this;
				var keyword = obj.keyword;
				var name = _this.category == 1 ? 'goodslist' : 'companylist';
				var history = _this.getFromlocalStorage('history');

				if(history == null) {
					history = []
				}
				if(keyword.replace(/\s/g, "").length != 0) {
					if(history.length >= 10) {
						history.pop();
					}
					history.unshift({
						keyword: keyword,
						search_type: _this.category == 1 ? 'seedling' : 'company',
						types: obj.types
					});
				}
				_this.saveToLocalStorage('history', history)
				_this.$router.push({
					path: '/' + name,
					query: {
						keyword: keyword
					}
				})
			},
			saveToLocalStorage: function(key, value) {
				if(key == null) {
					return;
				}
				if(value == null) {
					window.localStorage.removeItem(key);
				} else {
					window.localStorage.setItem(key, JSON.stringify(value));
				}
			},
			getFromlocalStorage: function(key) {
				var res = window.localStorage.getItem(key);	
				if(res) {
					return JSON.parse(res);
				} else {
					return null;
				}
			},
			// 搜索
			reques: function() {
				var _this = this;
				var url = this.category == 1 ? 'http://test.miaocang.cc:12100/api/offer_search_suggest.htm' : 'http://test.miaocang.cc:12100/api/company_search_suggest.htm';
				var obj = {
					keyword: this.keyword
				}
				axios.post(url, obj).then(response => {
					_this.searchSuggestResutl = response.data.data;
					_this.isInput = true;
					_this.noInput = false;
				}).catch(error => {
					alert("请求错误")
				})
			},
			go_goodslist: function() {
				var _this = this
				this.$router.push({
					path: '/goodslist',
					query: {
						keyword: _this.keyword
					}
				})
			},
			// 公司搜索历史
			searchHistoryHandler: function() {
				let _this = this;
				_this.searchHistoryResult = this.getFromlocalStorage('history') || [];
				var search_len=_this.searchHistoryResult.length;
			     for(var i=0;i<search_len;i++){
			     	if(_this.searchHistoryResult[i].search_type=='seedling'){
			     		_this.se.push(_this.searchHistoryResult[i])
			     	}			     				     			     	
			     }
			      for(var i=0;i<search_len;i++){
			     	if(_this.searchHistoryResult[i].search_type=='company'){
			     		_this.comp.push(_this.searchHistoryResult[i])
			     	}			     				     			     	
			     }		     
			},
			// 清空历史纪录
			clearHistory: function() {
				this.saveToLocalStorage('history', []);
				this.searchHistoryResult = [];
			},
			test: function() {
				var myselect = document.getElementById("show-select");
				var select_text = myselect.options[myselect.selectedIndex].text;
				if(select_text == "企业") {
					this.category = 2
				} else {
					this.category = 1
				}
			},
		},
		computed: {
			holderText: function() {
				return this.category == 1 ? '输入苗木名称' : '输入企业名称';
			},
			searchResult: function(){
				var _this=this;
				return !this.isInput ? this.searchHistoryResult : this.searchSuggestResutl;
			}
		},
		created: function() {
			var clear = this.getFromlocalStorage('clear');
			if(clear != 1) {
				this.saveToLocalStorage('clear', 1)
				this.saveToLocalStorage('history')
			}
			this.searchHistoryHandler();
		},
	}
</script>