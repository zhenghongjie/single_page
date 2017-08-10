<template>
	<ul class="item">
				<li v-for ="list in lists">
					<router-link :to="{name: 'goods', params:{skuNumber: list.sku_number}}">
						<img v-bind:src="list.main_image" class="tree-pic">
						<div class="detail">
							<p class="name"><strong>{{list.base_name}}</strong><i>{{plant_category(list.plant_category)}}</i>
								<span class="address">
									<span class="address-icon">
										<img src="../img/location.png" alt="" class="address-pic" />
									</span>{{list.province_name}} {{list.city_name}}{{list.location}}</span>
							</p>
							<p>{{seedlingDetailsHandler(list.seedling_details)}} </p>
							<p class="price" v-if='list.price != 0'><span style="font-size:12px">&yen;</span>{{(list.price*1).toFixed(2) + "元\/" + list.unit_desc}} &nbsp 库存{{list.inventory }}</p>
							<p class="price" v-if='list.price == 0'> 面议 &nbsp 库存{{list.inventory}}</p>
							<p class="company"><span>{{list.company_name}}</span><i v-if="list.has_auth" class="goodslist_ha_auth"><img src="../img/ha_auth.png" alt="" /></i></p>
						</div>
					</router-link>
				</li>									
			</ul>
</template>
<script>
	export default{
		props: ['lists'],
		name:'goodsItemComponent',
		data: function() {
			return {
			}
		},
		methods: {
			seedlingDetailsHandler(arr){
				var str = ''
				arr.map(item => {
					str += item.name + '' + (item.value_begin || '') + '-' + (item.value_end || '' )+ item.unit + ' ';
				})
				return str;
			},
			plant_category:function(plant_category){
				var type = {
					"rongmiao":"容",
					"yizhi":"移", 
					"dimiao":"地"
				}
				return type[plant_category]
			}
		}
	}
</script>