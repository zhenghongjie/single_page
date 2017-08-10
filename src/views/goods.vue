<template>
	<div class="goods">
		<swiper :options="swiperOption" ref="mySwiper">
			<!-- 这部分放你要渲染的那些内容 -->
			<swiper-slide v-for="img in goodsDetail.mlist_image">
				<img v-bind:src="img" alt="" @click="show_big">
			</swiper-slide>
			<!-- 这是轮播的小圆点 -->
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
		<section>
			<div class="goods-name">
				<div class="goods-left">
					<h3>{{goodsDetail.base_name}} <i>{{plant_category(goodsDetail.plant_category)}}</i></h3>
					<p>常用名：{{goodsDetail.common_names}}</p>
				</div>
				<div class="love" @click='save_btn'>
					<i><img src="../img/love.png" alt="" /></i> <span>收藏</span>
				</div>
			</div>
			<div class="goods-detail">
				<div class="title">
					<span>详细信息</span>
					<span class="address"><img src="../img/location.png" alt="" class="address-pic" />{{goodsDetail.location}} </span>
				</div>
				<p v-for="detail in goodsDetail.details" v-show="(detail.value_begin!=null && detail.value_begin!=0) && (detail.value_end!=null && detail.value_end!=0)">
					<em>{{detail.name}}</em>
					<span>{{detail.value_begin  + " - " + detail.value_end + detail.unit}}
				</span>
				</p>
			</div>
			<div class="goods-detail price">
				<p v-if="goodsDetail.price != '0'"><em>价格</em><span>&yen {{goodsDetail.price && (goodsDetail.price + '/' + goodsDetail.unit_desc)}}</span></p>
				<p v-if="goodsDetail.price == '0'"><em>价格</em><span>面议</span></p>
				<p><em>库存</em><span v-if="goodsDetail.inventory">{{goodsDetail.inventory+ goodsDetail.unit_desc}}</span></p>
			</div>
			<div class="goods-detail company">
				<p><em>所属企业</em><span>{{goodsDetail.company_name}}</span></p>
				<p><em>发布时间 </em><span>{{goodsDetail.time}}</span></p>
			</div>
			<ul class="goods-address">
				<li class="miaopu-btn">
					<router-link :to="{name: 'company', params:{companyNumber: goodsDetail.company_number }}">进入苗圃</router-link>
				</li>
				<li class="address-btn">
					<router-link :to="{name:'warehouseAddress', params:{ warehouseNumber: goodsDetail.warehouse_number }}">地址定位</router-link>
				</li>
				<li class="phone-btn">
					<a v-bind:href="'tel:'+ goodsDetail.phone" class="phone-num">拨打电话</a>
				</li>
			</ul>
		</section>
		<div class="float_menu" id="float_menu">
			<router-link to="/download">
				<img src="../img/more.png" alt="" />
			</router-link>
		</div>
		<div class="pic_extend"  v-show="img_show">
			<img v-bind:src="cur_img" alt="" @click="show_small">
		</div>
		<div v-show='show'>
			<div class="weui_mask"></div>
			<div class="weui_dialog vux-dialog-transition">
				<div class="weui_dialog_hd"><strong class="weui_dialog_title">通知</strong></div>
				<div class="weui_dialog_bd"> 收藏功能需要登录 </div>
				<div class="weui_dialog_ft">
					<a class="weui_btn_dialog default" @click="hide">取消</a>
					<a class="weui_btn_dialog primary" @click="go_login">确定</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	require('../css/goods.css');
	import axios from 'axios';
	export default {
		name: "goods",
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				img_show: false,
				show: false,
				skuNumber: '',
				goodsDetail: {},
				cur_img:'',
				swiperOption: { //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
					notNextTick: true,
					autoplay: 2000,
					pagination: '.swiper-pagination',
					slidesPerView: 'auto',
					centeredSlides: true,
					paginationClickable: true,
					spaceBetween: 0,
					onSlideChangeEnd: swiper => { //这个位置放swiper的回调方法  
						this.page = swiper.realIndex + 1;
						this.index = swiper.realIndex;
					}
				}
			}
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			},
		},
		mounted: function(){
			var postData = this.$route.params;
			axios.post('http://test.miaocang.cc:12100/api/get_seedling_details.htm', postData).then(response => {
				this.goodsDetail = response.data.data;
				console.log(this.goodsDetail);
			}).catch(error => {
				console.log(error);
			})
		},
		methods: {
			show_big: function() {
				this.img_show = true;
				 var _l = this.swiper.activeIndex;
				this.cur_img=this.goodsDetail.list_image[_l]
			},
			show_small: function() {
				this.img_show = false
			},
			plant_category: function(plant_category) {
				var type = {
					"rongmiao": "容",
					"yizhi": "移",
					"dimiao": "地"
				}
				return type[plant_category]
			},
			save_btn: function() {
				this.show = true;
			},
			hide: function() {
				this.show = false;
			},
			go_login: function() {
				this.show = false;
				this.$router.push("/login");
			},
		},
	}
</script>