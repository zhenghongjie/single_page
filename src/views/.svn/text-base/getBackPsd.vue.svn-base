<template>
<div class="register">
		<header class="login-header">
			<span>找回密码</span>
		</header>
		<section>
			<div class="input-group">
				<label>手机</label>
				<input type="mobile" name="" placeholder="请输入手机号码" v-model="mobile">
			</div>
		</section>
		<section id="login-btn">
			<button v-bind:class="{'notable': notable,'canable':canable}"  @click="showConfrim">下一步</button>
		</section>
		<section class="protic">
			<i></i>
			<span>同意 苗仓用户注册协议</span>
		</section>
			<div v-show="show_mask">
			<div class="weui_mask"></div>
			<div class="weui_dialog">
				<div class="weui_dialog_hd"><strong class="weui_dialog_title">我將發短信驗證碼到</strong></div>
				<div class="weui_dialog_bd">{{mobile}}</div>
				<div class="weui_dialog_ft">
					<a href="javascript:;" class="weui_btn_dialog default" @click="onCancel">取消</a>
					<a class="weui_btn_dialog primary" @click="goGetCode">确定</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name:'getBackPsd',
	data:function(){
		return {
				mobile:'',
				show_mask: false,
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
		methods: {
			onCancel: function(){
				this.show_mask = false;
			},
			showConfrim:function(){
				if (this.disable) {
					return
				}
				this.show_mask = true
			},
			goGetCode:function(){
	          	this.$router.push(
	          		{path:'/seccode',
					query:{
						mobile: this.mobile,
						bizType: 'c_reset',
						type: 'getBackPsd'
					}
				})
			}
		},
}
</script>
<style scoped>
	.weui_dialog {
    width: 65% !important;}
</style>