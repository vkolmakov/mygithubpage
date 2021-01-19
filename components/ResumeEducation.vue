<template>
	<section class="education">
		<h2>Education</h2>
		<div class="school" v-for="s in schools" :key="s.name">
			<div class="school-row">
				<div class="school-name">
					<strong>{{ s.name }}</strong
					>, {{ s.city }}
				</div>
				<div class="graduation">Graduation: {{ s.graduation }}</div>
			</div>

			<div class="school-row">
				<div class="major">{{ s.major }}</div>
				<div class="gpa">Cumulative GPA: {{ s.gpa }}</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		data: Object,
	},

	data() {
		return this.data;
	},
};
</script>

<style lang="scss" scoped>
@import "../assets/mixins.scss";

.education {
	display: flex;
	flex-flow: column wrap;
}

@include on-medium-screen-and-paper {
	.education > .school {
		display: flex;
		flex-flow: column nowrap;
	}

	.education > .school > .school-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
}
</style>
