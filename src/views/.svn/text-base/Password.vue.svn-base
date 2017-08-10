<template>
	<div class="login">
		<header class="login-header"> 
			<span>设置登陆密码</span> 
		</header>
		<section>
			<div class="input-group"><label>密码</label>
				<input type="mobile" name="" placeholder="请输入6-20位字符" v-model="pwd"> 
			</div>
		</section>
		<section id="login-btn">		
			   <button v-bind:class="{'notable': notable,'canable':canable}" @click="requestRegister">完成</button>	
		</section>
			<div v-show="show">
			<div class="weui_mask"></div>
			<div class="weui_dialog">
				<div class="weui_dialog_hd"><strong class="weui_dialog_title">通知</strong></div>
				<div class="weui_dialog_bd">操作成功</div>
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
	import axios from 'axios';
	export default{
		name:"Password",
		data:function(){
				return {
				seccode: '',
				mobile: '',
				pwd: '',
				from: '',
				errorMsg: '',
				show: false
			}	
		},
		computed: {
			notable: function() {
				return this.pwd.length < 6 ||this.pwd.length > 20;
			},
			canable: function() {
				return this.pwd.length > 5 && this.pwd.length < 20;
			}
		},
		created:function(){
			this.mobile=this.$route.query.mobile;
			this.seccode=this.$route.query.seccode;
			this.type=this.$route.query.type;
			console.log(this.type);
		},
		methods: {
				onHide: function() {
					if(this.from && this.from != '') {
						location.href = this.from;
					} else {
						this.$router.push("/")
					}
				},
				hide_ma:function(){
					this.show=false;
				},
				go:function(){
					this.$router.push("/login")
				},
			// 注册
			requestRegister: function(){
				var _this = this;
					if(this.notable) {
						return;
					}
				var postData = {
						mobile: this.mobile,
						seccode: this.seccode,
						pwd: this.pwd,
					}
				 var url = this.type && this.type != '' ? 'http://test.miaocang.cc:12100/api/do_reset.htm' : 'http://test.miaocang.cc:12100/api/do_reg.htm';
                 axios.post(url,postData).then(response=>{
                 	 this.show=true;
                 	    
                 }).catch(error=>{
                 	      alert("请求错误");                	
                 })
			},
		},
	}
</script>
<style>
</style>