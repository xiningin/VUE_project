<template>
	<div class="choiceChartsBox">
		<div class="plotBox" :id="chartId"></div>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	import "echarts-wordcloud/dist/echarts-wordcloud";
	import "echarts-wordcloud/dist/echarts-wordcloud.min";

	export default {
		name: 'WordCloudCom',
		props: {
			answersGet: Object,
			indexGet: Number,
		},
		data() {
			return {
				userVisitNum: [],
				date: [],
				goodVisitNum: [],
				goodsName: [],
				name: "0",
				myChart: null,
				chartId: 'chart_' + this.indexGet,
				answers: this.answersGet.answers,
				// options: this.optionsGet.extensions.radio.options,
				wordData: [],
				myColor: ['#c8c6ff', '#77eed5', '#d59ceb', '#c1eadd', '#c8c6ff', '#eab283', '#71b9e5', '#30dab8',
					'#74dc81', '#6a9eff', '#c9eaea',
				],
			};
		},
		mounted() {
			this.matchData();
			this.showEcharts();
		},
		methods: {
			canJsonPush: function(key) {
				for (var item of this.wordData) {
					if (item.name === key) {
						return false;
					}
				}
				return true;
			},
			matchData: function() {
				//初始化创建wordData
				for (var paperItem of this.answers) {
					for (var key in paperItem.words) {
						//json中没加入这个词语才进入
						if (this.canJsonPush(key)) {
							this.wordData.push(JSON.parse(JSON.stringify({
								name: key,
								value: 0,
							})));
						}
					}
				}
				//开始统计次数
				for (var item of this.wordData) {
					for (paperItem of this.answers) {
						for (key in paperItem.words) {
							if (item.name === key) {
								item.value++;
							}
						}
					}
				}
			},
			showEcharts: function() {
				var chartDom = document.getElementById(this.chartId);
				this.myChart = echarts.init(chartDom);
				var option = null;
				if (this.wordData.length == 0) {
					option = {
						title: {
							text: '暂无数据',
							x: 'center',
							y: 'center',
							textStyle: {
								color: 'rgba(2,138,245,0.8)',
								fontWeight: 'normal',
								fontSize: 30
							}
						}
					}
				} else {
					option = {
						backgroundColor: '#fff',
						tooltip: {
							show: true
						},
						toolbox: {
						  feature: {
						    saveAsImage: {}
						  }
						},
						series: [{
							name: '数据统计：', //数据提示窗标题
							type: 'wordCloud',
							sizeRange: [20, 70], //画布范围，如果设置太大会出现少词（溢出屏幕）
							rotationRange: [-45, 90], //数据翻转范围
							shape: 'circle',
							textPadding: 0,
							autoSize: {
								enable: true,
								minSize: 6
							},
							textStyle: {
								fontFamily: '微软雅黑',
								color: function() {
									return 'rgba(' + [
										Math.round(Math.random() * 250),
										Math.round(Math.random() * 250),
										Math.round(Math.random() * 250),
										0.8
									].join(',') + ')';
								}
							},
					
							data: this.wordData,
						}]
					}
				}

				this.myChart.clear(); //清空
				option && this.myChart.setOption(option);
				window.addEventListener("resize", () => {
					this.myChart.resize();
				});
			}
		},
	}
</script>

<style scoped>
	.choiceChartsBox {
		padding-top: 10px;
		width: 100%;
		height: 400px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 20px;
		overflow: visible;
	}

	.plotBox {
		width: 100%;
		height: 300px;
		max-width: 900px;
		margin: 40px auto;
	}

	@media(max-width:480px) {
		.choiceChartsBox {
			padding-top: 10px;
			width: 100%;
			height: 270px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			border-radius: 20px;
			overflow: visible;
		}

		.plotBox {
			width: 100%;
			height: 270px;
			/* max-width: 100%; */
		}
	}
</style>
