<script>
export default {
	name: 'nav-header',
	components: {  },
	
	props: [],
	
	data() {
		return {};
	},
	computed: {
		isLoggedIn() { return (this.$store.state.user._id ? true : false) }
	},
	methods: {
		logout() {
			this.$store.dispatch("logout")
		}
	}
}
</script>

<template>
	<header class='nav-header'>

		<!-- Navbar if logged in -->
		<div v-if="isLoggedIn">
			<router-link to='/boards'>
				<button class="btn btn-info">Boards</button>
			</router-link>
			<button class="btn btn-danger" @click="logout()">
				Logout
			</button>
		</div>

		<!-- Navbar if logged out -->
		<!-- TODO: Button to 'About' page -->
		<!-- <div v-else>
			<router-link to='/about'>
				<button class="btn btn-info">About</button>
			</router-link>
		</div> -->
	</header>
</template>

<style scoped>
	.nav-header {
		text-align: center;
		margin-top: 15px;
		margin-bottom: 15px;
	}
</style>