<template>
	<el-button @click="getDataDemo()">点击获取数据</el-button>
	<div style="margin-top: 70px;"></div>
	<el-row :gutter="20">
		<el-col :span="8">
			<div class="grid-content ep-bg-purple" id="demo" />
		</el-col>
		<el-col :span="8">
			<div class="grid-content ep-bg-purple" id="demo_2" />
		</el-col>
		<el-col :span="8">
			<div class="grid-content ep-bg-purple" id="demo_3" />
		</el-col>
		<el-col :span="8">
			<div class="grid-content ep-bg-purple" id="demo_4" />
		</el-col>
		<el-col :span="8">
			<div class="grid-content ep-bg-purple" id="demo_5" />
		</el-col>
		<el-col :span="8">
			<div class="grid-content ep-bg-purple" id="demo_6" />
		</el-col>
	</el-row>
</template>

<script>
	import * as echarts from 'echarts'
	import service from '../../service.js'
	export default {
		name: "Echarts_demo",
		data() {
			return {
				paperData: {}
			}
		},
		mounted() {
			this.echartsInit_1();
			this.echartsInit_2();
			this.echartsInit_3();
			this.echartsInit_4();
			this.echartsInit_5();
			this.echartsInit_6();
		},
		methods: {
			echartsInit_1() {
				var chartDom = document.getElementById('demo');
				var myChart = echarts.init(chartDom);
				var option;

				option = {
					tooltip: {
						trigger: 'item'
					},
					legend: {
						top: '5%',
						left: 'center'
					},
					series: [{
						name: 'Access From',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '20',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
								value: 1048,
								name: 'Search Engine'
							},
							{
								value: 735,
								name: 'Direct'
							},
							{
								value: 580,
								name: 'Email'
							},
							{
								value: 484,
								name: 'Union Ads'
							},
							{
								value: 300,
								name: 'Video Ads'
							}
						]
					}]
				};
				option && myChart.setOption(option);
			},
			echartsInit_2() {
				var chartDom = document.getElementById('demo_2');
				var myChart = echarts.init(chartDom);
				var option;

				option = {
					tooltip: {
						trigger: 'item'
					},
					legend: {
						top: '5%',
						left: 'center'
					},
					series: [{
						name: 'Access From',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '20',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
								value: 1048,
								name: 'Search Engine'
							},
							{
								value: 735,
								name: 'Direct'
							},
							{
								value: 580,
								name: 'Email'
							},
							{
								value: 484,
								name: 'Union Ads'
							},
							{
								value: 300,
								name: 'Video Ads'
							}
						]
					}]
				};
				option && myChart.setOption(option);
			},
			echartsInit_3() {
				var chartDom = document.getElementById('demo_3');
				var myChart = echarts.init(chartDom);
				var option;

				option = {
					tooltip: {
						trigger: 'item'
					},
					legend: {
						top: '5%',
						left: 'center'
					},
					series: [{
						name: 'Access From',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '20',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
								value: 1048,
								name: 'Search Engine'
							},
							{
								value: 735,
								name: 'Direct'
							},
							{
								value: 580,
								name: 'Email'
							},
							{
								value: 484,
								name: 'Union Ads'
							},
							{
								value: 300,
								name: 'Video Ads'
							}
						]
					}]
				};
				option && myChart.setOption(option);
			},
			echartsInit_4() {
				var chartDom = document.getElementById('demo_4');
				var myChart = echarts.init(chartDom);
				var option;

				option = {
					tooltip: {
						trigger: 'item'
					},
					legend: {
						top: '5%',
						left: 'center'
					},
					series: [{
						name: 'Access From',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '20',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
								value: 1048,
								name: 'Search Engine'
							},
							{
								value: 735,
								name: 'Direct'
							},
							{
								value: 580,
								name: 'Email'
							},
							{
								value: 484,
								name: 'Union Ads'
							},
							{
								value: 300,
								name: 'Video Ads'
							}
						]
					}]
				};
				option && myChart.setOption(option);
			},
			echartsInit_5() {
				var chartDom = document.getElementById('demo_5');
				var myChart = echarts.init(chartDom);
				var option;

				option = {
					tooltip: {
						trigger: 'item'
					},
					legend: {
						top: '5%',
						left: 'center'
					},
					series: [{
						name: 'Access From',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '20',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
								value: 1048,
								name: 'Search Engine'
							},
							{
								value: 735,
								name: 'Direct'
							},
							{
								value: 580,
								name: 'Email'
							},
							{
								value: 484,
								name: 'Union Ads'
							},
							{
								value: 300,
								name: 'Video Ads'
							}
						]
					}]
				};
				option && myChart.setOption(option);
			},
			echartsInit_6() {
				var chartDom = document.getElementById('demo_6');
				var myChart = echarts.init(chartDom);
				var option;

				option = {
					tooltip: {
						trigger: 'item'
					},
					legend: {
						top: '5%',
						left: 'center'
					},
					series: [{
						name: 'Access From',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '20',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
								value: 1048,
								name: 'Search Engine'
							},
							{
								value: 735,
								name: 'Direct'
							},
							{
								value: 580,
								name: 'Email'
							},
							{
								value: 484,
								name: 'Union Ads'
							},
							{
								value: 300,
								name: 'Video Ads'
							}
						]
					}]
				};
				option && myChart.setOption(option);
			},
			getDataDemo: function() {
				//请求示例
				service.send("/paper/getPapersAnalyze", {
						"id": 18,
					}, true).then((res) => {
						//请求成功
						console.log(res)
						if (res.code === 200) {
							this.paperData = res.data;
						} else {
							alert("wrong!!")
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
	}
</script>

<style scoped>
	.el-row {
		margin-bottom: 20px;
	}

	.el-row:last-child {
		margin-bottom: 0;
	}

	.el-col {
		border-radius: 4px;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 300px;
	}
</style>
