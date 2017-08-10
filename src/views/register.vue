<template>
	<div class="register">
		<header class="login-header">
			<span>手机快速注册</span>
		</header>
		<section>
			<div class="input-group">
				<label>手机</label>
				<input type="mobile" name="" placeholder="请输入手机号码" v-model="mobile">
			</div>
		</section>
		<section id="login-btn">
			<button v-bind:class="{'notable': notable,'canable':canable}" @click="show_ma">下一步</button>
		</section>
		<section class="protic">
			<i></i>
			<span>同意 苗仓用户注册协议</span>
		</section>
		<div v-show="show_mask">
			<div class="weui_mask"></div>
			<div class="weui_dialog register_dalog">
				<div class="weui_dialog_hd"><strong class="weui_dialog_title">我將發短信驗證碼到</strong></div>
				<div class="weui_dialog_bd">{{this.mobile}}</div>
				<div class="weui_dialog_ft">
					<a href="javascript:;" class="weui_btn_dialog default" @click="hide_ma">取消</a>
					<a class="weui_btn_dialog primary" @click="go">确定</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	require('../css/register.css');	
	export default{
		name: 'register',	
		data: function() {
			return {
				show_mask:false,
				mobile: '',
				show: false,
				show2: false
			}
		},
		computed: {
			notable: function() {
				return this.mobile.replace(/\s/g, "").length !== 11;
			},
			canable:function(){			
				return this.mobile.replace(/\s/g, "").length == 11;
			}
			
		},
		methods:{
					show_ma:function(){
						if(this.canable){		
					       this.show_mask=true ; 
					      }
					},
					hide_ma:function(){
					       this.show_mask=false;    
					},
			    go:function(){
			    	 this.show_mask=false;
			     this.$router.push({path:'/seccode', 
					query:{
						bizType: 'c_reg',
						mobile: this.mobile
						}
					})
			
		}
		},
		
	}
</script>