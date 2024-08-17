<template>
	<view class="roles">
		<el-button type="primary" class="roles-button" style="margin-buttom:10rpx" @click="DialogVisible = true">添加角色</el-button>
		<el-dialog title="添加角色" :visible.sync="DialogVisible" @close="empty">
			<view class="eddRoles-dialog">
				<el-form label-width="80px">
					<el-form-item label="角色名称" >
						<el-input placeholder="请输入角色名称" v-model="roleName" class="addName"></el-input>
					</el-form-item>
					<el-form-item label="角色描述" >
						<el-input type="textarea" placeholder="请输入角色描述" v-model="roleDesc" class="addDesc"></el-input>
					</el-form-item>
				</el-form>
			</view>
			<span slot="footer" class="dialog-footer">
				<el-button @click="DialogVisible = false">取消</el-button>
				<el-button @click="addRoles" type="primary">确定</el-button>
			</span>
		</el-dialog>
		<scroll-view scroll-y="true" style="width: 100%;height: 80%;margin-top: 10rpx;" class="scroll-hide-sc" :show-scrollbar="true">
			<el-table :data="rolesList" border stripe class="roles-table">
				<el-table-column type="expand">
					<template v-slot="scope" >
						<el-row v-for="(item,index) in scope.row.children" :key="item.id" :class="['role-bottom',index === 0?'role-top':'','vcenter']" >
							<!-- 布局分栏 -->
							<el-col :span="5">
								<el-tag :key="item.id" closable class="el-tag-style" :disable-transitions="false" @close="removeRoleById(scope.row,item.id)">{{item.authName}}</el-tag>
								<i class="el-icon-caret-right"></i>
							</el-col>
							<!-- 渲染二级和三级 -->
							<el-col :span="19">
								<!-- 通过for循环嵌套二级权限 -->
								<el-row v-for="(item1,index1) in item.children" :key="item1.id" :class="[index1 === 0 ? '' : 'role-top','vcenter']">
									<el-col :span="6">
										<el-tag :key="item1.id" closable type="success" :disable-transitions="false" @close="removeRoleById(scope.row,item1.id)">{{item1.authName}}</el-tag>
										<i class="el-icon-caret-right"></i>
									</el-col>
									<el-col :span="18">							
										<el-tag closable type="warning" v-for="(item2,index2) in item1.children" :disable-transitions="false" :key="item2.id" @close="removeRoleById(scope.row,item2.id)">{{ item2.authName}}</el-tag>								
									</el-col>												
								</el-row>								
							</el-col>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="roleName" label="角色名称"></el-table-column>
				<el-table-column prop="roleDesc" label="角色描述"></el-table-column>
				<el-table-column label="操作">
					<template v-slot="scope">
						<el-tooltip class="item" effect="dark" content="编辑角色" placement="top-end" :enterable="false"><el-button type="primary" icon="el-icon-edit" class="roles-item" @click="showDialogVisible(scope)"></el-button></el-tooltip>
						<el-dialog title="编辑角色" :visible.sync="editDialogVisible" @close="empty">
							<view class="editRoles">
								<el-form label-position="right" label-width="80px" :model="editRoleForm">
									<el-form-item label="角色名称">
										<el-input placeholder="请修改角色名称" v-model="editRoleForm.roleName"></el-input>
									</el-form-item>
									<el-form-item label="角色描述">
										<el-input type="textarea" placeholder="请修改角色描述" v-model="editRoleForm.roleDesc"></el-input>
								
									</el-form-item>
								</el-form>
							</view>
							<span slot="footer" class="dialog-footer">
								<el-button @click="editDialogVisible = false">取消</el-button>
								<el-button @click="editRole()" type="primary">确定</el-button>
							</span>
				
						</el-dialog>
						<el-tooltip class="item" effect="dark" content="删除角色" placement="top-end" :enterable="false">
							<el-popconfirm title="确定删除这个角色吗？" @confirm="deleteRole(scope.row)">
								<el-button type="danger" icon="el-icon-delete" class="roles-item" slot="reference"></el-button>
							</el-popconfirm>	
						</el-tooltip>							
						<el-tooltip class="item" effect="dark" content="分配权限" placement="top-end" :enterable="false"><el-button type="warning" icon="el-icon-setting" class="roles-item" @click="assignPermission(scope.row)"></el-button></el-tooltip>
						<el-dialog title="分配权限" :visible.sync="assiginVisible" @close="empty">
							<el-tree :data="rightsList" :props="treeProps" ref="treeRef" show-checkbox node-key="id" default-expand-all :default-checked-keys="leafKeys"></el-tree>
							<span slot="footer" class="dialog-footer">
								<el-button @click="assiginVisible = false">取消</el-button>
								<el-button @click="allotRights" type="primary">确定</el-button>
							</span>
						</el-dialog>
					</template>
				</el-table-column>		
			</el-table>
		</scroll-view>
	</view>
</template>

<script>
	import { get,del,post,put } from 'common/request.js'
	export default {
		name:'roles',
		data() {
			return {
				rolesList:[],
				editDialogVisible:false,
				DialogVisible:false,
				assiginVisible:false,
				rightsList:[],
				treeProps: {
				  children: 'children',
				  label: 'authName'
				},
				leafKeys:[],
				roleId:'',
				roleById:'',
				roleName:'',
				roleDesc:'',
				editRoleForm:{
					roleName:'',
					roleDesc:'',
					id:''
				}
			}
		},
		methods: {
			async getRolesList(){
				const res = await get('/roles')
				this.rolesList = res.data
				if(res.meta.status !== 200){
					return this.$message.error('获取角色列表失败')
				}			
				
			},
			showDialogVisible(scope){
				this.editDialogVisible = true
				this.editRoleForm = JSON.parse(JSON.stringify(scope.row))
				console.log(this.editRoleForm);
				
		
			},
			async removeRoleById(row,id){
				const confirmResult =await this.$confirm('此操作将永久删除该文件，是否继续？','提示',{
					confirmButtonTest:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).catch(err=>err)
				console.log(confirmResult);
				if(confirmResult !== 'confirm'){
					return this.$message.info('已取消删除')
				}			
				const res = await del(`/roles/${row.id}/rights/${id}`)
				if(res.meta.status !== 200){
					return this.$message.error('删除权限失败')
				}
				//需要重新刷新以下
				// this.getRolesList()
				//相当于角色下管理的商品权限将值重新付给插槽
				row.children = res.data
			},
			async addRoles(){
				this.DialogVisible = false
				const res = await post('/roles',{
					roleName:this.roleName,
					roleDesc:this.roleDesc
				})				
				console.log(res);
				this.getRolesList();
				
				
			},
			async assignPermission(scope){
				this.roleId = scope.id
				const res = await get('/rights/tree')
				this.rightsList = res.data		
				if(res.meta.status!== 200){
					this.$message.error('获取权限失败')		
				}
				console.log(this.leafKeys);
				this.getLeafKeys(scope,this.leafKeys)				
				this.assiginVisible = true
				
			},
			//通过递归将三级节点的id存入leafkeys数组中
			getLeafKeys(node,arr){
				if(!node.children){
					arr.push(node.id)
				}else{
					node.children.forEach(item=>{
						this.getLeafKeys(item,arr)
					})
				}
				
			},
			empty(){
				this.leafKeys = []	
				this.roleName = ''
				this.roleDesc = ''
			},
			async allotRights(){
				const keys = [
					this.$refs.treeRef.getCheckedKeys(),
					this.$refs.treeRef.getHalfCheckedKeys()
				]
				const idStr = keys.join(',')
				const res = await post(`/roles/${this.roleId}/rights`,{rids:idStr})
				console.log(res);
				if(res.meta.status!== 200){
					this.$message.error('分配权限失败')
				}
				this.$message.success('分配权限成功')	
				this.getRolesList()
				this.assiginVisible = false
			},
			async deleteRole(row){
				this.roleById = row.id
				const res = await del(`/roles/${this.roleById}`)
				console.log(res);
				if(res.meta.status!==200){
					this.$message.error('删除角色失败')
				}
				this.$message.success('删除角色成功')
				this.getRolesList()
			},
			async editRole(){
				const id = this.editRoleForm.id
				const res = await put(`roles/${id}`,{
					roleName:this.editRoleForm.roleName,
					roleDesc:this.editRoleForm.roleDesc
				})
				console.log(res);
				if(res.meta.status!==200){
					this.$message.error('修改角色失败')
				}
				this.$message.success('修改角色成功')
				this.getRolesList()
				this.editDialogVisible = false
			
			}
			
		},
		created() {
			this.getRolesList()
		}
	}
</script>

<style scoped>
	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}

	.el-tag{
		margin-top: 10px;
		margin-bottom: 10px;
		margin-left: 10px;
	}
	.roles{
		width: 100%;		
		height: 590px;
		background-color: white;
		margin-top: 10px;
		border-radius: 5px;
		box-shadow: -2px 5px 10px rgb(208,210,214);
		padding: 20rpx;
		box-sizing: border-box;
	}
	.roles-button{
		margin-top: 20px;
		margin-left: 20px;
	}
	.roles-table{
		width: 97%;	
		margin-top: 10px;
		margin-left: 20px;
	}
	.roles-item{
		width: 30%;
		margin-left: 10px;
	}
	.role-top{
		border-top: 1px solid #eee;
	}
	.role-bottom{
		border-bottom: 1px solid #eee;
	}
	.vcenter{
		display: flex;
		align-items: center;
	}
	
	.addName{
		width: 70%;
		margin-left: 10%;
		margin-bottom: 10px;
	}
	
	.addDesc{
		width: 70%;
		margin-left: 10%;
		margin-bottom: 10px;
	}
</style>