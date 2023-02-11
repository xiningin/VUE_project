<template>
	<div class="choiceChartsBox">
		<div :id="chartId" class="plotBox"></div>
	</div>
</template>

<script>
	import * as echarts from 'echarts';

	export default {
		data() {
			return {
				pieColor: ['#c8c6ff', '#77eed5', '#d59ceb', '#c1eadd', '#c8c6ff', '#eab283', '#71b9e5', '#30dab8',
					'#74dc81', '#6a9eff', '#c9eaea'
				],
				chartId: 'score_' + this.indexGet,
				myChart: null,
				pieData: [],
				scoreData: [],
			}
		},
		props: {
			indexGet: String,
			questionnAnalyze: JSON,
		},
		mounted() {
			this.matchPieData();
			this.pieInit();
		},
		methods: {
			pieInit: function() {
				var chartDom = document.getElementById(this.chartId);
				this.myChart = echarts.init(chartDom);
				var option;
				if(this.pieData.length == 0) {
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
				}
				else {
					option = {
						title: {
							text: '得分统计',
							left: '10'
						},
						tooltip: {
							trigger: 'item',
							formatter: '{b}：{c}份 ({d}%)'
						},
						toolbox: {
							show: true,
							feature: {
								mark: {
									show: true
								},
								saveAsImage: {
									show: true
								}
							}
						},
						color: this.pieColor,
						legend: {
							type: 'scroll',
							orient: 'vertical',
							left: 10,
							top: 'center',
						},
						series: [{
							type: 'pie',
							radius: [20,120],
							center: ['50%', '50%'],
							roseType: 'area',
							itemStyle: {
								borderRadius: 8
							},
							//data得排个序
							data: this.pieData,
						}],
					};
				}
				this.myChart.clear(); //清空
				option && this.myChart.setOption(option);

				window.addEventListener("resize", () => {
					this.myChart.resize();
				});
			},
			canJsonPush: function(score) {
				for(var item of this.pieData) {
					if(item.name === score) {
						return false;
					}
				}
				return true;
			},
			matchPieData: function() {
				this.pieData = [];
				this.scoreData = [];
				var tmpOptions = [];
				var tmpAnswerScore = [];

				if (this.questionnAnalyze.question.type === 'radio') {
					tmpOptions = this.questionnAnalyze.question.extensions.radio.options;
				} else { //checkbox
					tmpOptions = this.questionnAnalyze.question.extensions.checkbox.options;
				}

				//确实有点多，但是我这也没想到别的
				for (var answerItem of this.questionnAnalyze.answers) {
					for (var choiceItem of JSON.parse(answerItem.answer)) {
						for (var scoreItem of tmpOptions) {
							if (choiceItem.id === scoreItem.id) {
								tmpAnswerScore.push(scoreItem.score);
							}
						}
					}
				}
				
				//合并分数数据，形成json
				for(scoreItem of tmpAnswerScore) {
					if(this.canJsonPush(scoreItem)) {
						this.pieData.push(JSON.parse(JSON.stringify({
							name: scoreItem,
							value: 0,
						})))
					}
				}
				//开始统计数字
				for(var item of this.pieData) {
					for(scoreItem of tmpAnswerScore) {
						if(item.name === scoreItem) {
							item.value ++;
						}
					}
				}
				
				//给pieData排序顺便改一下key（加一个几分那种）
				for(item of this.pieData) {
					item.name = item.name + '分';
				}
				this.pieData.sort(function(a,b) {
					return b.value - a.value;
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
</style>
