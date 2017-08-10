<template>
	<div class="login">
		<header class="login-header">
			<span>登录苗仓</span>
		</header>
		<section>
			<div class="input-group">
				<label>账号</label>
				<input type="mobile" placeholder="请输入手机号" v-model="mobile">
			</div>
			<div class="input-group">
				<label>密码</label>
				<input type="password" placeholder="请输入密码" v-model="password">
			</div>
			<div id="remember">
				<input type="checkbox" v-model="checked"  id="remember_check">
				<label>记住密码</label>
				<label id="isinput" v-show="inputpassword">您还未输入密码</label>
			</div>
		</section>
		<section id="login-btn">
			<button @click="requestLogin" class="login_btn">登录</button>
			<span><router-link to="/getBackPsd">忘记密码</router-link></span>
		</section>
		<section class="no-account">
			<span>还没有账号？</span>
			<router-link to="/register">
				<button>手机注册</button>
			</router-link>
		</section>
		<div v-show="show">
			<div class="weui_mask"></div>
			<div class="erro_dialog">
				<div class="weui_dialog_hd"><strong class="weui_dialog_title">通知</strong></div>
				<div class="weui_dialog_bd">{{errorMsg}}</div>
				<div class="weui_dialog_ft">
					<a class="weui_btn_dialog primary" @click="hide_ma">确定</a>
				</div>
			</div>
		</div>
		<div v-show="show2">
			<div class="weui_mask"></div>
			<div class="login_dialog">
				<div class="weui_dialog_hd"><strong class="weui_dialog_title">通知</strong></div>
				<div class="weui_dialog_bd">登录成功！</div>
				<div class="weui_dialog_ft">
					<router-link to="/" class="weui_btn_dialog primary" @click="hide_ma">确定</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	require('../css/login.css');
	import axios from 'axios';
	export default {
		name: "login",
		data: function() {
			return {
				show_mask: false,
				mobile: '',
				password: '',
				from: '',
				errorMsg: '请填写手机号或密码！',
				checked: false,
				inputpassword: false,
				show: false,
				show2: false
			}
		},
		methods: {
			requestLogin: function() {
				var _this = this;
				var postData = {
					mobile: this.mobile,
					pwd: this.password
				};
				if(postData.mobile.length != 11 || postData.mobile.length < 6 || postData.mobile.length > 20) {
					_this.show = true;
					return
				}
				axios.post('http://test.miaocang.cc:12100/api/do_login.htm', postData).then(res => {
					console.log(res);
					if(res.data.code == 10004 || res.data.code == 10001) {
						_this.show = true
						_this.errorMsg = res.data.data
					};
					if(res.data.code == 200) {
						_this.show2 = true;
						if(document.getElementById("remember_check").checked == true) {
							if(_this.password === '') {
								_this.inputpassword = true;
							} else {
								_this.inputpassword = false;
								_this.setCookie("mobile", _this.mobile);
								_this.setCookie("password", _this.password);
							}
						}
					}
				}).catch(error => {
					console.log(error.data.data);
					_this.errorMsg = error.data.data;
					_this.show = true;
				})
			},
			setCookie: function(key, value, expires, path, domain, secure) {
				var cookieText = encodeURIComponent(key) + '=' + encodeURIComponent(value);
				if(expires instanceof Date) {
					cookieText += '; expires=' + expires;
				}
				if(path) {
					cookieText += '; expires=' + expires;
				}
				if(domain) {
					cookieText += '; domain=' + domain;
				}
				if(secure) {
					cookieText += '; secure';
				}
				document.cookie = cookieText;
			},
			hide_ma: function() {
				this.show2 = false;
				this.show = false;
			}
		},
	}
</script>