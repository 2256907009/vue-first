<template>
	<view class="reports">
		111
		<view id="chart" style="width:100%;height:100%;"></view>
	</view>
</template>

<script>
	const echarts = require('echarts')
	import {get} from 'common/request.js'
	export default {
		name:'reports',
		data() {
			return {
				chart: null,
				newOption:{},
				options: {
					title: {
					  text: '用户来源'
					},
					tooltip: {
					  trigger: 'axis',
					  axisPointer: {
						type: 'cross',
						label: {
						  backgroundColor: '#E9EEF3'
						}
					  }
					},
					grid: {
					  left: '3%',
					  right: '4%',
					  bottom: '3%',
					  containLabel: true
					},
					xAxis: [
					  {
						boundaryGap: false
					  }
					],
					yAxis: [
					  {
						type: 'value'
					  }
					]
				}
			}
		},
		async mounted () { 
			const res = await get('/reports/type/1')
			console.log(res);
			//或者使用_.merge
			const result = {...this.option,...res.data}
			console.log(result);
			
			var myChart = echarts.init(document.getElementById('chart'))
						
			
			myChart.setOption(result)
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.reports{
		width: 98%;
		height: 560px;
		background-color: white;
		margin-top: 10px;
		border-radius: 10px;
		box-shadow: -2px 5px 10px rgb(208,210,214);
		padding: 10px ;
	}
</style>
