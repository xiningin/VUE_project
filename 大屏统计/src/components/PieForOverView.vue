<template>
	<div :id="chartId" class="plotBox"></div>
</template>

<script>
	import * as echarts from 'echarts';

	export default {
		data() {
			return {
				pieColor: ['#67d6fa','#0d6bff'],
				chartId: 'pie_' + this.pieIndex,
				myChart: null,
				pieData: [],
			}
		},
		props: {
			pieName: String,
			pieIndex: String,
			papers: Array,
		},
		mounted() {
			console.log("papers", this.papers);
			this.matchPieData();
			this.pieInit();
		},
		methods: {
			pieInit: function() {
				var chartDom = document.getElementById(this.chartId);
				this.myChart = echarts.init(chartDom);
				var option;

				option = {
					title: {
						text: this.pieName,
						left: 'center'
					},
					tooltip: {
						trigger: 'item'
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						top: 'center',
					},
					series: [{
						type: 'pie',
						radius: '50%',
						label: {
							show: false,
						},
						data: this.pieData,
						color: this.pieColor,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
				this.myChart.clear(); //清空
				option && this.myChart.setOption(option);
				
				window.addEventListener("resize", () => {
					this.myChart.resize();
				});
			},
			matchPieData: function() {
				this.pieData = [];

				if (this.pieName === '常用设备') {
					//先初始化pieData
					this.pieData.push(JSON.parse(JSON.stringify({
						value: 0,
						name: '移动设备',
					})));
					this.pieData.push(JSON.parse(JSON.stringify({
						value: 0,
						name: '桌面设备',
					})));
					//开始统计
					if(this.papers.length != 1) {
						for (var paperItem of this.papers) {
							if (paperItem.paper.userAgent.mobile == true) {
								this.pieData[0].value++;
							} else {
								this.pieData[1].value++;
							}
						}
					}
				} else if(this.pieName === '答卷来源'){
					//先初始化pieData
					this.pieData.push(JSON.parse(JSON.stringify({
						value: 0,
						name: '匿名',
					})));
					this.pieData.push(JSON.parse(JSON.stringify({
						value: 0,
						name: '实名',
					})));
					//开始统计
					for (paperItem of this.papers) {
						if (paperItem.paper.respondentType === 'anonymous') {
							this.pieData[0].value++;
						} else {
							this.pieData[1].value++;
						}
					}
				}
			},
			beforeDestroy() {
				/* 页面组件销毁的时候，别忘了移除绑定的监听resize事件，否则的话，多渲染几次
				容易导致内存泄漏和额外CPU或GPU占用哦*/
				window.removeEventListener("resize", () => {
					this.myChart.resize();
				});
			},
		}
	}
</script>

<style scoped>
	.plotBox {
		margin-left: 5%;
		width: 100%;
		height: 100%;
	}
</style>
