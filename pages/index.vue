<template>
	<div class="home" v-if="shouldDisplay">
		<h1>{{ name }}</h1>

		<h2>
			<span>I</span>
			<icon wrapper-class="icon-heart" kind="icon-heart"></icon>
			<span class="typed">{{ captionText }}</span>
			<span class="cursor">_</span>
		</h2>

		<span
			ref="liveRegion"
			class="visually-hidden"
			aria-live="polite"
		></span>

		<div class="social-media-icons">
			<a
				:key="sm.title"
				class="social-media-link"
				v-for="sm in socialMedia"
				:href="sm.link"
				:title="sm.title"
			>
				<icon :wrapper-class="sm.iconClass" :kind="sm.iconKind"></icon>
			</a>
		</div>

		<div class="links">
			<nuxt-link to="/resume" class="links-link">resume</nuxt-link>
		</div>
	</div>
</template>

<script>
import FontFaceObserver from "fontfaceobserver";

function getRandomFrom(list) {
	return list[Math.floor(Math.random() * list.length)];
}

function delay(fn, time) {
	return new Promise((resolve, reject) => {
		try {
			setTimeout(() => {
				const result = fn.call(this);
				resolve(result);
			}, time);
		} catch (err) {
			reject(err);
		}
	});
}

function waitFor(time) {
	return delay(() => {}, time);
}

export default {
	head() {
		return {
			link: [
				{
					rel: "preload",
					href: require("~/assets/fonts/OpenSans/OpenSans-Regular.woff2"),
					as: "font",
					crossorigin: "annonymous",
				},
			],
		};
	},

	middleware(ctx) {
		if (typeof window !== "undefined") {
			// only run when navigation happened on the client side
			ctx.__fontsToPreload = [{ name: "Open Sans", weight: "normal" }];
		}
	},

	data() {
		return {
			shouldDisplay: true,
			name: "Vladimir Kolmakov",
			captionText: "",
			initialChoices: [
				"functional programming",
				"web",
				"scala",
				"machine learning",
				"javascript",
				"big data",
				"react",
				"vue.js",
				"cloud computing",
				"software engineering",
				"API design",
				"UI and UX",
				"typescript",
				"node.js",
				"coding",
				"building stuff",
			],
			finalChoice: "solving problems.",
			socialMedia: [
				{
					link: "https://github.com/vkolmakov",
					iconKind: "icon-github",
					iconClass: "icon-github",
					title: "GitHub",
				},
				{
					link: "https://www.linkedin.com/in/vkolmakov",
					iconKind: "icon-linkedin",
					iconClass: "icon-linkedin",
					title: "LinkedIn",
				},
			],
		};
	},
	created() {
		if (typeof window !== "undefined") {
			// only run when navigation happened on the client side
			const requiredFonts = this.$nuxt.context.__fontsToPreload;
			if (requiredFonts && requiredFonts.length > 0) {
				this.shouldDisplay = false;
				Promise.all(
					requiredFonts.map(({ name, weight }) =>
						new FontFaceObserver(name, { weight }).load(null, 2000)
					)
				).finally(() => {
					this.shouldDisplay = true;
					this.$nuxt.context.__fontsToPreload = void 0;
				});
			}
		}

		this.updateCaption([...this.initialChoices]);
	},

	methods: {
		clearCaption() {
			this.$set(this.$data, "captionText", "");
		},

		changeCaptionOverTime(timeToCaption) {
			return Promise.all(
				timeToCaption.map(({ time, currentCaption }) =>
					delay(() => {
						this.$set(this.$data, "captionText", currentCaption);
						return currentCaption;
					}, time)
				)
			);
		},

		typeCaption({ caption, time }) {
			const timePerChar = time / caption.length;
			const timeToCaption = caption.split("").map((_, idx) => ({
				time: timePerChar * (idx + 1),
				currentCaption: caption.substring(0, idx + 1),
			}));

			return this.changeCaptionOverTime(timeToCaption);
		},

		eraseCaption({ caption, time }) {
			const timePerChar = time / caption.length;
			const timeToCaption = caption.split("").map((_, idx) => ({
				time: timePerChar * (idx + 1),
				currentCaption: caption.substring(0, caption.length - idx - 1),
			}));

			return this.changeCaptionOverTime(timeToCaption);
		},

		isFinalChoice(caption) {
			return caption === this.finalChoice;
		},

		updateLiveRegion(caption) {
			if (this.$refs.liveRegion) {
				const verbChoices = ["like", "love", "am into", "enjoy"];
				this.$refs.liveRegion.innerHTML = this.isFinalChoice(caption)
					? `I ${getRandomFrom(
							verbChoices
					  )} ${caption}. Feel free to explore the rest of my website.`
					: `I ${getRandomFrom(verbChoices)} ${caption}`;
			}
		},

		async processCaption({ caption, timeConfig }) {
			this.updateLiveRegion(caption);

			await this.typeCaption({
				caption,
				time: timeConfig.timeTypingCaption,
			});
			await waitFor(timeConfig.timeBeforeErasingCaption);

			if (this.isFinalChoice(caption)) {
				return Promise.resolve();
			}

			await this.eraseCaption({
				caption,
				time: timeConfig.timeErasingCaption,
			});
			await waitFor(timeConfig.timeBeforeTypingCaption);

			return Promise.resolve();
		},

		async updateCaption(remainingCaptions) {
			const remaining = remainingCaptions.length;

			let caption;
			let currentCaptionChoices;

			if (remaining < 1) {
				[caption, currentCaptionChoices] = [null, null];
			} else if (remaining < 2) {
				[caption, currentCaptionChoices] = [
					remainingCaptions[0],
					[this.finalChoice],
				];
			} else {
				[caption, currentCaptionChoices] = [
					getRandomFrom(remainingCaptions),
					remainingCaptions,
				];
			}

			if (
				[caption, currentCaptionChoices].some((elem) => elem === null)
			) {
				return Promise.resolve();
			}

			this.clearCaption();

			const timePerChar =
				caption.length > 8 ? 80 : Math.floor(Math.random() * 50) + 100;
			const timeTypingCaption = timePerChar * caption.length;
			const timeErasingCaption = timeTypingCaption / 3;
			const timeConfig = {
				timeTypingCaption,
				timeBeforeErasingCaption: 1400,
				timeErasingCaption,
				timeBeforeTypingCaption: Math.floor(Math.random() * 150) + 300,
			};

			await this.processCaption({ caption, timeConfig });

			const nextRemainingCaptions = currentCaptionChoices.filter(
				(c) => c !== caption
			);

			return this.updateCaption(nextRemainingCaptions);
		},
	},
};
</script>

<style lang="scss" scoped>
@import url("~assets/fonts/OpenSans/open-sans.css");

.home {
	$heart-color: #ff505c;

	margin: 0 auto;
	max-width: 50em;

	font-family: "Open Sans", "Helvetica Neue", "Arial", sans-serif;
	color: var(--text-color);

	line-height: 1.5;
	padding: 4em 1em;

	h1,
	h2 {
		color: var(--header-color);
		display: flex;
		justify-content: center;
		align-content: center;
		margin: 1em 0;
		text-align: center;
		font-weight: 400;
	}

	h2 {
		color: var(--text-color);
	}

	.links {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;

		.links-link {
			margin-top: 0.25em;
			color: var(--link-color);

			transition-duration: 0.1s;
			transition-property: transform;
		}
	}

	.cursor {
		opacity: 1;
		font-size: 0.9em;
		$animation-duration: 0.75s;
		animation: blink $animation-duration infinite;
		-webkit-animation: blink $animation-duration infinite;
		-moz-animation: blink $animation-duration infinite;

		@keyframes blink {
			0% {
				opacity: 1;
			}
			50% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
	}

	.icon-github {
		fill: var(--github-color);
	}
	.icon-linkedin {
		fill: var(--linkedin-color);
	}
	.icon-heart {
		fill: $heart-color;
		margin: 0 8px;
	}

	.icon {
		text-decoration: none;
	}

	.social-media-icons {
		display: flex;
		justify-content: center;
		margin-bottom: 12px;
	}

	.social-media-link {
		font-size: 44px;
		display: flex;
		padding: 4px;

		margin-right: 16px;
		&:last-child {
			margin-right: 0;
		}
	}

	.visually-hidden {
		position: absolute;
		overflow: hidden;
		clip: rect(0 0 0 0);
		height: 1px;
		width: 1px;
		margin: -1px;
		padding: 0;
		border: 0;
	}
}
</style>
