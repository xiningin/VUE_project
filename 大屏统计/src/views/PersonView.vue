<template>
	<div class="person">
		<person />
		<h1>Successfully jumped here</h1>
		<echart_demo/>
		<chineseMap/>
	</div>
</template>

<script>
	import person from '../../src/components/PersonCom.vue'
	import echart_demo from '../../src/components/Echarts_demo.vue'
	import chineseMap from '../../src/components/ChineseMap.vue'
	export default {
		name: 'PersonView',
		components: {
			person,
			echart_demo,
			chineseMap
		}
	}
</script>
