<template>
	<view class="goods"> 
		<el-input placeholder="请输入内容" v-model="pageInfo.query" class="input-with-select" style="width: 30%; margin-bottom: 10px;">
		    <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
		</el-input>
		<span style="margin-left: 20px;"><el-button type="primary" @click="addGoods">添加商品</el-button></span>
		<scroll-view scroll-y="true" :show-scrollbar="true" style="height: 465px;margin-bottom: 10px;">
			<el-table :data="goodsList" stripe border>
				<el-table-column label="#" type="index"></el-table-column>
				<el-table-column label="商品名称" prop="goods_name"></el-table-column>
				<el-table-column label="商品价格(元)" prop="goods_price"></el-table-column>
				<el-table-column label="商品重量" prop="goods_weight"></el-table-column>
				<el-table-column label="创建时间" prop="add_time"></el-table-column>
				<el-table-column label="操作">
					<template v-slot="scope">
						<!-- 这个页面 跟添加页面一致，就先将id获得对应数据，再修改提交通过编辑的后端接口提交就是，这我就不写了 -->
						<el-button type="primary" @click="editGoods">编辑</el-button>
						<el-popconfirm title="确定删除这个角色吗？" @confirm="delGoods(scope.row)">
							<el-button type="danger" class="roles-item" slot="reference">删除</el-button>
						</el-popconfirm>
					
						
						
						
					</template>
				</el-table-column>
			</el-table>
		</scroll-view>
		<el-pagination  @current-change="handleCurrentChange"  :current-page="pageInfo.pagenum" :page-size="100" layout="total, prev, pager, next, jumper" :total="total">
			
		</el-pagination>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	import {get,del} from 'common/request.js'
	import addgoods from 'pages/goods/addgoods.vue'
	export default {
		name:'goods',
		data() {
			return {
				goods:'',
				goodsList:[],
				pageInfo:{
					query:'',
					pagenum:1,
					pagesize:10
				},
				total:0
			}
		},
		methods: {
			async delGoods(scope){
				const id = scope.goods_id
				const res = await del(`goods/${id}`)
				if(res.meta.status !== 200){
					this.$message.error('删除商品失败')
				}
				this.$message.success('删除商品成功')
				this.getGoodsList()
			},
			getGoodsList(){
				get('/goods',this.pageInfo).then(res=>{
					this.goodsList = res.data.goods
					this.total = res.data.total
					this.goodsList = this.goodsList.map(item => ({
					  ...item,
					  add_time: dayjs(item.add_time).format('YYYY-MM-DD HH:mm:ss')
					}));
					console.log(this.goodsList);
					if(res.meta.status !== 200){
						this.$message.error('获取商品列表失败')
					}
				})
			},
			handleCurrentChange(val){
				this.pageInfo.pagenum = val
				this.getGoodsList()
			},
			searchGoods(){
				get('/goods',this.pageInfo).then(res=>{
					this.goodsList = res.data.goods
					this.total = res.data.total
					if(res.meta.status !== 200){
						this.$message.error('获取商品列表失败')
					}
					console.log(res);
				})
			},
			addGoods(){
				 this.$emit('change-page', addgoods);
			}
		},
		created(){
			this.getGoodsList()
		}

	}
</script>

<style scoped>
	.goods{
		width: 98%;
		height: 560px;
		background-color: white;
		margin-top: 10px;
		border-radius: 10px;
		box-shadow: -2px 5px 10px rgb(208,210,214);
		padding-top: 20px ;
		padding-left: 20px;
	}

</style>
