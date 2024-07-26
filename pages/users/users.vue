<template>
	<view class="users">
		<el-autocomplete class="inline">
			
		</el-autocomplete>
		 <!-- <el-autocomplete
		      class="inline-input"
		      v-model="state1"
		      :fetch-suggestions="querySearch"
		      placeholder="请输入内容"
		      @select="handleSelect"
		    ></el-autocomplete> -->
		
	</view>
</template>

<script>
	export default {
		name:'users',
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.users{		
		width: 100%;
		height: 500px;
		background-color: white;
		margin-top: 10px;
		border-radius: 5px;
		box-shadow: -2px 5px 10px rgb(208,210,214);
		padding: 10px;
	}
</style>
