<template>
	<div class="map">
		<header>
			<p>地址定位</p>
		</header>
		<div id="map_extend"></div>
		<div id="daohangdiv1" class="myclass">
			<div class="leftContext">
				<div class="div1" id="warehouseNameDiv">{{addressDetail.warehouse_name}}</div>
				<div class="div2" id="addressDetailsDiv">{{addressDetail.address_details}}</div>
			</div>
			<div class="rightContext">
				<a id="daohanggao" class="mybutton">导航</a>
			</div>
		</div>
		<!--<footer>
			<div id="daohangdiv2" class="myclass2">
				<div class="leftContext2">
					<div class="div11" id="warehouseNameDiv2">{{addressDetail.warehouse_name}}</div>
					<div class="div22" id="addressDetailsDiv2">{{addressDetail.address_details}}</div>
				</div>
				<div class="rightContext2">
					<a id="daohanggao2" class="mybutton2">导航</a>
				</div>
			</div>
		</footer>-->
	</div>
</template>
<script>
	require("../css/map.css");
	import axios from 'axios';
	export default {
		name: 'map',
		data: function() {
			return {
				errorMsg: '',
				show: false,
				warehouseNumber: '',
				showFooterDownLoad: 1,
				addressDetail: {
					"address_details": "",
					"area": "",
					"contacts": "",
					"latitude": "",
					"location": "",
					"longitude": "",
					"main_product": "",
					"warehouse_number": ""
				}
			}
		},
		created: function() {
			this.reques();

		},
		methods: {
			reques: function() {
				var _this = this;
				var postData = this.$route.query;
				axios.post('http://test.miaocang.cc:12100/api/view_warehouse_address.htm', postData).then(response => {
					_this.addressDetail = response.data.data;
					console.log(_this.addressDetail);
					if(_this.addressDetail.longitude != "0" && _this.addressDetail.latitude != "0" && _this.addressDetail.longitude != undefined && _this.addressDetail.longitude != null) {
						var map = new BMap.Map("map_extend"); // 创建地图实例  
						var point = new BMap.Point(_this.addressDetail.longitude, _this.addressDetail.latitude); // 创建点坐标  
						map.centerAndZoom(point, 15);
						var marker = new BMap.Marker(point); // 创建标注     
						map.addOverlay(marker);	
						var bai = document.getElementById("daohanggao");
						bai.onclick = function() {
							var geolocation = new BMap.Geolocation();
							geolocation.getCurrentPosition(function(r) {
								if(this.getStatus() == BMAP_STATUS_SUCCESS) {
									var mk = new BMap.Marker(r.point);
									map.addOverlay(mk);									
									//map.panTo(r.point);//地图中心点移到当前位置  
									var latCurrent = r.point.lat;
									var lngCurrent = r.point.lng;
									window.location.href = "http://api.map.baidu.com/direction?origin=" + latCurrent + "," + lngCurrent + "&destination=" + point.lat + "," + point.lng + "&mode=driving&region=全国&output=html";
								} else {
									alert('failed' + this.getStatus());
								}
							}, {
								enableHighAccuracy: true
							})
						}
					}
				}).catch(error => {
					console.log(error);
				})
			},
		},
	}
</script>