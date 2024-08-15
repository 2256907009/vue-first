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
			users: () => import('pages/users/users.vue'),
			goods: () => import('pages/goods/goods.vue'),
			params:() => import('pages/params/params.vue'),
			categories:() => import('pages/categories/categories.vue'),
			orders:() =>import('pages/orders/orders'),
			reports:() =>import('pages/reports/reports.vue')
		},
		computed :{
			dynamicComponent(){		
				switch(this.pagePath){
					case '/roles': return 'roles';
					case '/rights': return 'rights';
					case '/users': return 'users';
					case '/goods': return 'goods';
					case '/params': return 'params';
					case '/categories': return 'categories';
					case '/orders': return 'orders';
					case '/reports': return 'reports';
					default: return null;
				}
			}	
		}
	}
</script>

<style scoped>
</style>