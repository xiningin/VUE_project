<template>
	<div>
		<Header></Header>
	</div>
	<div class="questionnaireAllInfo">
	</div>
	<div id="text-left">
		<div class="box_small_title">
			<el-row :gutter="20">
				<el-col :span="5" :offset="1"></el-col>
				<el-col :span="8"></el-col>
				<el-col :span="1">回收量</el-col>
				<el-col :span="1"></el-col>
				<el-col :span="1">浏览量</el-col>
				<el-col :span="1"></el-col>
				<el-col :span="2">回收率</el-col>
				<el-col :span="3">平均完成时间</el-col>
			</el-row>
		</div>
		<div class="box_large_title">
			<el-row :gutter="20">
				<el-col :span="11" :offset="1">
					<div>{{questionnaireData.questionnaire.title}}</div>
				</el-col>
				<el-col :span="1" :offset="2">{{answerData.paper.length}}</el-col>
				<el-col :span="1"></el-col>
				<el-col :span="1">{{questionnaireData.questionnaire.visit}}</el-col>
				<el-col :span="1"></el-col>
				<el-col :span="2">{{toPercent(answerData.paper.length / questionnaireData.questionnaire.visit)}}
				</el-col>
				<el-col :span="3">{{calcAnswerTime(answerData.paper)}}</el-col>
			</el-row>
		</div>
		<div class="box_analysis">
			<div class="parent">
				<div class="div1">
					<chineseMap :papers="answerData.paper" :key="answerData.paper" />
				</div>
				<div class="div2">
					<pieChart :pieName="pieName_1" :pieIndex="pieIndex_1" :papers="answerData.paper" :key="answerData.paper"></pieChart>
				</div>
				<div class="div3">
					<pieChart :pieName="pieName_2" :pieIndex="pieIndex_2" :papers="answerData.paper" :key="answerData.paper"></pieChart>
				</div>
				<div class="div4">
					<lineChart :papers="answerData.paper" :key="answerData.paper"></lineChart>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/HeaderCom.vue';
	import chineseMap from '../../src/components/ChineseMap.vue'
	import {
		QuestionFilled
	} from '@element-plus/icons-vue';
	import {
		ElMessage
	} from 'element-plus';
	import service from '../../service.js';
	import pieChart from '../components/PieForOverView.vue';
	import lineChart from '../components/LineForOverView.vue';
	export default {
		name: 'questionnaireAnalysis',
		components: {
			Header,
			chineseMap,
			pieChart,
			lineChart,
		},
		data() {
			return {
				questionnaireId: 24,
				questionnaireData: {
					questionnaire: {
						questions: [],
					},
					analyze: [],
				},
				answerData: {
					paper: [{
						paper: {},
					}],
				},
				pieName_1: '常用设备',
				pieName_2: '答卷来源',
				pieIndex_1: '1',
				pieIndex_2: '2',
			};
		},
		mounted() {
			this.getAnalysisData();
			this.getAnswerData();
		},
		methods: {
			calcAnswerTime: function(paper) {
				if (paper.length == 0) {
					return '0秒'
				}
				var timeSum = 0;
				for (var item of paper) {
					timeSum += ((new Date(item.paper.submitTime)).getTime() - (new Date(item.paper.startTime))
						.getTime());
				}
				return this.formatSecond(timeSum / 1000 / paper.length);
			},
			formatSecond(secondData) {
				var h = Math.floor((secondData / 3600) % 24);
				var m = Math.floor((secondData / 60) % 60);
				var s = Math.floor(secondData % 60);
				var result = s + "秒";
				if (m > 0) {
					result = m + "分钟" + result;
				}
				if (h > 0) {
					result = h + "小时" + result;
				}
				return result;
			},
			toPercent: function(num) {
				var str = Number(num * 100).toFixed(0);
				str += "%";
				return str;
			},
			getAnalysisData() {
				//请求示例
				service.send("/paper/getPapersAnalyze", {
						"id": this.questionnaireId,
					}, true).then((res) => {
						//请求成功
						if (res.code === 200) {
							this.questionnaireData = res.data;
						} else {
							//处理业务失败的情况
							//一般情况下是直接弹出来提示用户
							ElMessage({
								showClose: true,
								message: res.msg,
								type: 'error',
								duration: 5 * 1000
							})
						}
					})
					.catch(err => {
						console.log(err)
						ElMessage({
							showClose: true,
							message: err.msg,
							type: 'error',
							duration: 5 * 1000
						})
					})
			},
			// /paper/getPapersWithAnswers => answerData :有paper信息(收到的答卷)
			// /paper/getPapersAnalyze => questionnaireData
			getAnswerData() {
				//请求示例
				service.send("/paper/getPapersWithAnswers", {
						"id": this.questionnaireId,
					}, true).then((res) => {
						//请求成功
						if (res.code === 200) {
							this.answerData = res.data;
						} else {
							//处理业务失败的情况
							//一般情况下是直接弹出来提示用户
							ElMessage({
								showClose: true,
								message: res.msg,
								type: 'error',
								duration: 5 * 1000
							})
						}
					})
					.catch(err => {
						console.log(err)
						ElMessage({
							showClose: true,
							message: err.msg,
							type: 'error',
							duration: 5 * 1000
						})
					})
			},
		}
	};
</script>

<style>
	#text-left {
		text-align: left;
	}

	.box_small_title {
		color: rgba(165, 165, 165, 0.8);
		margin-top: 10px;
		width: 70%;
		height: 30px;
		margin: auto;
		margin-top: 10px;
		border-radius: 10px;
		font-size: 12px;
		line-height: 30px;
	}

	.box_large_title {
		width: 70%;
		height: 60px;
		margin: auto;
		margin-top: 10px;
		border-radius: 10px;
		font-size: 25px;
		font-weight: 800;
	}

	.box_analysis {
		width: 70%;
		/* height: 400px; */
		background-color: #fff;
		margin: auto;
		margin-top: 10px;
		border-radius: 5px;
		overflow: hidden;
	}

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
		min-height: 36px;
	}

	.questionnaireAllInfo {
		font-size: 20px;
		font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	}

	.questionTitleContent {
		font-size: 20px;
	}

	.parent {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 1fr) 1.5fr;
		grid-column-gap: 3px;
		grid-row-gap: 3px;
	}

	.div1 {
		grid-area: 1 / 1 / 3 / 3;
		padding-top: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 20px;
	}

	.div2 {
		grid-area: 1 / 3 / 2 / 4;
		padding-top: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 20px;
	}

	.div3 {
		grid-area: 2 / 3 / 3 / 4;
		padding-top: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 20px;
	}

	.div4 {
		grid-area: 3 / 1 / 4 / 4;
		padding-top: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 20px;
	}
</style>
