<template>
	<div>
		<Nuxt />
		<icon-defs></icon-defs>
	</div>
</template>

<style lang="scss">
@import "../assets/constants.scss";

body {
	--text-color: #333;
	--background-color: #fff;
	--link-color: #111;
	--header-color: #111;
	--github-color: #5d297e;
	--linkedin-color: #006699;

	margin: 0 auto;
	background-color: var(--background-color);
}

@media (prefers-color-scheme: dark) {
	body {
		--text-color: hsla(0, 0%, 100%, 0.9);
		--background-color: #282c35;
		--link-color: #fff;
		--header-color: #fff;
		--github-color: #e8e8e8;
		--linkedin-color: #e8e8e8;
	}
}

h1,
h2,
h3,
h4 {
	margin: 0;
	color: var(--header-color);
}

a {
	color: var(--link-color);
}

strong {
	color: var(--header-color);
}

@media (min-width: $large-screen-size) {
	:root {
		font-size: 22px;
	}
}

@media (min-width: $small-screen-size) and (max-width: $large-screen-size) {
	:root {
		font-size: 20px;
	}
}

@media (min-width: $tiny-screen-size) and (max-width: $small-screen-size) {
	:root {
		font-size: 18px;
	}
}

@media (max-width: $tiny-screen-size) {
	:root {
		font-size: 16px;
	}
}
</style>
