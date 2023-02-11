<template>
	<div class="header">
		<el-container>
			<el-header class="topHeader">
			  <Header></Header>
			</el-header>
		</el-container>
	</div>
</template>

<script>
import Header from '../layout/Header.vue'
export default {
	name: 'HeaderCom',
	props: {
	},
	components: {
		Header,
	} 
}
</script>

<style scoped>
	.topHeader {
	  --el-header-padding: 0;
	  --el-header-height: 64px;
	}
</style>