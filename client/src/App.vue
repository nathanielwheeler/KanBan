<script>
import NavHeader from "./components/NavHeader.vue"
export default {
	name: 'app',
	components: { NavHeader },
	
	props: [],
	
	data() {
		return {};
	},
	computed: {},
	methods: {

	}
}
</script>

<template>
	<div class='app'>
		<nav-header />
		<main>
			<router-view />
		</main>
	</div>
</template>

<style scoped>
	
</style>