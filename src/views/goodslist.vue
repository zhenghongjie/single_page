<template>
	<div id="goodslist">
		<header>
			<router-link to="/search">
				<div id="search-group">
					<div class="styled-select">
						<select>
							<option value="1">苗木</option>
						</select>
					</div>
					<input type="search" name="" disabled="disabled" v-model="input_word" class="goodeslist_input" placeholder="输入苗木名称">
				</div>
			</router-link>
		</header>		
		<div class="filter goodslist_filter"  v-show="!show1">
			<button type="button" class="goodslist_btn">			
			</button>
				<div class="pull-right">
					<div class="show-select">
						<div class="styled-select theme2">
							<select v-model = "selected" id="goodslist_select" @click="show_data">
								<option v-for="data in orderBy" v-bind:value="data.value" >{{data.name}}</option>
							</select>
						</div>
					</div>
				</div>
	    	</div>
		<section>		
			<h4 v-show="!show1">全部<em> {{allGoodsList.total_cnt}}</em>个结果</h4>	
			<ul class="item">
				<li v-for="re in goosdetail">
					<router-link :to="{name:'goods', params:{skuNumber:re.sku_number}}">
						<img :src="re.main_image">
						<div class="detail">
							<p class="name"><strong>{{re.base_name}}</strong>
								<i>{{plant_category(re.plant_category)}}</i>
								<span class="address"> 
										<img src="../img/location.png" alt="" class="address-pic" />{{re.province_name}} {{re.city_name}}{{re.location}}
								</span>
							</p>
							<p>{{seedlingDetailsHandler(re.seedling_details)}} </p>
							<p class="price" v-if='re.price != 0'><span style="font-size:12px">&yen;</span>{{(re.price*1).toFixed(2) + "元\/" + re.unit_desc}} &nbsp 库存{{re.inventory }}</p>
							<p class="price" v-if='re.price == 0'> 面议 &nbsp 库存{{re.inventory}}</p>
							<p class="company"><span>{{re.company_name}}</span><i v-if="re.has_auth" class="goodslist_ha_auth"><img src="../img/ha_auth.png" alt="" /></i></p>
						</div>
					</router-link>
				</li>
			</ul>
		</section>
		<div class="no-result" v-show='show1'>
			<img v-bind:src="noResult" alt="" class="no_result_img" />
			<p>没有找到相关苗木</p>
		</div>
		<div class="wait_down" v-show="show"><img src="../img/gif.gif" alt="" /></div>
	</div>
</template>
<script>
	require('../css/goodslist.css');
	import axios from 'axios';
	var noResult = require('../img/no_result.png');
	export default {
		name: 'goodslist',
		data: function() {
			var rs = {
				show1: false,
				input_word:this.$route.query.keyword,
				firstscroll: false,
				page_size: 3,
				allGoodsList: [],
				goosdetail:[],
				noResult: noResult,
				show: false,
				//有没有搜索结果 －1初始化状态，0没有，1有
				hasResult: -1,
				total: '',
				page: 1,
				postData: {
				},
				isshowtips: true,
				// 当前选定的排序规则
				order_filed: '4399',
				selected:'4399',
				showFooterDownLoad: 1,
				orderBy: [
				    {
						value: '4399',
						name: '综合排序'
					},
					{
						value: 'low_Price',
						name: '价格从低到高'
					},
					{
						value: 'high_price',
						name: '价格从高到低'
					},
					{
						value: 'low_time',
						name: '发布时间从早到晚'
					},
					{
						value: 'high_time',
						name: '发布时间从晚到早'
					}
				]
			};
			return rs;
		},
		methods: {	
			show_data:function(){
				var _this=this;
				var myselect = document.getElementById("goodslist_select");
				var index=myselect.selectedIndex;
				var data_value=myselect.options[index].value;
				if(_this.postData.order_filed==data_value){
					       return
				}else{
					_this.postData.order_filed=data_value;
					_this.reques(null,1);	
				}											
			},
				sessionClear:function() {
					sessionStorage.clear();
				},
			reques: function(page,type) {
				var _this = this;				
				 _this.postData.keyword=_this.$route.query.keyword;
				_this.postData['city_code'] = -1;
				 _this.postData['page'] = page || _this.page;
				var url = 'http://test.miaocang.cc:12100/api/offer_search.htm';
				 _this.show = true;//显示加载中的图标
				axios.post(url, _this.postData).then(response => {
					console.log(response);
					_this.allGoodsList = response.data.data;					
						if(this.allGoodsList.total_cnt==0){
				            this.show1=true
		                 }
                    var cache = !type ?_this.goosdetail.concat(response.data.data.offers):response.data.data.offers;
					_this.goosdetail = cache;	
					_this.show = false;//隐藏加载中的图标
				}).catch(error => {
					alert("请求错误")
				})
			},
			plant_category: function(plant_category) {
				var type = {
					"rongmiao": "容",
					"yizhi": "移",
					"dimiao": "地"
				}
				return type[plant_category]
			},
			seedlingDetailsHandler(arr) {
				var str = ''
				arr.map(item => {
					var name = item.name;
					if(name.length > 0) {
						name = name.substring(0, 1);
					}
					str += name + '' + (item.value_begin || '') + '-' + (item.value_end || '') + item.unit + ' ';
				})
				  return str;
			},
		},
		created: function() {
			this.postData.company_number= this.$route.query.companyNumber;	   			
			var _this = this;
			this.reques();
		
			window.addEventListener('scroll', function() {
				var top = document.body.scrollTop;
				if(top > 0) {
					sessionStorage.setItem("offsetTop", top);
				}
				if(top > 600 * _this.page) {
					if(_this.page_size - _this.page < 0) {
						return;
					}
					_this.page++;
					_this.reques(_this.page);
				}
			}, 200, 1000);
		},
		mouted:function(){
	
		console.log(this.allGoodsList.total_cnt)
		}
	}
</script>