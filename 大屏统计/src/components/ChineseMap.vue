<template>
	<div id="pageBody" style="padding: 0 12%;">
		<div id="box" style="width: 700px;height: 490px;"></div>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	import service from '../../service.js';
	import chinaMap from "../assets/json/china.json"; //导入中国地图的json文件
	export default {
		props: {
			papers: Array,
		},
		data() {
			return {
				citys: ['北京', '天津', '上海', '重庆', '河北', '河南', '云南', '辽宁', '黑龙江', '湖南', '安徽', '山东', '新疆', '江苏', '浙江', '江西',
					'湖北', '广西', '甘肃', '山西', '内蒙古', '陕西', '吉林', '福建', '贵州', '广东', '青海', '西藏', '四川', '宁夏', '海南', '南海诸岛',
					'台湾', '香港', '澳门'
				],
				mapData: [],
				maxCity: '',
				myChart: null,
			}
		},
		methods: {
			calcMapData: function() {
				//初始化mapData数据
				for (var item of this.citys) {
					this.mapData.push(JSON.parse(JSON.stringify({
						name: item,
						value: 0,
					})));
				}
				//开始给mapData中的value计算值
				for (item of this.mapData) {
					for (var paperItem of this.papers) {
						if (undefined !== paperItem.paper.locationArea) {
							if (paperItem.paper.locationArea.includes(item.name)) {
								item.value++;
							}
						}
					}
				}
			},
			//求统计数据里面最大的收集问卷数量，拿来当做颜色对应数据上限，下限对应0
			getMaxOfMapData: function() {
				var maxCount = 0;
				for (var item of this.mapData) {
					if (item.value > maxCount) {
						maxCount = item.value;
						this.maxCity = item.name;
					}
				}
				return maxCount;
			},
			drawChina: function() {
				// 初始化echarts实例
				this.myChart = echarts.init(document.getElementById("box"));
				this.myChart.resize(); // 直接加这句即可
				var option = {
					title: {
						show: true,
						text: '地域位置',
						// subtext: this.maxCity,
						x: 'center',
						y: 'top',
						textStyle: {
							fontSize: 20,
							// fontWeight: 20,
						}
					},
					tooltip: { //这里设置提示框
						trigger: 'item', //数据项图形触发
						backgroundColor: "white", //提示框浮层的背景颜色。
						//字符串模板(地图): {a}（系列名称），{b}（区域名称），{c}（合并数值）,{d}（无）
						formatter: '地区：{b}<br/>问卷数量：{c}',
						borderRadius: 10,
					},
					dataRange: {
						min: 0,
						max: this.getMaxOfMapData(),
						x: 'left',
						y: 'center',
						calculable: true,
						color: ["rgba(2,138,245,0.8)", "white"],
						padding: 15,
					},
					series: [{
						name: '回答人数',
						type: 'map',
						roam: false,
						map: 'china',
						selectedMode: false,
						top: "5%", //组件距离容器的距离
						zoom: 1,
						itemStyle: {
							borderColor: "rgba(117, 149, 173, 0.8)"
						},
						emphasis: {
							label: {
								show: false,
							},
							itemStyle: {
								areaColor: "rgba(228, 226, 231, 0.8)"
							}
						},
						data: this.mapData,
					}]
				};
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
		},
		mounted() {
			this.calcMapData();
			echarts.registerMap("china", {
				geoJSON: chinaMap
			});
			this.$nextTick(() => {
				setTimeout(() => {
					this.drawChina()
				}, 500);
			})
		},
	}
</script>

<style scoped>
	.shadowBlock {
		padding-top: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 20px;
	}
</style>
