<template>
	<view class="rights" style="border-radius: 10px;">
		<scroll-view scroll-y="true" style="height: 580px;width: 100%; border-radius: 10px;">
			<el-table :data="rightsList" border stripe class="rights-table" style="border-radius: 10px;">
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="authName" label="权限名称"></el-table-column>
				<el-table-column prop="path" label="路径"></el-table-column>
				<el-table-column prop="level" label="权限等级">
					<template v-slot="scope">
						<el-tag v-if="scope.row.level === '0'">一级</el-tag>
						<el-tag type="success" v-if="scope.row.level === '1'">二级</el-tag>
						<el-tag type="warning" v-if="scope.row.level === '2'">三级</el-tag>
					</template>
				</el-table-column>
			</el-table>
		</scroll-view>
		
		
	</view>
</template>

<script>
	import {get} from 'common/request.js'
	export default {
		name:'rights',
		data() {
			return {
				rightsList:[]
			}
		},
		methods: {
			getRightsList(){
				get('/rights/list').then(res=>{
					this.rightsList = res.data				
				}).success(res=>{
				
					this.$message.success(res.meta.msg)
				}).error(res=>{
					this.$message.error(res.meta.msg)
				})
			}
		},
		created(){
			this.getRightsList()
		}
	}
</script>

<style scoped>
	/deep/::-webkit-scrollbar{
		display: none;
		width: 0;
		height: 0;
	}
	.rights{		
		width: 100%;		
		background-color: white;
		margin-top: 10px;
		border-radius: 10px;
		box-shadow: -2px 5px 10px rgb(208,210,214);
	
	}
	
</style>
