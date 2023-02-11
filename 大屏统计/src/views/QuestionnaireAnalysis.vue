<template>
	<div>
		<Header></Header>
	</div>
	<div class="questionnaireAllInfo">
	</div>
	<div id="text-left">
		<div class="box_small_title">
			<el-row :gutter="20">
				<el-col :span="11" :offset="1"></el-col>
				<el-col :span="1" :offset="2">回收量</el-col>
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
		<div class="box_select">
			<div style="margin: 20px;color: white;">占个位置</div>
			<el-form :model="form" ref="myForm">
				<el-row :gutter="20">
					<el-col :span="9" :offset="2">提交时间</el-col>
					<el-col :span="6" :offset="1">答者分组</el-col>
					<el-col :span="6">答题时长</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="9" :offset="2">
						<el-form-item>
							<el-date-picker v-model="form.timeFrame" type="datetimerange" start-placeholder="Start Date"
								end-placeholder="End Date" :default-time="form.defaultTime" @change="selectData" />
						</el-form-item>
					</el-col>
					<el-col :span="6" :offset="1">
						<el-form-item>
							<el-tree-select v-model="this.form.selectedGroupId" node-key="id" :data="this.groupData"
								check-strictly :render-after-expand="false" show-checkbox :props="{
							                label: 'title',
							                children: 'subGroup',
							            }" @change="selectData" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item>
							<div class="slider-demo-block">
								<el-slider v-model="form.answerUseTimeSelect" range :min="0" :max="100"
									:marks="form.marks" @change="selectData" />
							</div>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8" :offset="2">位置</el-col>
					<el-col :span="5">来源</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8" :offset="2">
						<el-cascader :options="form.optionsAddress" v-model="form.selectedOptions" @change="selectData"
							style="width: 80%;" clearable>
						</el-cascader>
					</el-col>
					<el-col :span="5">
						<el-select v-model="form.optionSource" placeholder="Select" multiple collapse-tags
							@change="selectData">
							<el-option v-for="item in form.sourceOptionToSelect" :key="item" :label="item"
								:value="item" />
						</el-select>
					</el-col>
					<el-col :span="3" :offset="5">
						<el-button @click="reset">重置</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="box_questionAnalysis">
			<!-- 遍历已创建的选项渲染 -->
			<div class="item" v-for="(item, index) in questionnaireData.analyze" :key="index">
				<el-row style="margin: 20px;">
					<el-col :span="2"></el-col>
					<el-col :span="20" offset="2">
						<span
							class="questionTitleContent">{{index < 9 ? '第0'+(index+1)+'题：' : '第'+(index+1)+'题：'}}</span>
						<span class="questionTitleContent">[{{getQuestionType(item.question)}}]
							{{item.question.title}}
						</span>
						<div v-if="item.question.type === 'radio'">
							<choiceQuestionCharts :answersGet="questionnaireData.analyze[index]"
								:optionsGet="questionnaireData.questionnaire.questions[index].extensions.radio.options"
								:indexGet="index" :key="questionnaireData.analyze[index]">
							</choiceQuestionCharts>
							<scorePie v-if="questionnaireData.questionnaire.questions[index].extensions.radio.score"
								:indexGet="index" :questionnAnalyze="questionnaireData.analyze[index]"
								:key="questionnaireData.analyze[index]"></scorePie>
						</div>
						<div v-else-if="item.question.type === 'checkbox'">
							<choiceQuestionCharts :answersGet="questionnaireData.analyze[index]"
								:optionsGet="questionnaireData.questionnaire.questions[index].extensions.checkbox.options"
								:indexGet="index" :key="questionnaireData.analyze[index]">
							</choiceQuestionCharts>
							<!-- 					<scorePie :indexGet="index" :questionnAnalyze="questionnaireData.analyze[index]"
								:key="questionnaireData.analyze[index]"></scorePie> -->
							<scorePie v-if="questionnaireData.questionnaire.questions[index].extensions.checkbox.score"
								:indexGet="index" :questionnAnalyze="questionnaireData.analyze[index]"
								:key="questionnaireData.analyze[index]"></scorePie>
						</div>
						<div v-else-if="item.question.type === 'text'">
							<wordCloudCharts :answersGet="questionnaireData.analyze[index]" :indexGet="index"
								:key="questionnaireData.analyze[index]">
							</wordCloudCharts>
						</div>
						<div v-else-if="item.question.type === 'textarea'">
							<wordCloudCharts :answersGet="questionnaireData.analyze[index]" :indexGet="index"
								:key="questionnaireData.analyze[index]">
							</wordCloudCharts>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/HeaderCom.vue';
	import {
		QuestionFilled
	} from '@element-plus/icons-vue';
	import {
		ElMessage
	} from 'element-plus';
	import service from '../../service.js';
	import choiceQuestionCharts from '@/components/ChoiceQuestionEchart.vue';
	import scorePie from '../components/PieToCalcScore.vue';
	import wordCloudCharts from '../components/WordCloudCom.vue';
	import {
		regionDataPlus,
		CodeToText,
	} from 'element-china-area-data';

	export default {
		name: 'questionnaireAnalysis',
		components: {
			Header,
			choiceQuestionCharts,
			wordCloudCharts,
			scorePie,
		},
		data() {
			return {
				questionnaireId: 18,
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
				groupData: [],
				form: {
					//根据地址筛选
					optionsAddress: regionDataPlus,
					selectedOptions: null,
					// answerSelected: [{}],
					//根据getPapersWithAnswers data.paper[index].paper.userAgent2.browserName分类
					sourceOptionToSelect: ['QQ', 'Wechat', 'Chrome', 'Firefox', 'Edge', 'Safari', 'Other'],
					sourceOptionToAddForOther: ['QQ', 'Wechat', 'Chrome', 'Firefox', 'Edge', 'Safari'],
					optionSource: [],
					//根据所选时间筛选
					timeFrame: null,
					defaultTime: [
						new Date(2003, 1, 1, 12, 0, 0),
						new Date(2003, 2, 1, 8, 0, 0),
					],
					//选取答题完成时间的
					answerUseTimeSelect: [0, 100],
					paperUseTimeRec: [], //第一个存原来的索引，第二个存时间转化为毫秒的变量  json
					marks: {
						0: '0%',
						50: '50%',
						100: '100%',
					},
					//分组筛选
					selectedGroupId: undefined,
				},
				staticQuestionnaireData: {},
				staticAnswerData: {},
			};
		},
		mounted() {
			this.getAnalysisData();
			this.getAnswerData();
			this.getAllgroupData();
		},
		methods: {
			selectData: function() {
				//给使用的数据一个初始的完整拷贝
				this.questionnaireData = JSON.parse(JSON.stringify(this.staticQuestionnaireData));
				this.answerData = JSON.parse(JSON.stringify(this.staticAnswerData));
				//依次过滤,并且判断是否使用这个筛选
				if (this.form.selectedOptions !== null) {
					this.addressSelectData();
				}
				if (this.form.optionSource.length !== 0) {
					this.sourceSelectData();
				}
				if (this.form.timeFrame !== null) {
					this.submitTimeSelectData();
				}
				if (this.form.answerUseTimeSelect[0] !== 0 || this.form.answerUseTimeSelect[1] !== 100) {
					this.answerUseTimeSelectData();
				}
				if (this.form.selectedGroupId !== undefined) {
					this.groupSelect();
				}
			},
			groupSelect: function() {
				var filteredPaperId = []; //记录需要排除的paperId

				//先筛选answerData的
				for (var paperIndex = this.staticAnswerData.paper.length - 1; paperIndex >= 0; paperIndex--) {
					var paperGroupPath = [];

					if (this.staticAnswerData.paper[paperIndex].respondent !== null) {
						//先排除没有respondent的
						paperGroupPath = this.staticAnswerData.paper[paperIndex].respondent.groupPath;
						//不在那个分组路径上就删
						if (!paperGroupPath.includes(this.form.selectedGroupId)) {
							this.answerData.paper.splice(paperIndex, 1);
							filteredPaperId.push(this.staticAnswerData.paper[paperIndex].paper.id);
						}
					} else { //匿名的问卷直接删
						this.answerData.paper.splice(paperIndex, 1);
						filteredPaperId.push(this.staticAnswerData.paper[paperIndex].paper.id);
					}
				}
				//接着筛选questionnaireData的,凡是在filteredPaperId里面的问卷就删
				for (var analyzeItem of this.staticQuestionnaireData.analyze) {
					for (var answerIndex = analyzeItem.answers.length - 1; answerIndex >= 0; answerIndex--) {
						//获取一下index，后面好用
						var analyzeIndex = this.staticQuestionnaireData.analyze.indexOf(analyzeItem);
						// paperSubmitTime = (new Date(analyzeItem.answers[answerIndex].paper.submitTime)).getTime();
						var paperId = analyzeItem.answers[answerIndex].paper.id;
						//不是就删
						if (filteredPaperId.includes(paperId)) {
							this.questionnaireData.analyze[analyzeIndex].answers.splice(answerIndex, 1);
						}
					}
				}
			},
			answerUseTimeSelectData: function() { //只变换右栏好像没东西
				//如果两个滑块重叠，则归零
				if (this.form.answerUseTimeSelect[0] == this.form.answerUseTimeSelect[1]) {
					this.answerData.paper = [];
					return;
				}
				//保存每一份答卷用时于paperUseTimeRec
				this.form.paperUseTimeRec = [];
				for (var item of this.answerData.paper) {
					//顺便记一下，方便后面用
					this.form.paperUseTimeRec.push(
						JSON.parse(JSON.stringify({
							timeNum: (new Date(item.paper.submitTime)).getTime() - (new Date(item.paper
								.startTime)).getTime(),
						})))
				}
				//排序：(出来是升序的)
				this.form.paperUseTimeRec.sort(function(a, b) {
					return a.timeNum - b.timeNum
				})
				//开始计算选的时间段位置对应索引
				var papersLen = this.answerData.paper.length;
				var leftTimeBoundary = 0;
				var rightTimeBoundary = 0;
				if (papersLen !== 0) {
					var tmpLeft = Math.round(this.form.answerUseTimeSelect[0] / 100 * papersLen);
					var tmpRight = Math.round(this.form.answerUseTimeSelect[1] / 100 * papersLen);
					leftTimeBoundary = tmpLeft - 1 >= 0 ? tmpLeft - 1 : 0;
					rightTimeBoundary = tmpRight - 1 >= 0 ? tmpRight - 1 : 0;
				}
				//存选中的最大时间最小时间
				if (this.form.paperUseTimeRec.length !== 0) {
					var targetTimeBef = this.form.paperUseTimeRec[leftTimeBoundary].timeNum;
					var targetTimeAft = this.form.paperUseTimeRec[rightTimeBoundary].timeNum;
					//开始筛选
					//先筛选answerData的
					for (var paperIndex = this.staticAnswerData.paper.length - 1; paperIndex >= 0; paperIndex--) {
						var paperUseTime = (new Date(this.staticAnswerData.paper[paperIndex].paper.submitTime))
							.getTime() - (new Date(this.staticAnswerData.paper[paperIndex].paper.startTime)).getTime();
						//不是就删
						if (paperUseTime < targetTimeBef || paperUseTime > targetTimeAft) {
							this.answerData.paper.splice(paperIndex, 1);
						}
					}
					//接着筛选questionnaireData的
					for (var analyzeItem of this.staticQuestionnaireData.analyze) {
						for (var answerIndex = analyzeItem.answers.length - 1; answerIndex >= 0; answerIndex--) {
							//获取一下index，后面好用
							var analyzeIndex = this.staticQuestionnaireData.analyze.indexOf(analyzeItem);
							paperUseTime = (new Date(analyzeItem.answers[answerIndex].paper.submitTime)).getTime() - (
								new Date(analyzeItem.answers[answerIndex].paper.startTime)).getTime();
							//不是就删
							if (paperUseTime < targetTimeBef || paperUseTime > targetTimeAft) {
								this.questionnaireData.analyze[analyzeIndex].answers.splice(answerIndex, 1);
							}
						}
					}
				}
			},
			submitTimeSelectData: function() {
				//选择的筛选时间
				var targetTimeBef = this.form.timeFrame[0].getTime();
				var targetTimeAft = this.form.timeFrame[1].getTime();

				//先筛选answerData的
				for (var paperIndex = this.staticAnswerData.paper.length - 1; paperIndex >= 0; paperIndex--) {
					var paperSubmitTime = (new Date(this.staticAnswerData.paper[paperIndex].paper.submitTime))
						.getTime();
					//不是就删
					if (paperSubmitTime < targetTimeBef || paperSubmitTime > targetTimeAft) {
						this.answerData.paper.splice(paperIndex, 1);
					}
				}
				//接着筛选questionnaireData的
				for (var analyzeItem of this.staticQuestionnaireData.analyze) {
					for (var answerIndex = analyzeItem.answers.length - 1; answerIndex >= 0; answerIndex--) {
						//获取一下index，后面好用
						var analyzeIndex = this.staticQuestionnaireData.analyze.indexOf(analyzeItem);
						paperSubmitTime = (new Date(analyzeItem.answers[answerIndex].paper.submitTime)).getTime();
						//不是就删
						if (paperSubmitTime < targetTimeBef || paperSubmitTime > targetTimeAft) {
							this.questionnaireData.analyze[analyzeIndex].answers.splice(answerIndex, 1);
						}
					}
				}
			},
			sourceSelectData: function() {
				// console.log("this.form.optionSource",this.form.optionSource);
				//先筛选answerData的
				// console.log("this.form.optionSource" , this.form.optionSource);//Array
				//先判断没有other的
				if (this.form.optionSource.indexOf('Other') == -1) {
					// console.log('进入不含other');
					//先筛选answerData的
					for (var paperIndex = this.staticAnswerData.paper.length - 1; paperIndex >= 0; paperIndex--) {
						//不是就删
						if (!this.form.optionSource.includes(this.staticAnswerData.paper[paperIndex].paper.userAgent2
								.browserName)) {
							this.answerData.paper.splice(paperIndex, 1);
						}
					}
					console.log("this.answerData.paper", this.answerData.paper);
					//接着筛选questionnaireData的   
					for (var analyzeItem of this.staticQuestionnaireData.analyze) {
						for (var answerIndex = analyzeItem.answers.length - 1; answerIndex >= 0; answerIndex--) {
							//获取一下index，后面好用
							var analyzeIndex = this.staticQuestionnaireData.analyze.indexOf(analyzeItem);
							console.log("analyzeIndex", analyzeIndex);
							//不是就删
							// console.log("test:", this.form.optionSource.includes(analyzeItem.answers[answerIndex].paper
							// .userAgent2.browserName));
							if (!this.form.optionSource.includes(analyzeItem.answers[answerIndex].paper.userAgent2
									.browserName)) {
								this.questionnaireData.analyze[analyzeIndex].answers.splice(answerIndex, 1);
							} else {
								console.log("answer", this.questionnaireData.analyze[analyzeIndex].answers);
							}
						}
					}
					console.log("this.questionnaireData.analyze", this.questionnaireData.analyze);
				} else {
					var differenceSet = [];
					this.form.sourceOptionToSelect.forEach((itemInAll) => {
						let diffIndex = this.form.optionSource.findIndex(itemSelected => itemInAll ===
							itemSelected);
						if (diffIndex == -1) differenceSet.push(itemInAll);
					});
					//先筛选answerData的
					for (paperIndex = this.staticAnswerData.paper.length - 1; paperIndex >= 0; paperIndex--) {
						//在differenceSet里面就删
						if (differenceSet.indexOf(this.staticAnswerData.paper[paperIndex].paper
								.userAgent2.browserName) !== -1) {
							this.answerData.paper.splice(paperIndex, 1);
						}
					}
					//接着筛选questionnaireData的
					for (analyzeItem of this.staticQuestionnaireData.analyze) {
						for (answerIndex = analyzeItem.answers.length - 1; answerIndex >= 0; answerIndex--) {
							//获取一下index，后面好用
							analyzeIndex = this.staticQuestionnaireData.analyze.indexOf(analyzeItem);
							//differenceSet包括就删
							if (differenceSet.indexOf(analyzeItem.answers[answerIndex].paper
									.userAgent2.browserName) !== -1) {
								this.questionnaireData.analyze[analyzeIndex].answers.splice(answerIndex, 1);
							}
						}
					}
				}

			},
			addressSelectData: function() {
				//首先筛选所选地址对应paper id，存于answerId
				var answerId = [];
				var addressTmp = [];
				for (var item of this.form.selectedOptions) {
					addressTmp.push(CodeToText[item]);
				}
				// console.log("addressTmp",addressTmp);
				for (item of this.answerData.paper) {
					if ('全部' === addressTmp[0]) {
						answerId.push(item.paper.id);
					} else {
						if (addressTmp[0] === item.paper.locationArea) {
							if ('全部' === addressTmp[1]) {
								answerId.push(item.paper.id);
							} else {
								if (addressTmp[1] === item.paper.locationCity) {
									answerId.push(item.paper.id);
									//支持区的
									// if ('全部' === addressTmp[2] || item.paper.locationDistrict === addressTmp[2]) {
									// 	answerId.push(item.paper.id);
									// }
								}
							}
						}
					}
				}
				// console.log("answerId",answerId);
				//首先筛选answerData
				for (var paperIndex = this.staticAnswerData.paper.length - 1; paperIndex >= 0; paperIndex--) {
					//不是就删
					if (answerId.indexOf(this.staticAnswerData.paper[paperIndex].paper.id) == -1) {
						this.answerData.paper.splice(paperIndex, 1);
					}
				}
				console.log("this.answerData", this.answerData);
				//接着筛选questionnaireData的
				for (var analyzeItem of this.staticQuestionnaireData.analyze) {
					for (var answerIndex = analyzeItem.answers.length - 1; answerIndex >= 0; answerIndex--) {
						//获取一下index，后面好用
						var analyzeIndex = this.staticQuestionnaireData.analyze.indexOf(analyzeItem);
						//不是就删
						if (answerId.indexOf(analyzeItem.answers[answerIndex].paper.id) == -1) {
							this.questionnaireData.analyze[analyzeIndex].answers.splice(answerIndex, 1);
						}
					}
				}
			},
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
							this.staticQuestionnaireData = JSON.parse(JSON.stringify(this.questionnaireData));
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
							this.staticAnswerData = JSON.parse(JSON.stringify(this.answerData));
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
			getAllgroupData() {
				//请求示例
				service.send("/respondent/group/getAll", {}, true).then((res) => {
						//请求成功
						if (res.code === 200) {
							this.groupData = res.data;
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
			getQuestionType: function(question) {
				if (question.type === 'radio') {
					return '单选题';
				} else if (question.type === 'checkbox') {
					return '多选题';
				} else if (question.type === 'text' && question.extensions.text.type === 'text') {
					return '文本填空';
				} else if (question.type === 'text' && question.extensions.text.type === 'number') {
					return '数字填空';
				} else if (question.type === 'textarea') {
					return '多行填空';
				} else {
					return 'wrong type';
				}
			},
			reset: function() {
				this.form = {
						//根据地址筛选
						optionsAddress: regionDataPlus,
						selectedOptions: null,
						// answerSelected: [{}],
						//根据getPapersWithAnswers data.paper[index].paper.userAgent2.browserName分类
						sourceOptionToSelect: ['QQ', 'Wechat', 'Chrome', 'Firefox', 'Edge', 'Safari', 'Other'],
						sourceOptionToAddForOther: ['QQ', 'Wechat', 'Chrome', 'Firefox', 'Edge', 'Safari'],
						optionSource: [],
						//根据所选时间筛选
						timeFrame: null,
						defaultTime: [
							new Date(2003, 1, 1, 12, 0, 0),
							new Date(2003, 2, 1, 8, 0, 0),
						],
						//选取答题完成时间的
						answerUseTimeSelect: [0, 100],
						paperUseTimeRec: [], //第一个存原来的索引，第二个存时间转化为毫秒的变量  json
						marks: {
							0: '0%',
							50: '50%',
							100: '100%',
						},
						//分组筛选
						selectedGroupId: undefined,
					},

					this.questionnaireData = JSON.parse(JSON.stringify(this.staticQuestionnaireData));
				this.answerData = JSON.parse(JSON.stringify(this.staticAnswerData));

				// this.$refs["form"].resetFields();
			}
		}
	};
</script>

<style scoped>
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

	.box_select {
		width: 70%;
		height: 300px;
		background-color: #fff;
		margin: auto;
		margin-top: 10px;
		border-radius: 10px;
		/* overflow: hidden; */
	}

	.box_questionAnalysis {
		padding-top: 10px;
		width: 70%;
		background-color: #fff;
		margin: auto;
		margin-top: 30px;
		border-radius: 5px;
		overflow: visible;
	}

	@media(max-width:480px) {
		.box_questionAnalysis {
			width: 100%;
		}
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

	.slider-demo-block {
		width: 80%;
		display: flex;
		align-items: center;
	}

	.slider-demo-block .el-slider {
		margin-top: 0;
		margin-left: 12px;
	}
</style>
