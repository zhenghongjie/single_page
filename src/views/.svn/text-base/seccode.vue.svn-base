<template>
	<div class="register">
		<header class="login-header">
			<span>填写验证码</span>
		</header>
		<section class="code-mobile">
			<p>请输入手机号码{{mobile}}收到的手机号码</p>
		</section>
		<section>
			<div class="input-group">
				<label>验证码</label>
				<input type="mobile" class="seccode_input" placeholder="请输入验证码" v-model="seccode">
				<button class="seccode_active" @click="clickRequestCode">{{btnStr}}</button>
			</div>
		</section>
		<section id="login-btn">	
			  <button v-bind:class="{'notable': notable,'canable':canable}"  @click="goSetPassword">下一步</button>	
		</section>		
	</div>
</template>
<script>
	require('../css/register.css');	
	import axios from 'axios';
	export default{
		name: 'seccode',	
			data: function() {
			return {
				mobile: '',
				seccode: '',
				show: false,
				bizType:'',
				errorMsg: '',
				btnStr: '重新获取',
				// 什么类型的操作  注册 ／ 更改密码
				type:'',
			}
		},
		computed: {
			notable: function() {
				return this.seccode.replace(/\s/g, "").length !== 6;
			},
			canable:function(){			
				return this.seccode.replace(/\s/g, "").length == 6;
			}
		},
		created:function(){
			this.mobile=this.$route.params.mobile;
			this.bizType=this.$route.params.bizType;
			this.type=this.$route.params.type ? this.$route.params.type : '';
			this.clickRequestCode();	
		},
		methods: {
			clickRequestCode: function() {
				if(this.btnStr.indexOf('秒') > -1) {
					return
				}
				this.requestCode();
				this.countdown();
			},
			requestCode: function() {
				var _this = this;
				var postData = {
					mobile: this.mobile,
					type: 1,
					bizType: this.bizType
				};
				axios.post('http://test.miaocang.cc:12100/api/get_mobile_code.htm',postData).then(res=>{
				}).catch(error=>{
					alert("请求错误")
				})	        
			},
			goSetPassword: function(){
                if(this.canable){
                	this.$router.push({path:'/Password', 
					query:{
						mobile:this.mobile,
						bizType:'c_reg',
						seccode:this.seccode,
						type:this.type
					}
					})
                }
				
			},
			countdown: function() {
				var time = 60;
				this.btnStr = time + '秒后重新获取'
				this.timer = setInterval(function() {
					time -= 1;
					if(time <= 0) {
						clearInterval(this.timer);
						this.btnStr = '重新获取'
						return;
					}
					this.btnStr = time + '秒后重新获取'
				}.bind(this), 1000)
			},
			},
		route: {
			activate: function(transition) {
				this.mobile = transition.to.query.mobile;
				this.bizType = transition.to.query.bizType;
				this.type = transition.to.query.type ? transition.to.query.type : '';
				transition.next();
			},
			deactivate: function(transition) {
				transition.next();
			}
		},
	
	}
</script>
<style scoped>
.code-mobile {
    height: 1.333rem;
    line-height: 1.333rem;
    text-align: center;
    color: #666;
    font-size: 12px;
}
.input-group{margin-top: 0px;}

</style>