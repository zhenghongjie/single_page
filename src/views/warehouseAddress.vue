<template>
	<div id="address">
		<header>
			<p>地址定位</p>
		</header>
		<ul>
			<li><span>苗圃名称</span> <em>{{addressDetail.warehouse_name}}</em></li>
			<li><span>所在地</span> <em>{{addressDetail.location}}</em></li>
			<li><span>所在区镇</span> <em>{{addressDetail.town}} </em></li>
			<li><span>苗圃面积</span> <em>{{(addressDetail.area*1)+ '亩'}}</em></li>
			<div></div>
			<li><span>联系人</span> <em>{{addressDetail.contacts}}</em></li>
			<li><span>苗圃定位</span> <em id="address_details">{{addressDetail.address_details}}</em></li>
			<div></div>
		</ul>
          <div id="map">     	
          </div>
          <footer> 
          	<a v-bind:href="'tel:' + addressDetail.phone">拨打电话</a> 
          </footer>
          <a href="">
			<div class="float_menu" id="float_menu">
				<router-link to="/download">
					<img src="../img/more.png" alt="" />
				</router-link>
			</div>
		</a>
	</div>

</template>

<script>
	require('../css/warehouseAddress.css');
	import axios from 'axios';
	export default{
		name:'warehouseAddress',
		data(){
			return{				
				addressDetail:{},
			}
			
		},    
		created:function(){			
			this.reques();

		},	
	    methods:{
	    	reques:function(){
	    	var _this=this;
			var postData = this.$route.params;
			axios.post('http://test.miaocang.cc:12100/api/view_warehouse_address.htm', postData).then(response => {				
				_this.addressDetail = response.data.data;
				console.log(_this.addressDetail);
				if(_this.addressDetail.longitude != "0" && _this.addressDetail.latitude != "0" && _this.addressDetail.longitude != undefined && _this.addressDetail.longitude != null){
			          var map = new BMap.Map("map"); // 创建地图实例  
						var point = new BMap.Point(_this.addressDetail.longitude, _this.addressDetail.latitude); // 创建点坐标  
						map.centerAndZoom(point, 15);
						var marker = new BMap.Marker(point); // 创建标注      
						map.addOverlay(marker);
							map.addEventListener("click", function(e) {
							_this.ask();
						});
					
				}

			}).catch(error => {
				console.log(error);
			})
		},
		ask:function(){
				this.$router.push({
					path: '/map',
					query: {
						warehouseNumber: this.$route.params.warehouseNumber,
					}
				})
		}
	  },
	}
</script>