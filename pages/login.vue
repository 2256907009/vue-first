<template>
	
	
	
</template>

<script>
	
	
	import { login } from "../network/login"
	export default {
		
		name:'Home',
		data(){
			return{
				user:{
					account:1,
					password:1
				}
			}
		},
		methods:{
			send(){
				login(this.user).then(res=>{
					console.log('登录成功');
				})
			}
		}
	}
	
</script>

<style>
</style>