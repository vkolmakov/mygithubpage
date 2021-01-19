<template>
	<section class="projects">
		<h2>Projects</h2>
		<div class="project" v-for="p in projects" :key="p.name">
			<h3>{{ p.name }}</h3>
			<ul>
				<li
					class="project-bullet"
					v-for="(bulletpoint, index) in p.bulletpoints"
					:key="index"
					v-html="bulletpoint"
				>
					{{ bulletpoint }}
				</li>
			</ul>
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

.project-bullet {
	// style links in v-html content.
	// see https://github.com/vuejs/vue-loader/issues/749
	::v-deep a {
		color: var(--link-color);
		text-decoration: underline;
	}
}
.projects {
	.project {
		h3 {
			margin: 0.1em 0;
		}
		ul {
			@include bulletpoints();
		}
	}
}
</style>
