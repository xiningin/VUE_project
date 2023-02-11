<template>
	<div>
		<div v-for="(dataItem , index) in statisticalData" :key="index">
			<div style="margin: 20px 0;">
				<el-row justify="center" align="middle">
					<div class="percentBar">
						<div class="percentBar-bg">
							<span class="percentBar-name">
								{{dataItem.titleName}}
							</span>
							<span class="percentBar-count">
								{{dataItem.count}}
							</span>
							<span class="percentBar-rate">
								({{getAnswerPercent(dataItem)}}%)
							</span>
						</div>
						<div class="percentBar-get" :style="{ 'width': getAnswerPercent(dataItem) + '%' }">
							<div class="percentBar-get-cont"
								:style="{ 'width': (getAnswerPercent(dataItem) <= 0 ? 410 : 10000.0 / getAnswerPercent(dataItem)) + '%' }">
								<span class="percentBar-name">
									{{dataItem.titleName}}
								</span>
								<span class="percentBar-count">
									{{dataItem.count}}
								</span>
								<span class="percentBar-rate">
									({{getAnswerPercent(dataItem)}}%)
								</span>
							</div>
						</div>
					</div>
				</el-row>
			</div>
		</div>
		<el-radio-group v-model="chartType" label="type control" style="margin: 10px auto;" class="buttonShadow">
			<el-radio-button label="pie">饼图</el-radio-button>
			<el-radio-button label="bar">条形图</el-radio-button>
			<el-radio-button label="line">折线图</el-radio-button>
		</el-radio-group>
		<div class="choiceChartsBox">
			<div :id="chartId" class="plotBox"></div>
		</div>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	import ChoiceQuestionEchartVue from './ChoiceQuestionEchart.vue';
	export default {
		name: ChoiceQuestionEchartVue,
		props: {
			answersGet: Object,
			optionsGet: Object,
			indexGet: Number,
		},
		data() {
			return {
				chartId: 'chart_' + this.indexGet,
				answers: this.answersGet,
				options: this.optionsGet,
				optionPieData: [],
				optionBarData: [
					[],
					[]
				], //一个x数据一个data(y就没给了，直接value),不过Line和Bar共用一套
				// allType: ['pie','bar','line'],
				chartType: 'pie',
				pieColor: ['#c8c6ff', '#77eed5', '#d59ceb', '#c1eadd', '#c8c6ff', '#eab283', '#71b9e5', '#30dab8',
					'#74dc81', '#6a9eff', '#c9eaea',
				],
				optionCountSum: 0,
				statisticalData: [],
				myChart: null,
			}
		},
		components: {},
		mounted() {
			this.formPlotData();
			this.plot();
		},
		watch: {
			chartType: function() {
				this.plot();
			}
		},
		methods: {
			plot: function() {
				if (this.chartType === 'pie') {
					this.pieInit();
				} else if (this.chartType === 'bar') {
					this.barInit();
				} else if (this.chartType === 'line') {
					this.lineInit();
				}
			},
			formPlotData: function() {
				this.statisticalData = this.matchData();
				var tmp = this.matchData();
				for (var item of tmp) {
					if (item.count != 0) {
						this.optionPieData.push(JSON.parse(JSON.stringify({
							value: item.count,
							name: item.titleName,
						})));
					}
				}
				for (item of tmp) {
					if (item.count != 0) {
						this.optionBarData[0].push(item.titleName);
						this.optionBarData[1].push(item.count);
					}
				}
			},
			//存题目名字和次数
			matchData: function() {
				var optionCountList = [];
				this.optionCountSum = 0;

				for (var i = 0; i < this.options.length; i++) {
					optionCountList.push(JSON.parse(JSON.stringify({
						"id": this.options[i].id,
						"titleName": this.options[i].text,
						"count": 0,
					})));
					//给每个选项加count次数
					for (var item of this.answers.answers) {
						for (var choice of JSON.parse(item.answer)) {
							if (choice.id == optionCountList[i].id) {
								optionCountList[i].count++;
								this.optionCountSum++;
							}
						}
					}
				}
				return optionCountList;
			},
			getAnswerPercent: function(dataItem) {
				if(this.optionCountSum != 0) {
					return Math.round((dataItem.count / this.optionCountSum) * 100);
				} 
				else {
					return 0;
				}
			},
			lineInit: function() {
				var chartDom = document.getElementById(this.chartId);
				this.myChart = echarts.init(chartDom);
				var option;
				if (this.optionPieData.length == 0) {
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
					  tooltip: {
					    trigger: 'item',
					  },
					  grid: {
					    left: '3%',
					    right: '4%',
					    bottom: '3%',
					    containLabel: true
					  },
					  toolbox: {
					    feature: {
					      saveAsImage: {}
					    }
					  },
					  xAxis: {
					    type: 'category',
					    boundaryGap: false,
					    data: this.optionBarData[0],
					  },
					  yAxis: {
					    type: 'value'
					  },
					  series: [
					    {
					      type: 'line',
					      stack: 'Total',
					      data: this.optionBarData[1],
						  smooth: true,
						  lineStyle: {
						  	normal: {
						  		color: '#e2c5fa',
						  	}
						  },
						  itemStyle: {
						  	// 设置线条上点的颜色（和图例的颜色）
						  	normal: {
						  		color: '#afafaf',
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
						  				color: '#e2c5fa',
						  			},
						  		],
						  		global: false,
						  	},
						  },
					    },
					  ]
					};
				}
				this.myChart.clear(); //清空
				option && this.myChart.setOption(option);
				
				window.addEventListener("resize", () => {
					this.myChart.resize();
				});
			},
			pieInit: function() {
				var chartDom = document.getElementById(this.chartId);
				this.myChart = echarts.init(chartDom);
				var option;

				if (this.optionPieData.length == 0) {
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
						tooltip: {
							trigger: 'item'
						},
						toolbox: {
							feature: {
								saveAsImage: {}
							}
						},
						legend: {
							left: 'center',
							// top: 'bottom',
							bottom: "0%",
							margin: 30,
							textStyle: {
								fontSize: 15,
							},
							type: 'scroll',
							show: window.window.screen.width > 480 ? true : false,
						},
						color: this.pieColor,
						series: [{
							name: '选项统计：',
							type: 'pie',
							radius: ['40%', '70%'],
							avoidLabelOverlap: false,
							zoom: 0.5,
							itemStyle: {
								borderRadius: 10,
								borderColor: '#fff',
								borderWidth: 2
							},
							label: {
								// formatter: "{b} : {c} ({d}%)",
								formatter: window.window.screen.width > 480 ? "{b} : {c} ({d}%)" : "{b}",
								textStyle: {
									fontWeight: 'normal',
									fontSize: 15
								},
								// show: window.window.screen.width > 480 ? true : false,
								position: 'outer',
								// alignTo:'edge',
								alignTo: window.window.screen.width > 480 ? 'none' : 'labelLine',
								margin: 10,
							},
							labelLine: {
								show: true
							},
							data: this.optionPieData,
						}]
					};
				}
				this.myChart.clear(); //清空
				option && this.myChart.setOption(option);

				window.addEventListener("resize", () => {
					this.myChart.resize();
				});
			},
			barInit: function() {
				var chartDom = document.getElementById(this.chartId);
				this.myChart = echarts.init(chartDom);
				var option;

				if (this.optionPieData.length == 0) {
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
						tooltip: {
							trigger: 'item',
							axisPointer: {
								type: 'shadow'
							}
						},
						toolbox: {
							feature: {
								saveAsImage: {}
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							data: this.optionBarData[0],
							axisTick: {
								alignWithLabel: true
							}
						}],
						yAxis: [{
							type: 'value'
						}],
						color: this.pieColor,
						series: [{
							type: 'bar',
							barWidth: '60%',
							data: this.optionBarData[1],
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(180, 180, 180, 0.2)'
							}
						}]
					};
				}
				this.myChart.clear(); //清空
				option && this.myChart.setOption(option);

				window.addEventListener("resize", () => {
					this.myChart.resize();
				});
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

	.buttonShadow {
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}

	.percentBar {
		position: relative;
		width: 100%;
		max-width: 1500px;
		height: 40px;
		margin-top: 15px;
		font-size: 15px;
		-webkit-box-shadow: 0px 3px 8px 0px rgb(224 229 236 / 40%);
		box-shadow: 0px 3px 8px 0px rgb(224 229 236 / 40%);
		border-radius: 4px;
		background-color: #fff;
		overflow: hidden;
	}

	.percentBar:first-child {
		margin-top: 0;
	}

	.percentBar-bg {
		position: relative;
		height: 100%;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		border: 1px solid #e1e7f2;
		border-radius: 4px;
	}

	.percentBar-name,
	.percentBar-count,
	.percentBar-rate {
		position: absolute;
		top: 0;
		line-height: 38px;
	}

	.percentBar-name {
		display: block;
		left: 20px;
		right: 200px;
		color: #008fff;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.percentBar-count {
		right: 96px;
	}

	.percentBar-rate {
		right: 20px;
	}

	.percentBar-get {
		position: absolute;
		left: 0;
		top: 0;
		width: 0;
		height: 100%;
		background-color: #008fff;
		-webkit-transition: 0.6s ease;
		transition: 0.6s ease;
		overflow: hidden;
	}

	.percentBar-get-cont {
		position: relative;
		width: 0;
		height: 100%;
	}

	.percentBar-get-cont .percentBar-name,
	.percentBar-get-cont .percentBar-rate,
	.percentBar-get-cont .percentBar-count {
		color: #fff;
		line-height: 40px;
	}


	@media (max-width: 480px) {
		.percentBar {
			box-shadow: none;
			height: 37px;
			font-size: 14px;
			background-color: rgba(0, 0, 0, 0.05);
		}

		.percentBar-bg {
			border: none;
		}
	}
</style>
