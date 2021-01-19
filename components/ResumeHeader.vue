<template>
	<div class="header">
		<h1>
			<router-link
				class="header-link"
				:to="whoami.link"
				:aria-label="whoami.description"
			>
				{{ whoami.name }}
			</router-link>
		</h1>
		<ul class="contact">
			<li v-for="(c, idx) in contacts" :key="idx">
				<a :title="c.label" :href="c.link" class="contact-link"
					><icon
						:kind="c.iconKind"
						:wrapper-class="c.iconClass"
					></icon
					>{{ c.text }}</a
				>
			</li>
		</ul>
	</div>
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

.header {
	color: var(--text-color);

	display: flex;
	flex-flow: column nowrap;
}

.header-link {
	color: var(--header-color);
	text-decoration: none;
	&:hover,
	&:focus {
		text-decoration: underline;
	}
}

.contact {
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;

	padding: 0;
	margin: 0;
	list-style-type: none;
}

.contact-link {
	color: var(--link-color);
	text-decoration: none;
	&:hover,
	&:focus {
		text-decoration: underline;
	}

	// center the icon with the text
	display: flex;
	align-items: center;
}

.icon {
	margin-right: 0.2em;
	fill: var(--text-color);
}

.icon-github {
	fill: var(--github-color);
}

.icon-linkedin-square {
	fill: var(--linkedin-color);
}

@include on-medium-screen-and-paper {
	.contact {
		justify-content: flex-end;
	}

	.contact > li {
		width: auto;
		padding-left: 0.75em;
	}
}
</style>
