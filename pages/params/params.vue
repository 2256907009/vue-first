<template>
	<view class="params">
		 <el-alert title="注意:只允许为第三级分类设置相关参数" type="warning" :closable="false" show-icon></el-alert>
		 <el-form label-width="120px" style="margin-top: 10px;">
			 <el-form-item label="选择商品分类 :">
				  <el-cascader style="width: 300px;"
				     v-model="param"
				     :options="params"
				     :props="{ expandTrigger: 'hover' ,value:'cat_id',label:'cat_name',children:'children' }"
				     @change="handleChange"></el-cascader>
			 </el-form-item>
		 </el-form>
		 <el-tabs v-model="activeName" >
		     <el-tab-pane label="动态参数" name="first">
				<el-button type="primary" size="medium" @click="addParams">添加参数</el-button>
				<el-dialog title="添加参数" :visible.sync="addParamsVisible" @close="empty">
					<el-form label-width="100px" :model="addAttr" :rules="addAttrRules" ref="addAttrRef" >
						<el-form-item label="参数名称 :" prop="attr_name">
							<el-input placeholder="请设置参数名称" v-model="addAttr.attr_name" style="width: 70%;"></el-input>
						</el-form-item>
						<el-form-item label="设置参数 :" prop="attr_sel">
							<el-select v-model="addAttr.attr_sel" clearable>
								<el-option label="静态参数" value="only"></el-option>
								<el-option label="动态参数" value="many"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="动态参数值 :">
							<el-input placeholder="选择了动态参数可填" v-model="addAttr.attr_vals" style="width: 70%;"></el-input>
						</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
						<el-button @click="addParamsVisible = false">取消</el-button>
						<el-button type="primary" @click="addAttrSure">确定</el-button>
						
					</span>
				</el-dialog>
				<scroll-view scroll-y="true" style="height: 360px;margin-top: 10rpx;" :show-scrollbar="true">
					<el-table :data="paramsManyList" border>
					<el-table-column type="expand"></el-table-column>
					<el-table-column type="index" label="#"></el-table-column>
					<el-table-column label="参数名称" prop="attr_name" ></el-table-column>
					<el-table-column label="操作">
						<template v-slot="scope">
							<el-tooltip content="编辑" effect="dark" placement="top-end" class="item" :enterable="false"><el-button type="primary" size="mini" icon="el-icon-edit" @click="editParams(scope)">编辑</el-button></el-tooltip>
							<el-dialog title="编辑参数" :visible.sync="editAttrVisible" >
								<el-form :model="editAttr" label-width="100px" :rules="editAttrRules" ref="editAttrRef">
									<el-form-item label="参数名称 :" prop="attr_name">
										<el-input v-model="editAttr.attr_name"></el-input>
									</el-form-item>
									<el-form-item label="参数类型 :" prop="attr_sel">
										<el-select v-model="editAttr.attr_sel" clearable>
											<el-option label="静态参数" value="only"></el-option>
											<el-option label="动态参数" value="many"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="动态参数值 :">
										<el-input v-model="editAttr.attr_vals"></el-input>
									</el-form-item>
								</el-form>
								<span slot="footer" class="dialog-footer">
									<el-button @click="editAttrVisible = false">取消</el-button>
									<el-button type="primary" @click="editAttrSure">确定</el-button>
								</span>
							</el-dialog>
							<el-tooltip content="删除" effect="dark" placement="top-end" class="item" :enterable="false">
								<el-popconfirm title="确定删除这个参数吗？" @confirm="deleteAttr(scope.row)">
									<el-button slot="reference" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
								</el-popconfirm>
							</el-tooltip>
						</template>
					</el-table-column>
				</el-table>
					
					
				</scroll-view>
				
			</el-tab-pane>
		    <el-tab-pane label="静态参数" name="second">
				<scroll-view scroll-y="true" style="height: 390px;margin-top: 10rpx;" :show-scrollbar="true">
					<el-table :data="paramsOnlyList" border>
					<el-table-column type="expand"></el-table-column>
					<el-table-column type="index" label="#"></el-table-column>
					<el-table-column label="参数名称" prop="attr_name" ></el-table-column>
					<el-table-column label="操作">
						<template v-slot="scope">
							<el-tooltip content="编辑" effect="dark" placement="top-end" class="item" :enterable="false"><el-button type="primary" size="mini" icon="el-icon-edit" @click="editParams(scope)">编辑</el-button></el-tooltip>
							<el-dialog title="编辑参数" :visible.sync="editAttrVisible" >
								<el-form :model="editAttr" label-width="100px" :rules="editAttrRules" ref="editAttrRef">
									<el-form-item label="参数名称 :" prop="attr_name">
										<el-input v-model="editAttr.attr_name"></el-input>
									</el-form-item>
									<el-form-item label="参数类型 :" prop="attr_sel">
										<el-select v-model="editAttr.attr_sel" clearable>
											<el-option label="静态参数" value="only"></el-option>
											<el-option label="动态参数" value="many"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="动态参数值 :">
										<el-input v-model="editAttr.attr_vals"></el-input>
									</el-form-item>
								</el-form>
								<span slot="footer" class="dialog-footer">
									<el-button @click="editAttrVisible = false">取消</el-button>
									<el-button type="primary" @click="editAttrSure">确定</el-button>
								</span>
							</el-dialog>
							<el-tooltip content="删除" effect="dark" placement="top-end" class="item" :enterable="false">
								<el-popconfirm title="确定删除这个参数吗？" @confirm="deleteAttr(scope.row)">
									<el-button slot="reference" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
								</el-popconfirm>
							</el-tooltip>
						</template>
					</el-table-column>
				</el-table>
				</scroll-view>
			</el-tab-pane>
		
		</el-tabs>
	</view>
</template>

<script>
	import {get,post,put,del} from 'common/request.js'
	export default {
		name:'params',
		data() {
			return {
				params:[],
				param:'',
				activeName:'first',
				paramsManyList:[],
				paramsOnlyList:[],
				addAttr:{
					attr_name:'',
					attr_sel:'',
					attr_vals:''
				},
				editAttr:{
					attr_name:'',
					attr_sel:'',
					attr_vals:'',
					attr_id:''
				},
				
				editAttrVisible: false,
				addParamsVisible:false,
				addAttrRules:{
					attr_name:[
						{required:true,message:'请输入参数名称',trigger:'blur'}
					],
					attr_sel:[
						{required:true,message:'请选择参数类型',trigger:'blur'}
					]
				},
				editAttrRules:{
					attr_name:[
						{required:true,message:'请输入参数名称',trigger:'blur'}
					],
					attr_sel:[
						{required:true,message:'请选择参数类型',trigger:'blur'}
					]
				},
			}
		},
		methods: {
			getCategories(){
				get('categories',{type:3}).then(res=>{
					this.params = res.data
				})
			},
			handleChange(){
				this.getParamsMany()
				this.getParamsOnly()
			},
			getParamsMany(){
				get('categories/'+this.param[this.param.length-1]+'/attributes',{sel:'many'}).then(res=>{
					this.paramsManyList = res.data
					console.log(this.paramsManyList);
				})
			},
			getParamsOnly(){
				get('categories/'+this.param[this.param.length-1]+'/attributes',{sel:'only'}).then(res=>{
					this.paramsOnlyList = res.data
					console.log(this.paramsOnlyList);
				})
			},
			editParams(scope){
				this.editAttr = JSON.parse(JSON.stringify(scope.row))
				this.editAttrVisible = true
			},
			addParams(){
				if(this.param.length === 3){
					this.addParamsVisible = true
				}else{
					this.$message.error('选择的商品分类不为第三级，请更改')
				}
			},
			addAttrSure(){
				this.$refs.addAttrRef.validate(async validate=>{
					if(validate){
						const id = this.param[2]
						const res = await post(`categories/${id}/attributes`,this.addAttr)
						console.log(res);
						if(res.meta.status !== 200){
							this.$message.error('添加参数失败')
						}
						this.$message.success('添加参数成功')
						this.getParamsMany()
						this.getParamsOnly()
						this.addParamsVisible = false
					}
				})
			},
			editAttrSure(){
				this.$refs.editAttrRef.validate(async validate=>{
					if(validate){
						const id = this.editAttr.cat_id
						console.log(id,this.editAttr.attr_id);
						console.log(this.editAttr);
						const res = await put(`categories/${id}/attributes/${this.editAttr.attr_id}`,{
							attr_name:this.editAttr.attr_name,
							attr_sel:this.editAttr.attr_sel,
							attr_vals:this.editAttr.attr_vals
						})
						console.log(res);
						if(res.meta.status !== 200){
							this.$message.error('编辑参数失败')
						}
						this.$message.success('编辑参数成功')
						this.getParamsMany()
						this.getParamsOnly()
						this.editAttrVisible = false
					}
				})
				
			},
			async deleteAttr(scope){
				console.log(scope);
				const res = await del(`categories/${scope.cat_id}/attributes/${scope.attr_id}`)
				console.log(res);
				if(res.meta.status !== 200){
					this.$message.error('删除参数失败')
				}
				this.$message.success('删除参数成功')
				this.getParamsMany()
				this.getParamsOnly()
				
				
				
			},
			empty(){
				this.$refs.addAttrRef.resetFields()
				this.addAttr.attr_vals = ''
			}
			
			
			
		},
		created(){
			this.getCategories()
			this.getParamsMany()
			this.getParamsOnly()
			
		}
	}
</script>

<style scoped>
	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}
	
	.params{
		width: 98%;
		height: 560px;
		background-color: white;
		margin-top: 10px;
		border-radius: 10px;
		box-shadow: -2px 5px 10px rgb(208,210,214);
		padding: 10px ;
	}
</style>
