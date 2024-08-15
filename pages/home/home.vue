<template>
	<view class="container">
		<el-container>
			
			<el-header>
				<view class="header-main">
					<el-image src='/static/appLogo.png' style="width: 50px; height: 50px"></el-image>
					<span style="color: white;">电商后台管理系统</span>		
				</view>				
				<el-button type="primary" @click="back" size="mini">返回</el-button>
			</el-header>
			<el-container>
				<el-aside background-color="#333744" style="width: 210px;">
					<view class="collapse-button" :collapse="isCollapse" @click="iscollapse" :style="{width:isCollapse? '64px' : '200px' }">
						|||
					</view>
					
					<el-menu :collapse-transition="false" unique-opened background-color="#333744" text-color="#fff" active-text-color="#409EFF" class="el-menu-vertical-demo" :collapse="isCollapse">						
						<el-submenu :index="item.id.toString()" v-for="item in menuList" :key="item.id">
							<template slot="title">
								<i class="el-icon-user-solid"></i>
								<span slot="title">{{item.authName}}</span>
							</template>
							<el-menu-item :index="i.id.toString()" v-for="i in item.children" :key="i.id" @click="changePath(i.path,i.id)">
								<span slot="title">{{i.authName}}</span>
							</el-menu-item>										
						</el-submenu>					
					</el-menu>
				</el-aside>
				
				<el-main >
					<!-- //如何实现动态面包屑 -->					
					<el-breadcrumb separator="/">
						<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{ item.authName }}</el-breadcrumb-item>					
					</el-breadcrumb>
					<main-content :pagePath="currentPagePath"></main-content>
				</el-main>	
			</el-container>			
		</el-container>	
	</view>
</template>

<script>
	import {get} from 'common/request.js'
	import mainContent from 'components/mainContent.vue';
	export default {
		name:'home',
		data() {
			return {
				isCollapse: false,
				menuList:[],
				currentPagePath:'',				
				realPath:'',
				breadcrumb:[]		
			}
		},
		components:{
			 mainContent
		},
		methods: {
			back(){
				window.sessionStorage.removeItem('token');	
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			async getMenuList(){
				const res = await get('/menus')
				if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
				
				this.menuList = res.data;				
				console.log(this.menuList);
			},
			iscollapse(){
				this.isCollapse = !this.isCollapse;
			},
			changePath(path,id){
				//这里的path已经是二级目录下的path了
				this.realPath = '/' + path;		
				this.currentPagePath = this.realPath;
				this.updatebreadcrumb(id);
				
				
			},
			updatebreadcrumb(id){
				// 根据当前路径更新面包屑
				  const breadcrumb = [];
				  // 遍历菜单列表找到对应路径的菜单项，支持多级菜单
				  this.findBreadcrumb(this.menuList, id, breadcrumb);
				  this.breadcrumb = breadcrumb;
			},
			findBreadcrumb(menuList, id, breadcrumb) {
			  for (let i = 0; i < menuList.length; i++) {
				const menu = menuList[i];
				if (menu.id === id) {
				  breadcrumb.push(menu);
				  return true;
				}
				//通过查找是否还有子类，若有进行判度胺
				if (menu.children && this.findBreadcrumb(menu.children, id, breadcrumb)) {
					//有子类，那就将父类提前
				  breadcrumb.unshift(menu);
				  return true;
				}
			  }
			  return false;
			  
			  //如果有多级，可以通过reverse()进行翻转，应为他是以父级为最末尾，依次往前是减一级因为像这样子集相当于是先添加的，父级最后添加
			  // console.log(breadcrumb.map(item => item.name).reverse());
			}
			
		},
		created() {
			//检查是否带有Session
			const token = window.sessionStorage.getItem('token')			
			if(!token){
				this.$router.push('/pages/login/login')
			}else{
				console.log('存在token，以登录过');
			}
			//需要通过请求头中的token去获取左侧菜单栏权限
			this.getMenuList();			
		}						
	}
</script>

<style scoped>
	.container{
		background-color: rgb(233,237,240);
	/* 	position: fixed; */
	}
	.header-main{
		display: flex;
		align-items: center;
		font-size: 20px;
	}	
	.el-header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: rgb(53,60,62);
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
	    width: 200px;
	    min-height: 620px;
		
	}
	.collapse-button{
		text-align: center;
		background-color: rgb(64,73,88);
		font-size: 15px;
		cursor: pointer;
		color: white;
		width: 200px;
		
	}



</style>
