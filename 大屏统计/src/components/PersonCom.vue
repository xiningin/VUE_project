<template>
	<div class="PersonCom">
		<el-container>
			<el-header class="topHeader">
			  <TopHeader></TopHeader>
			</el-header>
		</el-container>
	</div>
</template>

<script>
import TopHeader from '../layout/Header.vue'
export default {
	name: 'PersonCom',
	props: {
	},
	components: {
		TopHeader,
	} 
}
</script>

<style scoped>
	.topHeader {
	  --el-header-padding: 0;
	  --el-header-height: 64px;
	}
</style>