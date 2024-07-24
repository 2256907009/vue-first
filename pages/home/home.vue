<template>
	<view>
		home页面
		<view class="home-button">
			<u-button type="primary" @click="back">返回</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		name:'home',
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				window.sessionStorage.removeItem('token');
				// window.sessionStorage.clear()
				this.$router.push('/pages/login/login')
				
			}
		},
		created() {
			//检查是否带有Session
			const token = window.sessionStorage.getItem('token')
			if(!token){
				this.$router.push('/pages/login/login')
			}else{
				console.log('存在token，以登录过');
			}
		}
	}
</script>

<style>
	.home-button{
		width: 50%;
	}

</style>
