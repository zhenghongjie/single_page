<template>
	<div class="styled-select" v-bind:class="{ 'theme1': theme == '1','theme2': theme == '2'}">
		<select v-model = "selected" >
			<option v-for="data in datas" v-bind:value = "data[value]">{{data[option]}}</option>
		</select>
	</div>
</template>
<script>
	export default {
		name:'selectComponent',
		props: ['selected','datas','value','option','change','theme'],
		data:function() {
			return {
			}
		},
		computed: {
			
		},
		created: function(){
			let _this = this;
		},
		methods: {
			
		},
	}
</script>
<style scoped>	
	.styled-select{ 
    min-width:58px;
    height: 100%;
    border:none;
    position: relative;
    box-sizing: content-box;
    float: left;
    }
    .theme2{
        max-width: 140px;
    }
    .theme2::before{
        right: -5px;
    }
    .theme1::before,::before{
        position:absolute;
        right: -5px;
        top: 50%;
        z-index: 22;
        content: "";
        width: 0;
        height: 0;
        -webkit-transform: translate(0,-50%);
        transform: translate(0,-50%);
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-top: 4px solid #80ddb5;
    }
    .theme1::before,&.theme2::before{
        top: 46%;
        border-top: 4px solid #666;
    }
	select {
        width: 100%;
	    background: transparent;
	    padding: 7px 10px;
	    -webkit-appearance: none; /*for chrome*/
	}

</style>