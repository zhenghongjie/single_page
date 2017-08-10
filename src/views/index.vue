<template>
	<div class="index">
		<section class="search-box" @click="go">
			<img src="../img/banner.png" alt="" />
			<div class="search-area">
				<span class="search-pic">
	    		  	<img src="../img/search.png" alt="" class="sear-icon"/>
	    	     </span>
				<input type="text" placeholder="输入木苗名称" class="search-inp" />
			</div>
		</section>
		<section>
			<h3 class="hot-tree">热门苗木</h3>
			<goods-item-component :lists="goodsList"></goods-item-component>

		</section>
		<div class="float_menu" id="float_menu">
			<router-link to="/download">
				<img src="../img/more.png" alt="" />
			</router-link>
		</div>
		<div class="wait_down" v-show="show"><img src="../img/gif.gif" alt="" /></div>
	</div>
</template>
<script>
	require('../css/index.css');
	var goodsItemComponent = require('../components/goodsItemComponent.vue');
	import axios from 'axios';
	export default {
		name: 'index',
		data: function() {
			var rs = {
				show: false,
				page: 1,
				page_size: 3,
				goodsList: [],
				city_name: '',
			};
			return rs;
		},
		created: function() {
			let _this = this;
			let sw = true;
			_this.reques();
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
		 activated(){
              var offset=sessionStorage.getItem("offsetTop");
             var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
             scrollTop=offset;
//            alert(offset)
        },
		methods: {
			go: function() {
				this.$router.push('/search')
			},
			reques: function(page) {
				var postData = {
					is_index_recommend: 'Y',
					page: page || 1
				};
				     this.show = true;//显示加载中的图标
				axios.post('http://test.miaocang.cc:12100/api/offer_search.htm', postData)
					.then(response => {
						console.log(response.data.data.offers);
						var cache = this.goodsList.concat(response.data.data.offers);
						this.goodsList = cache;
						this.show = false;//隐藏加载中的图标
					})
					.catch(error => {
						console.log(error);
					});
			},
		},
		components: {
			goodsItemComponent
		},
	}
	//			window.addEventListener('scroll', function() {
	//				if(document.body.scrollTop + window.innerHeight >= 1/2*(document.body.offsetHeight)) {
	//					if(_this.page_size-_this.page<0){
	//					      return
	//					}	
	//					 _this.page++;
	//					 _this.reques(_this.page) ;
	//					 console.log(_this.page);
	//			   }
	//             _this.remove();
	//			});
</script>
<style scoped>
	::-webkit-input-placeholder {
		color: #cacaca;
		font-size: .427rem !important;
	}

</style>