<template>
	<view class="addgoods">
		<el-steps :active="Number(active)" finish-status="success" style="width: 90%;margin-left: 5%; margin-top: 2%;">
		  <el-step title="基本信息"></el-step>
		  <el-step title="商品参数"></el-step>
		  <el-step title="商品属性"></el-step>
		  <el-step title="商品图片"></el-step>
		  <el-step title="商品内容"></el-step>
		  <el-step title="完成"></el-step>
		</el-steps>
		<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" class="demo-ruleForm" label-position="top">
			<el-tabs @tab-click="handleTabClick"  v-model="active" :tab-position="'left'" style="height: 400px; margin-top: 5%; margin-left: 4%;">
				<el-tab-pane label="基本信息" name="0">
					<scroll-view scroll-y="true" :show-scrollbar="true" style="height: 380px;">
						<el-form-item label="商品名称 :" prop="goods_name">
							<el-input v-model="addForm.goods_name"></el-input>
						</el-form-item>
						<el-form-item label="商品价格 :" prop="goods_price">
							<el-input v-model="addForm.goods_price"></el-input>
						</el-form-item>
						<el-form-item label="商品数量 :" prop="goods_number">
							<el-input v-model="addForm.goods_number"></el-input>
						</el-form-item>
						<el-form-item label="商品重量 :" prop="goods_weight">
							<el-input v-model="addForm.goods_weight"></el-input>
						</el-form-item>
						<el-form-item label="商品分类 :" prop="goods_cat">
							<el-cascader clearable :props="{ expandTrigger: 'hover',checkStrictly: true,value:'cat_id',label:'cat_name',children:'children'}" :options="categoriesList" v-model="addForm.goods_cat" @change="handleChange" placeholder="请选择商品分类"></el-cascader>
						</el-form-item>
					</scroll-view>
				</el-tab-pane>
				<el-tab-pane label="商品参数" name="1">
					<scroll-view scroll-y="true" :show-scrollbar="true" style="height: 380px;">
						<el-form >
							<el-form-item v-for="item in many" :key="item.attr_id" :label="item.attr_name">
								<el-checkbox-group v-model="item.attr_vals">
									<el-checkbox v-for="val in item.attr_vals" :key="val" :label="val" :border="true" ></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</el-form>
					</scroll-view>
				</el-tab-pane>
				<el-tab-pane label="商品属性" name="2">
					<scroll-view scroll-y="true" :show-scrollbar="true" style="height: 380px;">
						<el-form :model="only">
							<el-form-item v-for="item in only" :prop="item.attr_vals" :key="item.attr_id" :label="item.attr_name">
								<el-input v-model="item.attr_vals"></el-input>
							</el-form-item>
						</el-form>
					</scroll-view>
				</el-tab-pane>
				<el-tab-pane label="商品图片" name="3">
					
					<el-upload
					  class="upload-demo"
					  action="http://127.0.0.1:8000/api/private/v1/upload"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :headers="headersObj"
					  :on-success="onSuccess"
					  list-type="picture">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
					<el-dialog title="图片预览" :visible.sync="dialogVisible" >
						<img :src="previewPath" class="imgStyle"></img>
					</el-dialog>
					
					
				</el-tab-pane>
				<el-tab-pane label="商品内容" name="4">
					<view>
						<!-- <quill-editor v-model="addForm.goods_introduce"></quill-editor> -->
						  <vue-editor v-model="addForm.goods_introduce" style="width: 80%;"></vue-editor>
						  <el-button type="primary" style=" margin-top: 5px;" @click="addgood">添加商品</el-button>
					</view>
					
			
				</el-tab-pane>
			</el-tabs>
		</el-form>
	</view>
</template>

<script>
	
	import {get,post} from 'common/request.js'
	import { VueEditor } from "vue2-editor";
	import goods from 'pages/goods/goods.vue'
	export default{
		name:'addgoods',
		components: {
			VueEditor
		},
		data(){
			return{
				active:'0',
				categoriesList:[],
				addForm:{
					goods_name:1,
					goods_price:1,
					goods_number:1,
					goods_weight:1,
					goods_cat:[],
					pics:{},
					goods_introduce:'',
					attrs:[]
				},
				dialogVisible:false,
				headersObj:{
					
					Authorization: window.sessionStorage.getItem('token')
				},
				addFormRules:{
					goods_name:[
						{required:true,message:'请输入商品名称',trigger:'blur'}
					],
					goods_price:[
						{required:true,message:'请输入商品价格',trigger:'blur'}
					],
					goods_number:[
						{required:true,message:'请输入商品数量',trigger:'blur'}
					],
					goods_weight:[
						{required:true,message:'请输入商品重量',trigger:'blur'}
					],
					goods_cat:[
						{required:true,message:'请选择商品分类',trigger:'blur'}
					]
				},
				many:[],
				only:[],
				previewPath:''
			
				
			}
		},
		methods:{
			getCategories(){
				get('categories',{type:3}).then(res=>{
					this.categoriesList = res.data
				})
			},
			handleChange(val){
				if(this.addForm.goods_cat.length !== 3){
					this.addForm.goods_cat = []
				}
				
			},
			handleTabClick(tab){
		
				this.validateForm()
				  .then(async () => {
					this.active = tab.name; // 验证通过，允许切换标签页
					const id = this.addForm.goods_cat[2]
					// console.log(id);
					const many = await get(`categories/${id}/attributes`,{
						sel:'many'
					})
					const only = await get(`categories/${id}/attributes`,{
						sel:'only'
					})
					many.data.forEach(item=>{
						item.attr_vals =  item.attr_vals.length === 0 ? [] : item.attr_vals.split(',')
					})
					
					
					this.many = many.data
					this.only = only.data
					
					// console.log(this.many);
					// console.log(this.only);
					// this.only = only.data

					
				  })
				  .catch((error) => {
					// 处理验证失败的情况
					this.$message.error('请填写表单信息'); // 使用你自己的提示方法
					this.active = '0'
				
				  });
				
				
			},
			validateForm() {
			    return new Promise((resolve, reject) => {
			      this.$refs.addFormRef.validate((valid) => {
			        if (valid) {
			          resolve();
			        } else {
			          reject(new Error('Validation failed'));
			        }
			      });
			    });
			},
			handlePreview(file){
				this.previewPath = file.response.data.url
				this.dialogVisible = true
				// console.log(this.previewPath);
				// console.log(file)
				
			},
			handleRemove(file){
				const res = file.response.data.tmp_path
				this.addForm.pics.pop({
					pic:res
				})
				// console.log(this.addForm);
				// console.log(file);
			},
			onSuccess(response){
				console.log(response);
				this.addForm.pics.push({
					pic:response.data.tmp_path
					})
					// console.log(this.addForm.pics);
					// console.log(this.addForm);
				
			},
			async addgood(){
			
				this.many.forEach(item =>{
					var newInfo = {
						attr_id:item.attr_id,
						attr_value:item.attr_vals.join(' ')
					}
					this.addForm.attrs.push(newInfo)
				})
				this.only.forEach(item =>{
					var newInfo = {
						attr_id:item.attr_id,
						attr_value:item.attr_vals
					}
					this.addForm.attrs.push(newInfo)
				})
				
				//深拷贝是拷贝父类和子类，浅拷贝是拷贝父类，深拷贝是与拷贝内容相同但互不影响，可以使用JSON.parse(JSON.stringify(obj))或者lodash的_.cloneDeep(obj)来实现深拷贝
				//或者let form = Object.assign({},this.addForm)浅拷贝这是，let form = {...form}扩展运算符,实现深拷贝，或者使用原生deepcopy ，使用递归将数组依次赋值到另一个变量
				//var newArray = $.extend(true,[],array); // true为深拷贝，false为浅拷贝，这是jquery的extend方法
				var deep = _.cloneDeep(this.addForm);
				deep.goods_cat = deep.goods_cat.join(',')
				
				console.log(deep);
				const res = await post('goods',{
					...deep
				})
				if(res.meta.status !== 201){
					this.$message.error(res.meta.msg)
				}
				this.$message.success('添加成功')
				console.log(res);
				 this.$emit('change-page', goods);
			
			}
			
			
		
		},
		created(){
			this.getCategories()
		}
		
	}
</script>

<style scoped>
	@import 'quill/dist/quill.snow.css';
	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}

	
	.addgoods{
		width: 98%;
		height: 560px;
		background-color: white;
		margin-top: 10px;
		border-radius: 10px;
		box-shadow: -2px 5px 10px rgb(208,210,214);
		padding-top: 20px ;
		padding-left: 20px;
	}
	.el-tab-pane{
		font-size: 17px;
	}
	.el-input{
		width: 70%;
	}
	.el-checkbox{
		margin: 0 5px !important;
		position: inherit;
	}
	.imgStyle{
		width: 100%;
		height: 80%;
	}
	.ql-editor{
		width: 90%;
		height: 360px;
	}
	
</style>