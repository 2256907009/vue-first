<template>
	<view class="users">

		<view class="users-top">			
			<el-input class="inline-input" v-model="queryInfo.query"  placeholder="请输入内容" clearable><el-button icon="el-icon-search" slot="append" @click="getUserList"></el-button></el-input>		
			<el-button type="primary" @click="dialogVisible = true">添加用户</el-button>	
			<el-dialog title="添加用户" :visible.sync="dialogVisible" @close="addDialogClose">
				<view class="addUsers">
					<el-form label-position="right" label-width="80px" :model="addUserForm" ref="addUserFromRefs" :rules="addFromRules">
						<el-form-item label="用户名" prop="username">
							<el-input v-model="addUserForm.username" class="input-item"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input v-model="addUserForm.password" class="input-item"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="addUserForm.email" class="input-item"></el-input>
						</el-form-item>
						<el-form-item label="手机" prop="mobile">
							<el-input v-model="addUserForm.mobile" class="input-item"></el-input>
						</el-form-item>
					</el-form>
				</view>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="addUser">确定</el-button>
				</span>
			</el-dialog>
		</view>
		
		<view class="users-content">
			<el-table :data="users" stripe border>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column label="姓名" prop="username"></el-table-column>
				<el-table-column label="邮箱" prop="email"></el-table-column>	
				<el-table-column label="电话" prop="mobile"></el-table-column>
				<el-table-column label="角色" prop="role_name"></el-table-column>
				<el-table-column label="状态" prop="mg_state">
					<template v-slot="scope">						
						<el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
					</template>
				</el-table-column>						
				<el-table-column label="操作">
					<template v-slot="scope" >					
						<el-tooltip class="item" effect="dark" content="修改角色" placement="top-end" :enterable="false"><el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope)" class="button-item"></el-button></el-tooltip>
						<el-dialog title="修改用户" :visible.sync="editdialogVisible" @close="addDialogClose">
							<view class="editUsers">
								<el-form label-position="right" label-width="80px" :model="editUserForm" ref="addUserFromRefs" :rules="addFromRules">
									<el-form-item label="用户名">
										<el-input v-model="editUserForm.username" class="input-item" disabled></el-input>
									</el-form-item>
									<el-form-item label="邮箱" prop="email">
										<el-input v-model="editUserForm.email" class="input-item"></el-input>
									</el-form-item>
									<el-form-item label="手机" prop="mobile">
										<el-input v-model="editUserForm.mobile" class="input-item"></el-input>
									</el-form-item>
								</el-form>
							</view>
							<span slot="footer" class="dialog-footer">
								<el-button @click="editdialogVisible = false">取消</el-button>
								<el-button type="primary" @click="editUser()">确定</el-button>
							</span>
						</el-dialog>
												
						<el-tooltip class="item" effect="dark" content="删除角色" placement="top-end" :enterable="false">						
							<el-popconfirm title="确定删除这个用户吗" @confirm="deleteUser(scope.row.id)">
							<!-- 触发 Popconfirm 显示的 HTML 元素 -->
								<el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" class="button-item"></el-button>
							</el-popconfirm>					
						</el-tooltip>
							
						<el-tooltip class="item" effect="dark" content="分配角色" placement="top-end" :enterable="false"><el-button type="warning" icon="el-icon-setting" size="mini" class="button-item" @click="showAssignment(scope.row)"></el-button></el-tooltip>	
						<el-dialog title="分配角色" :visible.sync="assignmentVisible" v-if="scope.row.id ===assignmentRole.id">
							<el-form :model="assignmentRole">
								<el-form-item label="当前用户:">{{assignmentRole.username}}</el-form-item>
								<el-form-item label="当前角色:">{{assignmentRole.role_name}}</el-form-item>
								<el-form-item label="分配新的角色">
									<el-select v-model="selectedRoleId" placeholder="请选择新的角色">
										<el-option v-for="item in getRoleList" :label="item.roleName" :value="item.id" :key="item.id" ></el-option>
									</el-select>
								</el-form-item>		
							</el-form>
							<span slot="footer" class="dialog-footer">
								<el-button @click="assignmentVisible = false">取消</el-button>
								<el-button type="primary" @click="saveRole(scope.row), assignmentVisible = false">确定</el-button>
							</span>
						</el-dialog>
							
																	
					</template>
				</el-table-column>				
			</el-table>
		</view>
		
		<view class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagesize" :page-sizes="[1,2,5,7]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="total">				
			
			</el-pagination>
		</view>

	</view>	
</template>

<script>
	import {get,put,post,del} from 'common/request.js'
	
	export default {
		name:'users',
		data() {
			//验证邮箱的规则
			var checkEmail = (rule,value,cb) =>{
				const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
				if(regEmail.test(value)){
					return cb()
				}
				cb(new Error('邮箱格式不对'))
				
			} 
			var checkMobile = (rule,value,cb) =>{
				const regMobile =  /^1[3456789]\d{9}$/
				if(regMobile.test(value)){
					return cb()
				}
				cb(new Error('手机号格式不对'))
			}
			return {
				users:[],
				status:'',
				total: 0,
				queryInfo:{
					query:'',
					pagenum: 1,
					pagesize: 1
				},
				dialogVisible:false,
				editdialogVisible:false,
				assignmentVisible:false,
				addUserForm:{
					username:'',
					password:'',
					email:'',
					mobile:''
				},
				editUserForm:{
					id:'',
					email:'',
					mobile:''
				},
				selectedRoleId:'',
				assignmentRole:[],
				addFromRules:{
					username:[
						{required:true,message:'请输入用户名称',trigger:'blur'},
						{min:3,max:10,message:'用户名在3~10个字符之间',trigger:'blur'}
					],
					password:[
						{required:true,message:'请输入密码',trigger:'blur'},
						{min:6,max:15,message:'密码在6-15个字符之间',trigger:'blur'}
					],
					email:[
						{required:true,message:'请输入邮箱',trigger:'blur'},
						{validator:checkEmail,trigger:'blur'}
					],
					mobile:[
						{required:true,message:'请输入手机号',trigger:'blur'},
						{validator: checkMobile,trigger:'blur'}
					]
				},
				getRoleList:[]
			}
		},
		methods: {	
			async saveRole(row){
				console.log(row);
				if(!this.selectedRoleId){
					return this.$message.error('请选择要分配的角色')
				}
				const res = await put(`users/${row.id}/role`,{
					rid:this.selectedRoleId
				})
				console.log(res);
				this.getUserList()
				assignmentVisible = false
			},  
			async getUserList(){
				const res = await get('/users',this.queryInfo)
				if(res.meta.status !== 200){
					this.$message.error(res.meta.msg);
				}
				this.users = res.data.users
				this.total = res.data.total		
			},
			//监听每页显示条数的改变
			handleSizeChange(val) {
				this.queryInfo.pagesize = val;
				this.getUserList()
			},
			//监听当前页码值改变
			handleCurrentChange(val) {
				this.queryInfo.pagenum = val;
				this.getUserList()
			},
			async userStateChanged(state){
				const res = await put(`/users/${state.id}/state/${state.mg_state}`)
				if(res.meta.status !== 200){
					console.log(res.meta.msg);
					state.mg_state = !state.mg_state;
					return this.$messgae.error('更新用户状态失败')
				}
				this.$message.success('更新用户成功')
			},
			addDialogClose(){
				this.$refs.addUserFromRefs.resetFields()
			},
			addUser(){
				this.$refs.addUserFromRefs.validate(async validate =>{
					if(validate){
						const res = await post('/users',this.addUserForm)
						this.$message.success('添加用户成功')
						console.log(res);
						this.getUserList()
						this.dialogVisible = false
					}
					if(res.meta.status !== 201){
						return this.$message.error('添加用户失败')
					}
					
				})
			},
			showEditDialog(scope){				
				this.editdialogVisible = true
				//与请求后端 id获取用户信息一致
				this.editUserForm = JSON.parse(JSON.stringify(scope.row))	
				console.log(this.editUserForm);
			},
			async editUser(){
				const id = this.editUserForm.id				
				const res = await put(`/users/${id}`,this.editUserForm)
				this.editdialogVisible = false
				if(res.meta.status !== 200){
					return this.$message.error('更新用户失败')
				}
				this.$message.success('更新用户成功')
				this.getUserList()
				
			},
			async deleteUser(id){
				const res = await del(`/users/${id}`,id)
				if(res.meta.status!==200){
					return this.$message.error('删除用户失败')
				}
				this.$message.success('用户删除成功')
				this.getUserList()
				
			},
			async showAssignment(row){
				console.log(row);
				this.assignmentVisible = true
				this.assignmentRole = JSON.parse(JSON.stringify(row))
				console.log(this.assignmentRole);
				const res = await get('/roles')		
				this.getRoleList = res.data
			}
		},		
		created() {
			this.getUserList();
		}
	}
</script>

<style scoped>
	.users{		
		width: 97.5%;	
		/* height: 80vh; */
		background-color: white;
		margin-top: 10px;
		border-radius: 5px;
		box-shadow: -2px 5px 10px rgb(208,210,214);
		padding: 10px;
	}
	.users-top{
		display:inline;	
		margin: 20px;		
	}
	
	.inline-input{
		width: 30%;
		margin: 20px;
	}
	.block{
		margin: 20px;
		bottom : 0;
	}
	.input-item{
		width: 70%;
	}
	.addUsers{
		padding-left: 20%;		
	}
	.editUsers{
		padding-left: 20%;
		
	}
	.button-item{
		margin-left: 10px;
	}
	

</style>
