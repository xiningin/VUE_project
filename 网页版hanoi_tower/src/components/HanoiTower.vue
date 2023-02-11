<template>
	<div class="viewBox">
		<div class="parent">
<!-- 			<div class="div3">
				<el-scrollbar>
					问题背景
					<p class="text">
						汉诺塔问题源自印度一个古老的传说，印度教的“创造之神”梵天创造世界时做了 3 根金刚石柱，其中的一根柱子上按照从小到大的顺序摞着 64
						个黄金圆盘。梵天命令一个叫婆罗门的门徒将所有的圆盘移动到另一个柱子上，移动过程中必须遵守以下规则：
					<ul>
						<li>
							每次只能移动柱子最顶端的一个圆盘；
						</li>
						<li>
							每个柱子上，小圆盘永远要位于大圆盘之上；
						</li>
					</ul>
					</p>
					<p class="text">
						而本问题借鉴其中故事同样在三个柱子上，允许用户自定义盘子数量，利用分治与递归的思想实现了类似的汉诺塔最优化解决。
					</p>
				</el-scrollbar>
			</div>
			<div class="div4">
				<el-scrollbar>
					界面功能
					<p class="text">
						界面左侧为带入盘子数量后的路径算法计算出来的盘子移动最小步骤数与路径。
					</p>
					<p class="text">
						界面右侧为本问题的可视化实现以及对一些参数的自定义。可以使用提供的滑块控制盘子移动的速度，也可以在输入框中输入
						定义盘子的数量，左侧路径与最小步骤数会同步更改。调整后即可点击“开始”按钮开始运行，结束后可以点击“准备”按钮准备下一轮开始。
					</p>
				</el-scrollbar>
			</div> -->
			<div class="div1">
				<div>
					<el-carousel :interval="4000" type="card" height="300px">
						<el-carousel-item v-for="item in imgList" :key="item.name">
							<img :src="item.src" style="height:100%;width:100%;" alt="图片丢失了" :title="item.name" />
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>
			<div class="div2">
				<p class="black">{{'最小步骤数: ' + lestStep}}</p>
				<el-table :data="path_discribe" stripe height="600" align="center" style="width: 100%;" @change="init">
					<el-table-column prop="epoch" label="步骤数" align="center" />
					<el-table-column prop="from" label="出发柱" align="center" />
					<el-table-column prop="to" label="目的柱" align="center" />
				</el-table>
			</div>
			<div class="div3">
				<div class="ui-tower">
					<div class="tower-wrap" ref="towers">
						<div class="tower">
							<div class="middle"></div>
							<div class="bottom"></div>
						</div>
						<div class="tower">
							<div class="middle"></div>
							<div class="bottom"></div>
						</div>
						<div class="tower">
							<div class="middle"></div>
							<div class="bottom"></div>
						</div>
					</div>
					<div class="disk-wrap" ref="diskParent">
						<div class="disk1"></div>
						<div class="disk2"></div>
						<div class="disk3"></div>
					</div>
					<div class="btn-wrap">
						<div style="margin: 20px 0;">
							<el-row :gutter="20">
								<el-col :span="4" :offset="7">
									盘子移动速度：
								</el-col>
								<el-col :span="13" v-if="!isloading">
									<el-slider v-model="diskSpeedInput" size="small" style="width: 40%;" :marks="marks"
										@change="init" />
								</el-col>
								<el-col :span="13" v-else>
									<el-slider v-model="diskSpeedInput" size="small" style="width: 40%;" :marks="marks"
										disabled />
								</el-col>
							</el-row>
						</div>
						<div>
							盘子数目：
							<span v-if="!isloading">
								<!-- 正在加载就不让修改 -->
								<el-input class="numInput" type="number" v-model="numOfDisk" placeholder="Please input"
									clearable @change="init" />
							</span>
							<span v-else>
								<el-input class="numInput" type="number" placeholder="cannot input" disabled />
							</span>
						</div>
						<el-button type="success" plain @click="handleAutoMove" :loading="isloading"
							style="margin-right: 10px;">开始</el-button>
						<span v-if="!isloading">
							<el-button type="success" plain @click="reset">准备</el-button>
						</span>
						<span v-else>
							<el-button type="success" plain disabled>准备</el-button>
						</span>

						<el-row class="columnsIndex">
							<el-col :span="8">
								第1号柱子
							</el-col>
							<el-col :span="8">
								第2号柱子
							</el-col>
							<el-col :span="8">
								第3号柱子
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		ElMessage
	} from 'element-plus';
	export default {
		name: 'hanoiPower',
		data() {
			return {
				lestStep: this.getMinStep(),
				isAutoMove: false,
				towersOrigin: [],
				towersTop: [],
				towersDiskArrs: [],
				diskH: 0,
				startPageX: 0,
				startPageY: 0,
				transitionDelay: 0,
				diskOldAxis: 0,
				target: undefined,
				down: false,
				path: this.getAutoMoveArr(),
				path_discribe: [],
				isloading: false,
				canStart: true,
				numOfDisk: 5,
				diskSpeedInput: 0,
				diskSpeed: 500,
				marks: ({
					// 0-100映射到200-1000(y=8*x+200)
					0: '5次/s',
					37.5: '2次/s',
					100: '1次/s',
				}),
				imgList: [{
						name: '界面功能.png',
						src: require("@/assets/界面功能.png")
					},
					{
						name: '汉诺塔.jpg',
						src: require("@/assets/汉诺塔.jpg")
					},
					{
						name: '问题背景.png',
						src: require("@/assets/问题背景.png")
					},
					{
						name: '壁纸2.jpg',
						src: require("@/assets/壁纸2.jpg")
					},
					{
						name: '壁纸4.jpg',
						src: require("@/assets/壁纸4.jpg")
					},
				]
			}
		},
		methods: {
			// 初始化
			init() {
				this.initData()
				this.initOrigins()
				this.mkDisks()
				this.lestStep = this.getMinStep()
				this.path = this.getAutoMoveArr()
				this.getPathDiscribeArr()
			},
			// 初始化、声明数据
			initData() {
				// 三个塔的圆心坐标数组
				this.towersOrigin = []
				// 三个塔的中轴顶点的坐标数组
				this.towersTop = []
				// 存储三个轴上面的方块数组
				this.towersDiskArrs = {
					0: [],
					1: [],
					2: []
				}
				// 每个方块的高度
				this.diskH = 20
				// 记录初始pageX，Y用于计算
				this.startPageX = 0
				this.startPageY = 0
				// transition过渡时间(ms)
				this.transitionDelay = 300
				// 存储移动之前的轴的序号，用于移动之后从原轴上数组去除改元素
				this.diskOldAxis = 0
				this.diskSpeed = this.diskSpeedInput * 8 + 200
			},
			// 初始化三个塔的0点坐标位置和顶点位置坐标，相对于父元素左上角为原点
			initOrigins() {
				this.$nextTick(() => {
					let parent = this.$refs.towers
					let towers = parent.querySelectorAll('.tower')
					towers.forEach((item, index) => {
						let pos = {}
						pos.x = parseFloat((parseFloat(item.offsetLeft) + parseFloat(item.clientWidth / 2))
							.toFixed(2))
						pos.y = -parseFloat((parseFloat(item.offsetTop) + parseFloat(item.clientHeight))
							.toFixed(2))
						this.towersOrigin[index] = pos
						this.towersTop[index] = {
							x: pos.x,
							y: -parseFloat(item.offsetTop)
						}
					})
				})
			},
			// 生成随机颜色
			getRandomColor() {
				let getRanNum = (max, min) => {
					return (Math.random() * (max - min) + min).toFixed(2)
				}
				return `rgba(${getRanNum(230, 180)}, ${getRanNum(230, 180)}, ${getRanNum(255, 170)}, 0.9)`
			},
			// 生成方块
			mkDisks() {
				this.$nextTick(() => {
					let parent = this.$refs.diskParent
					let html = ''
					let baseStyle = `position:absolute;height:20px;transform:translate3d(0,0,0);`
					let y = Math.abs(this.towersOrigin[0].y)
					let x = Math.abs(this.towersOrigin[0].x)
					for (let i = 0; i < this.numOfDisk; i++) {
						let diskWidth = 40 + i * 10
						let top = y - (this.numOfDisk - i) * 20
						let left = x - (diskWidth / 2)
						let bg = this.getRandomColor()
						let diskStyle =
							`width:${diskWidth}px;top:${top}px;left:${left}px;${baseStyle};background:${bg}`
						// data-index - 块标识
						// data-axis - 当前元素所在轴上标识
						html += `<div data-index="${i}" data-axis="0" style="${diskStyle}" class="disk${i}"></div>`
						this.towersDiskArrs[0].push(i)
					}
					parent.innerHTML = html
				})
			},
			// 获取translate的x，y，z坐标
			getTranslate(tranStr) {
				if (!tranStr) return
				let str = tranStr.toString()
				let tranNum = str.split('(')[1]
				let reg = /-?\d+/g
				let result = tranNum.match(reg)
				return {
					x: result[0],
					y: result[1],
					z: result[2]
				}
			},
			/*
			 ** 判断是否在某个塔里面
			 * @param {Object} el - 目标节点dom元素对象
			 */
			isInTowers(el) {
				let {
					topLeftX,
					topLeftY,
					bottomRightX,
					bottomRightY
				} = this.getElementLocation(el)
				let isInTowers = false
				// 最终的disk停留的轴的坐标
				let finaAxis = this.getElementAxisOrigin(el)
				this.towersOrigin.forEach((item, index) => {
					if (topLeftX < item.x && topLeftY < this.towersTop[index].y && bottomRightX > item.x &&
						bottomRightY > item.y) {
						isInTowers = true
						el.setAttribute('data-axis', index)
						finaAxis = this.towersOrigin[index]
						return
					}
				})
				return {
					isInTowers,
					finaAxis
				}
			},
			// 获取当前元素左上角坐标和右下角坐标
			getElementLocation(el) {
				let {
					x: tranX,
					y: tranY
				} = this.getTranslate(el.style.transform)
				let top = parseFloat(el.style.top)
				let left = parseFloat(el.style.left)
				let topLeftX = left + parseFloat(tranX)
				let topLeftY = -top - parseFloat(tranY)
				let elH = parseFloat(el.clientHeight)
				let elW = parseFloat(el.clientWidth)
				let bottomRightX = topLeftX + elW
				let bottomRightY = topLeftY - elH
				return {
					topLeftX,
					topLeftY,
					bottomRightX,
					bottomRightY
				}
			},
			// 获取当前元素所在轴原点坐标
			getElementAxisOrigin(el) {
				let axisIndex = el.getAttribute('data-axis')
				return this.towersOrigin[axisIndex]
			},
			// 获取当前元素的原始坐标, 元素左上角坐标
			getElementOrigin(el) {
				let top = parseFloat(el.style.top)
				let left = parseFloat(el.style.left)
				return {
					x: left,
					y: -top
				}
			},
			/*
			 ** 过渡到某个轴上面
			 * @param {Number | String} oldAxis - 当前元素前一个轴的下标
			 */
			autoMoveToAxis(el, oldAxis = 0) {
				let axisIndex = el.getAttribute('data-axis')
				let axisDiskArr = this.towersDiskArrs[axisIndex]
				let diskLen = axisDiskArr.length
				let axisOrigin = this.towersOrigin[axisIndex]
				let {
					x: originX,
					y: originY
				} = this.getElementOrigin(el)
				let tranX = axisOrigin.x - originX - (el.clientWidth / 2).toFixed(2)
				// Y必须加上当前轴上disk数量的偏移量
				// 如果轴没有改变就保持原来的不用 +1
				let dis = oldAxis == axisIndex ? diskLen : diskLen + 1
				let tranY = -(axisOrigin.y - originY) - this.diskH * dis
				// 从旧轴出栈，新轴入栈
				if (oldAxis != axisIndex) {
					let diskNum = this.towersDiskArrs[oldAxis].shift()
					this.towersDiskArrs[axisIndex].unshift(diskNum)
				}
				this.makeTransition(el, tranX, tranY)
			},
			// translate过渡元素
			makeTransition(el, tranX, tranY) {
				let tranStyle = `translate3d(${tranX}px, ${tranY}px, 0)`
				// 添加transition
				el.style.cssText += `transition: all ${this.transitionDelay}ms`
				// 确保渲染完成才添加translate
				let timer = setTimeout(() => {
					el.style.transform = tranStyle
					clearTimeout(timer)
					timer = null
				}, 10)
				// 过渡完成清除transition
				let delayTimer = setTimeout(() => {
					el.style.cssText = el.style.cssText.replace(`transition: all ${this.transitionDelay}ms`, '')
					this.isFinished()
					clearTimeout(delayTimer)
					delayTimer = null
				}, this.transitionDelay)
			},
			// 是否结束
			isFinished() {
				let isFinished = false
				for (let key in this.towersDiskArrs) {
					if (key != 0 && this.towersDiskArrs[key].length == this.numOfDisk) {
						isFinished = true
						ElMessage({
							message: 'finished！！',
							showClose: true,
							type: 'success',
						});
						return isFinished
					}
				}
			},
			// 获取最小步骤数
			getMinStep() {
				return Math.pow(2, this.numOfDisk) - 1
			},
			// 根据轴到从某根轴移动到目标轴
			moveToAxis(from, to) {
				this.$nextTick(() => {
					let diskIndex = this.towersDiskArrs[from].shift()
					// 获取目标轴的数组长度
					let toLen = this.towersDiskArrs[to].length
					let {
						x: toAxisX,
						y: toAxisY
					} = this.towersOrigin[to]
					let el = document.querySelector(`.disk${diskIndex}`)
					let elLen = parseFloat((el.clientWidth / 2).toFixed(2))
					let {
						topLeftX: tlOriginX,
						topLeftY: tlOriginY
					} = this.getElementLocation(el)
					let tran = el.style.transform
					let {
						x: tranX0,
						y: tranY0
					} = this.getTranslate(tran)
					let toY = toAxisY + (parseInt(toLen) + 1) * this.diskH
					let toX = toAxisX - elLen
					// translate Y轴的方向跟定义的坐标轴方向相反所以要加-
					let disTranY = -(toY - tlOriginY)
					let disTranX = toX - tlOriginX
					let toTranX = parseFloat(tranX0) + parseFloat(disTranX)
					let toTranY = parseFloat(tranY0) + parseFloat(disTranY)
					// 目标轴入栈
					this.towersDiskArrs[to].unshift(diskIndex)
					el.setAttribute('data-axis', to)
					this.makeTransition(el, toTranX, toTranY)
				})
			},
			// 根据传入的队列栈实现自动移动
			autoMove(moveArr) {
				this.isloading = true
				if (!moveArr || moveArr.length < 1) return
				let i = 0
				let len = moveArr.length
				let timer = setInterval(() => {
					let {
						from,
						to
					} = moveArr[i]
					this.moveToAxis(from, to)
					i++
					if (i > len - 1) {
						clearInterval(timer)
						timer = null
						this.isAutoMove = false
						this.isloading = false
					}
				}, this.diskSpeed)
			},
			// 获取自动移动的步骤数组
			getAutoMoveArr() {
				//不构成梵塔问题自动返回空数据
				if(this.numOfDisk < 2) {
					return []
				}
				// 先定义原始的两步的数组
				let stepArr = [{
						from: 0,
						to: 2
					},
					{
						from: 0,
						to: 1
					},
					{
						from: 2,
						to: 1
					}
				]
				// 移动整列后下一个目标映射轴index
				let nextAxisObj = {
					'1': 2,
					'2': 1
				}
				let getIndex = (oldIndex, dis) => {
					dis = dis < 0 ? parseFloat(dis) + 3 : dis
					let newIndex = parseFloat(oldIndex) + parseFloat(dis)
					newIndex = newIndex > 2 ? newIndex - 3 : newIndex
					return newIndex
				}
				for (let i = 2; i < this.numOfDisk; i++) {
					let lastTo = stepArr[stepArr.length - 1].to
					let nextAxis = nextAxisObj[lastTo]
					let fromDis = lastTo - 0
					let toDis = nextAxis - lastTo
					let arr = []
					stepArr.forEach(item => {
						arr.push({
							from: getIndex(item.from, fromDis),
							to: getIndex(item.to, toDis)
						})
					})
					stepArr.push({
						from: 0,
						to: nextAxis
					})
					stepArr.push(...arr)
				}
				return stepArr
			},
			getPathDiscribeArr() {
				var index = 0;
				this.path_discribe = [];
				for(index in this.path) {
					this.path_discribe.push(JSON.parse(JSON.stringify({
						epoch: Number(index)+1,
						from: '第'+(this.path[index].from+1)+'号柱子',
						to: '第'+(this.path[index].to+1)+'号柱子'
					})))
				}
			},
			// 点击开始
			handleAutoMove() {
				if (this.canStart && this.numOfDisk != 1) {
					this.canStart = false
					this.isAutoMove = true
					this.autoMove(this.path)
				} else if(this.numOfDisk == 1) {
					ElMessage({
						message: '当前数据无法运行！！',
						type: 'warning',
						showClose: true,
					})
				} else {
					ElMessage({
						message: '请准备圆盘！！',
						type: 'warning',
						showClose: true,
					})
				}
			},
			reset() {
				this.init()
				this.canStart = true
			},
		},
		created() {
			this.init()
		},
		mounted() {}
	}
</script>

<style scoped>
	.viewBox {
		width: 70%;
		height: 100%;
	}

	.ui-tower {
		position: relative;
		width: 100%;
		height: 100%;
		background: #ffffff;
	}

	.tower-wrap,
	.disk-wrap {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 90%;
	}

	.tower-wrap {
		z-index: 1;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.tower-wrap .tower {
		width: 150px;
		height: 150px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tower .bottom {
		border-bottom: 3px solid #bebebe;
		width: 100%;
		flex: none;
	}

	.tower .middle {
		border-right: 3px solid #bebebe;
		height: 100%;
		flex: 1;
	}

	.disk-wrap {
		z-index: 2;
	}

	.black {
		color: #333;
	}

	.btn-wrap {
		position: relative;
		z-index: 999999;
		height: 100%;
	}

	.parent {
		height: 100%;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: 1fr 0.5fr repeat(3, 1fr);
		grid-column-gap: 6px;
		grid-row-gap: 6px;
	}

	.div1 {
		grid-area: 1 / 1 / 3 / 6;
		padding-top: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 20px;
	}

	.div2 {
		grid-area: 3 / 1 / 6 / 3;
		padding-top: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 20px;
	}

	.div3 {
		grid-area: 3 / 3 / 6 / 6;
		padding-top: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 20px;
	}

	.numInput {
		width: 20%;
		margin: 20px 0;
	}

	.text {
		text-indent: 2em;
		text-align: left;
		margin: 10px 10px;
	}

	.columnsIndex {
		font-weight: 800;
		font-size: 30px;
		color: #bebebe;
		margin-top: 35%;
	}
</style>
