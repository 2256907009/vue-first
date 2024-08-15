<template>
	<view class="categories">
		<el-button type="primary" class="button" @click="showAddcate">添加分类</el-button>
		<el-dialog title="添加分类" :visible.sync="cateVisible" @close="empty">
			<el-form label-width="20%" :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" >
				<el-form-item label="分类名称:" prop="cat_name">
					<el-input placeholder="请输入分类名称"  v-model="addCateForm.cat_name" style="width: 50%;"></el-input>
				</el-form-item>
				<el-form-item label="父级分类:">
					<el-cascader v-model="parentCate" :options="parentCateList" :props="{ expandTrigger: 'hover',checkStrictly: true,value:'cat_id',label:'cat_name',children:'children' }" 
						clearable
						@change="parentCateChange"
						ref="cascaderRef"
						></el-cascader>
				</el-form-item>			
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cateVisible = false">取消</el-button>
				<el-button type="primary" @click="addcategories">确定</el-button>
			</span>		
		</el-dialog>
		<scroll-view scroll-y="true" style="width: 100%;height: 80%;margin-top: 10rpx;" >
			<tree-table :data="categoriesList" :columns="columns" show-index :selection-type="false" :expand-type="false" border>
				<template slot="isok" slot-scope="scope">
					<i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen;"></i>
					<i class="el-icon-error" v-else style="color: red;"></i>
				</template>
				<template slot="order" slot-scope="scope">
					<el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
					<el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
					<el-tag type="warning" v-else>三级</el-tag>				
				</template>
				<template slot="operate" slot-scope="scope">
					<el-tooltip class="item" effect="dark" content="编辑" placement="top-end" :enterable="false"><el-button type="primary" @click="showEditCate(scope)"><i class="el-icon-edit">编辑</i></el-button></el-tooltip>
						<el-dialog title="修改分类" :visible.sync="editCateVisible" v-if="scope.row.cat_id === editCateList.cat_id">
							<el-form label-width="100px" :model="editCateList" :rules="editCateFormRules" ref="editCateFormRef">
								<el-form-item label="分类名称:" prop="cat_name">
									<el-input style="width: 60%; text-align: center;" v-model="editCateList.cat_name"></el-input>
								</el-form-item>
							</el-form>
							<span slot="footer" class="dialog-footer">
								<el-button @click="editCateVisible = false">取消</el-button>
								<el-button type="primary" @click="editCategories(editCateList.cat_name)">确定</el-button>
							</span>
						</el-dialog>		
					<el-tooltip class="item" effect="dark" content="删除" placement="top-end" :enterable="false">
						<el-popconfirm title="确定删除该分类吗" @confirm="delCate(scope.row.cat_id)">
							<el-button slot="reference" type="danger"><i class="el-icon-delete">删除</i></el-button>
						</el-popconfirm>
					</el-tooltip>								
						
				
				
				</template>
			</tree-table>
		</scroll-view>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pagenum" :total="total" :page-size="pageInfo.pagesize" layout="total, prev, pager, next, jumper"></el-pagination>
	</view>
</template>

<script>
	
	import {get,post,put,del} from "common/request.js"
	export default {
		name: "categories",
		data() {
			return {
				cateVisible:false,
				categoriesList:[],
				editCateList:[],
				pageInfo:{
					type:3,
					pagenum:1,
					pagesize:5
				},
				addCateForm:{
					cat_pid:0,
					cat_name:'',
					cat_level:0
				},	
				editCateFormRules:{
					cat_name:[
						{required:true,message:'请输入分类名称',trigger:'blur'}
					]
				},
				editCateVisible: false,
				addCateFormRules:{
					cat_name:[
						{required:true,message:'请输入分类名称',trigger:'blur'}
					]
				},
				parentCate:'',
				columns:[					
					{
						label:'分类名称',
						prop:'cat_name'
					},
					{
						label:'是否有效',
						type:'template',
						template:'isok'
					},
					{
						label:'排序',
						type:'template',
						template:'order'
					},
					{
						label:'操作',				
						type:'template',
						template:'operate'
					}
				],
				parentCateList:[],
				total:0,
				catName:''
			}
		},
		methods: {
			async getCategoriesList(){
				const res = await get('/categories',this.pageInfo)	
				if(res.meta.status !== 200){
					return this.$message.error('获取分类列表失败')
				}			
				this.total = res.data.total
				this.categoriesList = res.data.result
			},
			showAddcate(){
				this.getParentCateList()
				this.cateVisible = true
			},
			handleSizeChange(newSize){
				this.pageInfo.pagesize = newSize
				this.getCategoriesList()
			},
			handleCurrentChange(newPage){
				this.pageInfo.pagenum = newPage
				this.getCategoriesList()
			},
			editCategories(name){
				const id = this.editCateList.cat_id
				this.catName = name
				this.$refs.editCateFormRef.validate(async validated=>{
					if(validated){
						const res = await put(`categories/${id}`,{
							cat_name:this.catName
						})
						if(res.meta.status !== 200){
							this.$message.error('修改分类失败')
						}
						this.$message.success('修改分类成功')
						this.editCateVisible = false
						this.getCategoriesList()
					}
				})
			},
			async delCate(id){
				const res = await del(`categories/${id}`)
				console.log(res);
				if(res.meta.status !== 200){
					this.$message.error('删除分类失败')
				}
				this.$message.success('删除分类成功')
				this.getCategoriesList()
			},
			addcategories(){
				this.$refs.addCateFormRef.validate(async validate =>{
					if(validate){
						const res = await post(`/categories`,this.addCateForm)
						this.cateVisible = false
						this.getCategoriesList()
						if(res.meta.status !== 201){
							this.$message.error('添加商品分类失败')
						}
						this.$message.success('添加商品分类成功')
					}
				})
			},
			showEditCate(scope){
				this.editCateList = JSON.parse(JSON.stringify(scope.row))
				this.editCateVisible = true
			},
			async getParentCateList(){
				const res = await get('/categories',{
					type:2
				})
				if(res.meta.status!== 200){
					this.$message.error('获取父级分类失败')
				}
				this.parentCateList = res.data
			},
			parentCateChange(){
				if(this.parentCate.length === 0){
					this.addCateForm.cat_level = 0
					this.addCateForm.cat_pid = 0
				}else if(this.parentCate.length === 1){
					this.addCateForm.cat_level = 1
					this.addCateForm.cat_pid = this.parentCate[0]
				}else if(this.parentCate.length === 2){
					this.addCateForm.cat_level = 2
					this.addCateForm.cat_pid = this.parentCate[1]
				}
			},
			empty(){
				this.$refs.cascaderRef.checkedValue = ""
				this.addCateForm.cat_level = 0
				this.addCateForm.cat_pid = 0
				this.addCateForm.cat_name = ''
			}
		},
		created(){
			this.getCategoriesList()
		}
		
	}
</script>

<style scoped>
	
	.item{
		margin-right: 10px;
	}
	.el-cascader{
		width: 50%;
	}
	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}
	
	.button{
		margin: 10px 10px;
		
	}
	.categories{
		width: 98%;		
		height: 560px;
		background-color: white;
		margin-top: 10px;
		border-radius: 10px;
		box-shadow: -2px 5px 10px rgb(208,210,214);
		padding: 10px ;
	}

</style>
