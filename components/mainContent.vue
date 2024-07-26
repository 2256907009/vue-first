<template>
	<view class="">	
		<component :is="dynamicComponent"></component>
	</view>
</template>

<script>
	export default{
		name:'mainContent',
		props:['pagePath'],
		data(){
			return{
				
			}
		},
		components:{
			roles: ()=>import('pages/roles/roles.vue'),
			rights: ()=>import('pages/rights/rights.vue'),
			users: () => import('pages/users/users.vue')
		},
		computed :{
			dynamicComponent(){		
				switch(this.pagePath){
					case '/roles': return 'roles';
					case '/rights': return 'rights';
					case '/users': return 'users';
					default: return null;
				}
			}	
		}
	}
</script>

<style scoped>
</style>