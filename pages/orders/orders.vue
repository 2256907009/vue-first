<template>
	<view class="orders">
		 <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
		    <el-button slot="append" icon="el-icon-search"></el-button>
		  </el-input>
		<scroll-view scroll-y="true" :show-scrollbar="true">
				订单页面
			
		</scroll-view>
		<el-pagination>
			
		</el-pagination>
	
	</view>
</template>

<script>
	export default {
		name:'orders',
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	/deep/::-webkit-scrollbar{
		display: none;
		width: 0;
		height: 0;
	}
	.orders{
		width: 98%;
		height: 560px;
		background-color: white;
		margin-top: 10px;
		border-radius: 10px;
		box-shadow: -2px 5px 10px rgb(208,210,214);
		padding: 10px ;
	}
</style>
