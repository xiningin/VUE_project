<template>
	<div id="linePlot" class="plotBox"></div>
</template>

<script>
	import * as echarts from 'echarts';

	export default {
		data() {
			return {
				myChart: null,
				dateLineData: [],
				valueLineData: [],
				maxValueLineData: 100,
			}
		},
		props: {
			papers: Array,
		},
		mounted() {
			this.matchData();
			this.lineInit();
		},
		methods: {
			lineInit() {
				var chartDom = document.getElementById("linePlot");
				this.myChart = echarts.init(chartDom);
				var option = {
					title: {
						text: '回收趋势',
						left: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: '{b}：{c}份'
					},
					xAxis: {
						type: 'category',
						name: '日期',
						splitLine: {
							show: false
						},
						data: this.dateLineData,
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					yAxis: {
						show: true, // 是否显示 y 轴
						type: 'value',
						name: '答卷数量',
						// min: 0,
						// max: this.maxValueLineData * 1.1,
						//反正就不知道是不是不写反而有y刻度，写了就无了
						minorSplitLine: {
							show: true
						},
					},
					series: [{
						name: '统计数据：',
						type: 'line',
						data: this.valueLineData,
						smooth: true,
						lineStyle: {
							normal: {
								color: '#67d6fa',
							}
						},
						itemStyle: {
							// 设置线条上点的颜色（和图例的颜色）
							normal: {
								color: '#9574ff',
							},
						},
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [ // 渐变颜色
									{
										offset: 0,
										color: 'white',
									},
									{
										offset: 1,
										color: '#67d6fa',
									},
								],
								global: false,
							},
						},
					}],
				};
				this.myChart.clear(); //清空
				option && this.myChart.setOption(option);
				
				window.addEventListener("resize", () => {
					this.myChart.resize();
				});
			},
			matchData: function() {
				//准备时间轴
				this.dateLineData = [];
				this.valueLineData = [];
				//7天是604800000毫秒，一半是302400000
				var leftBoundaryToMillisecond = new Date(new Date().getTime() - 302400000).getTime();
				var rightBoundaryToMillisecond = new Date(new Date().getTime() + 302400000).getTime();
				// console.log(leftBoundary.toLocaleDateString());
				//一天是86,400,000毫秒
				for (var i = 0; i < 7; i++) {
					this.dateLineData.push((new Date(leftBoundaryToMillisecond + i * 86400000)).toLocaleDateString());
					this.valueLineData.push(0); //顺便初始化一下
				}
				//准备数值轴
				for (var paperItem of this.papers) {
					for (i = 0; i < 7; i++) {
						if ((new Date(paperItem.paper.submitTime)).toLocaleDateString() === this.dateLineData[i]) {
							this.valueLineData[i]++;
						}
					}
				}
				this.maxValueLineData = Math.max(this.valueLineData);

				//改一下dateLineData里面的时间格式
				for (var index in this.dateLineData) {
					var tmpArr = this.dateLineData[index].split('/');
					this.dateLineData[index] = tmpArr[0] + '年' + tmpArr[1] + '月' + tmpArr[2] + '日';
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

<style>
	.plotBox {
		/* margin-left: -5%; */
		width: 100%;
		height: 100%;
	}
</style>
