<template>
	<HanoiTower></HanoiTower>
</template>

<script>
	import HanoiTower from './components/HanoiTower.vue'

	export default {
		name: 'App',
		components: {
			HanoiTower
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	body {
		height: 100%;
		width: 100%;
		margin: 0;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
