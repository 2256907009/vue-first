<template>
	<view class="orders">
		<el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" style="width: 30%;margin-top: 10px;margin-left: 10px;">
		    <el-button slot="append" icon="el-icon-search"></el-button>
		  </el-input>
		<scroll-view scroll-y="true" :show-scrollbar="true" style="height: 450px;margin-top: 10px;margin-bottom: 10px;">
			<el-table :data="orderList" stripe border>
				<el-table-column label="#" type="index"></el-table-column>
				<el-table-column label="订单编号" prop="order_number"></el-table-column>
				<el-table-column label="订单价格" prop="order_price"></el-table-column>
				<el-table-column label="是否付款" prop="pay_status">
					<template slot-scope="scope">
						<el-tag type="success" v-if="scope.row.pay_status === 1">已付款</el-tag>
						<el-tag type="danger" v-else>未付款</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="是否发货" prop="is_send"></el-table-column>
				<el-table-column label="订单时间" prop="create_time"></el-table-column>
				<el-table-column label="操作">
					<template v-slot="scope">
						<el-tooltip class="item" effect="dark" content="修改地址" placement="top" :enterable="false"><el-button type="primary" @click="editOrders(scope)">编辑</el-button></el-tooltip>
						<el-dialog title="修改地址"  :visible.sync="orderVisible" @close="addressFormClose">
							<view class="editOrder">
								<el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef " label-width="100px">
									<el-form-item label="省市区/县" prop="address1">
										<el-cascader :options="cityData" v-model="addressForm.address1" :props="{checkStrictly : true,expandTrigger: 'hover'}" clearable></el-cascader>
									</el-form-item>
									<el-form-item label="详细地址" prop="address2">
										<el-input v-model="addressForm.address2" placeholder="请输入详细地址"></el-input>
									</el-form-item>
								</el-form>
							</view>
							
							<span slot="footer" class="dialog-footer">
								<el-button @click="orderVisible = false">取消</el-button>
								<el-button type="primary" @click="sure">确定</el-button>
							</span>
						</el-dialog>
						<el-button type="success" @click="look">物流信息</el-button>
						<el-dialog title="查看物流信息" :visible.sync="lookVisible">
							<el-timeline>
								<el-timeline-item v-for="item in data" :key="item.ftime" :timestamp="item.ftime">
									<p>{{item.context}}</p>
								</el-timeline-item>
							</el-timeline>
							<span slot="footer" class="dialog-footer">
								<el-button @click="lookVisible = false">取消</el-button>
								<el-button type="primary" @click="lookVisible = false">确定</el-button>
							</span>
						</el-dialog>
					</template>
				</el-table-column>
				
			</el-table>
		</scroll-view>
		<el-pagination @current-change="pageChange" :current-page="queryInfo.pagenum" layout="total, prev, pager, next, jumper" :total="total">
			
		</el-pagination>
	
	</view>
</template>

<script>
	import cityData from 'common/city_data2017_element.js'
 	import dayjs from 'dayjs'
	import {get} from 'common/request.js'
	export default {
		name:'orders',
		data() {
			return {
				orderList:[],
				queryInfo:{
					query:'',
					pagenum : 1,
					pagesize : 10
				},
				total: 0,
				orderVisible: false,
				addressForm:{
					address1:[],
					address2:''
				},
				addressFormRules:{
					address1:[
						{required:true,message:'请输入省市区/县',trigger:'blur'}
					],
					address2:[
						{required:true,message:'请输入详细地址',trigger:'blur'},
					]
				},
				cityData: cityData,
				lookVisible:false,
				data:[
					{
					  "time": "2018-05-10 09:39:00",
					  "ftime": "2018-05-10 09:39:00",
					  "context": "已签收,感谢使用顺丰,期待再次为您服务",
					  "location": ""
					},
					{
					  "time": "2018-05-10 08:23:00",
					  "ftime": "2018-05-10 08:23:00",
					  "context": "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
					  "location": ""
					},
					{
					  "time": "2018-05-10 07:32:00",
					  "ftime": "2018-05-10 07:32:00",
					  "context": "快件到达 [北京海淀育新小区营业点]",
					  "location": ""
					},
					{
					  "time": "2018-05-10 02:03:00",
					  "ftime": "2018-05-10 02:03:00",
					  "context": "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
					  "location": ""
					},
					{
					  "time": "2018-05-09 23:05:00",
					  "ftime": "2018-05-09 23:05:00",
					  "context": "快件到达 [北京顺义集散中心]",
					  "location": ""
					},
					{
					  "time": "2018-05-09 21:21:00",
					  "ftime": "2018-05-09 21:21:00",
					  "context": "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
					  "location": ""
					},
					{
					  "time": "2018-05-09 13:07:00",
					  "ftime": "2018-05-09 13:07:00",
					  "context": "顺丰速运 已收取快件",
					  "location": ""
					},
					{
					  "time": "2018-05-09 12:25:03",
					  "ftime": "2018-05-09 12:25:03",
					  "context": "卖家发货",
					  "location": ""
					},
					{
					  "time": "2018-05-09 12:22:24",
					  "ftime": "2018-05-09 12:22:24",
					  "context": "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
					  "location": ""
					},
					{
					  "time": "2018-05-08 21:36:04",
					  "ftime": "2018-05-08 21:36:04",
					  "context": "商品已经下单",
					  "location": ""
					},
				]
				
			}
		},
		methods: {
			editOrders(scope){
				console.log(scope);
				console.log(this.orderList);
				this.orderVisible = true
			},
			async getOrderList(){
				console.log(111);
				const res = await get('/orders',this.queryInfo)
				if(res.meta.status !== 200){
					this.$message.error('获取订单失败')
				}
				this.orderList = res.data.goods
				this.total = res.data.total
				this.orderList = this.orderList.map(item =>({
					...item,
					create_time:dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss')
				}))
				console.log(res);
			
			},
			addressFormClose(){
				this.addressForm.address1= [],
				this.addressForm.address2 = ''
			
			},
			sure(){
				this.orderVisible = false
			},
			pageChange(val){
				this.queryInfo.pagenum = val
				// console.log(val);
				this.getOrderList()
			},
			look(){
				this.lookVisible = true
				
			}
			
			
		},
		created(){
			this.getOrderList()
			console.log(this.cityData);
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
