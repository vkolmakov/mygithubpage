<template>
	<section class="experience">
		<h2>Professional Experience</h2>
		<div class="job" v-for="(job, index) in jobs" :key="index">
			<div class="info">
				<div class="company-city">
					<em>{{ job.company }}</em
					>, {{ job.city }}
				</div>
				<div class="positions">
					<div
						class="position"
						v-for="position in job.positions"
						:key="position.title"
					>
						<div class="title">
							<strong>{{ position.title }}</strong>
						</div>
						<div class="position-dates">{{ position.dates }}</div>
					</div>
				</div>
			</div>
			<ul>
				<li
					v-for="(bulletpoint, index) in job.bulletpoints"
					:key="index"
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
@import "../assets/mixins";

.job ul {
	@include bulletpoints();
}

.positions {
	// ensure that no extra space is taken by the positions wrapper container
	// otherwise we will see some overflow at the end of the last position.
	width: 100%;
}

.position {
	display: flex;
	justify-content: space-between;

	.title {
		flex: 1;
	}

	.position-dates {
		display: flex;
		justify-content: flex-end;
	}
}

@include on-medium-screen-and-paper {
	.job > .info {
		display: flex;
		flex-flow: column wrap;
	}

	.job > .info > .company-city {
		align-self: flex-start;
		width: 50%;
	}
}
</style>
