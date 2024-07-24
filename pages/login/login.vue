<template>
	
	<view class="login">
		<view class="login-from">
			<view class="login-box">
				登录
			</view>			
			<view class="login-form-username">
				<view class="" style="width: 30%;">
					用户名：
				</view>
				<view class="">
					<u-input placeholder="请输入用户名" border="bottom"  v-model="username" ></u-input>
				</view>
			</view>
			<view class="login-form-password">
				<view class="" style="width: 30%;">
					密码：
				</view>
				<view class="">
					<u-input placeholder="请输入密码" border="bottom"  v-model="password"></u-input>
				</view>
			</view>
			<view class="canvas">
				<view class="">
					<u-input placeholder="请输入验证码" v-model="form.check"></u-input>
				</view>
				<view class="canvas-img-code" @click="clickCode">
					<canvas :style="{width:width+'px',height:height+'px'}" canvas-id="imgcanvas"></canvas>
				</view>			
			</view>
			
			
			<view class="login-form-button">
				<u-button text="登录" type="primary" @click="handle"></u-button>
			</view>
		</view>
	
	</view>
</template>

<script>
	
	import {post} from 'common/api.js'
	
	export default {
		name: 'login',
		data() {
			return {
				disabled:false,
				password:'',
				username:'',
				form:{
					check:'',//验证码
				},
				width: 120,
				height: 45,
				
			
				
			}
		},
		mounted() {
			this.initCode();
		},
		
		methods:{
			async handle(){
				try{
					console.log('验证码：', uni.getStorageSync('imgcode'));
					console.log(this.form.check);
					  if (this.form.check.toLowerCase() !== uni.getStorageSync('imgcode').toLowerCase()) {
						uni.showToast({
						  icon: 'none',
						  title: '验证码失败',
						});
					  }else{
						  uni.showToast({
							icon: 'none',
							title: '验证码正确',
						  });
						  // 使用axios就使用post(url,data)
						const test = await post('/login',{username: this.username,password: this.password})				
						console.log('请求成功',test);
						window.sessionStorage.setItem('token',test.data.data.token)
						alert(test.data.meta.msg)
						this.$router.push('/pages/home/home')
					  }
					
					
				}catch(e){
					//TODO handle the exception
					console.log('请求失败',e);
				}
			},
		
			// 初始化验证码
			initCode() {
				console.log('start');
				var context = uni.createCanvasContext('imgcanvas',this),
					w = this.width,
					h = this.height;
				context.setFillStyle("white");
				context.setLineWidth(5);
				context.fillRect(0, 0, w, h);
				var pool = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "I", "M", "N", "O", "P", "Q",
						"R", "S",
						"T", "U", "V", "W", "S", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
					],
					str = '';
				for (var i = 0; i < 4; i++) {
					var c = pool[this.rn(0, pool.length - 1)];
					var deg = this.rn(-30, 30);
					context.setFontSize(18);
					context.setTextBaseline("top");
					context.setFillStyle(this.rc(80, 150));
					context.save();
					context.translate(30 * i + 15, parseInt(h / 1.5));
					context.rotate(deg * Math.PI / 180);
					context.fillText(c, -15 + 5, -15);
					context.restore();
					str += c;
				}
				//生成的验证码在此写入缓存
				console.log('验证码：', str);
				uni.setStorage({
					key: 'imgcode',
					data: str,
				});
				for (var i = 0; i < 40; i++) {
					context.beginPath();
					context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
					context.closePath();
					context.setFillStyle(this.rc(150, 200));
					context.fill();
				}
				context.draw();
				console.log('end');
			},
			rc(min, max) {
				var r = this.rn(min, max);
				var g = this.rn(min, max);
				var b = this.rn(min, max);
				return "rgb(" + r + "," + g + "," + b + ")";
			},
			rn(max, min) {
				return parseInt(Math.random() * (max - min)) + min;
			},			
			//点击验证码，切换
			clickCode() {
				this.initCode();
			}
		}
		
	}
</script>

<style scoped>
	.login{
		padding: 0;
		margin:0px;
		background: url('/static/login.jpg') no-repeat;
		background-size:100% 100%;
		background-attachment:fixed;
		background-position: center 0;
		background-size: cover;
		min-height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
	
	
	}
	.login-from{
		width: 40%;
		height: 300px;
		text-align: center;
		margin: 0 auto;
		background-color: white;
		opacity: 0.6;
		color: black;
	}
	.login-box{
		font-size: 40px;
		padding-bottom: 20px;
		padding-top: 20px;
	}
	.login-form-username{
		display: flex;
		padding-bottom: 20px;
		
	}
	.login-form-password{
		display: flex;
		padding-bottom: 20px;
	}
	.login-form-button{
		width: 50%;
		padding-left: 25%;
	}
	.canvas{
		display: flex;
		justify-content: center;
	}
	

</style>