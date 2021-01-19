<template>
	<div :class="`icon ${wrapperClass}`">
		<svg><use :xlink:href="`#${kind}`"></use></svg>
	</div>
</template>

<script>
export default {
	props: {
		kind: String,
		wrapperClass: String,
	},
};
</script>

<style scoped>
.icon {
	display: inline-flex;
	align-self: center;
	position: relative;
	height: 1em;
	width: 1em;
}
</style>
