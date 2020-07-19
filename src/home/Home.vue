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
                class="social-media-link"
                v-for="sm in socialMedia"
                :href="sm.link"
                :title="sm.title"
            >
                <icon :wrapper-class="sm.iconClass" :kind="sm.iconKind"></icon>
            </a>
        </div>

        <div class="links">
            <router-link to="/resume" class="links-link">resume</router-link>
        </div>
    </div>
</template>

<script>
import FontFaceObserver from "fontfaceobserver";
import Icon from "../components/Icon.vue";

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
    beforeCreate() {
        new FontFaceObserver("Open Sans")
            .load()
            .then(() => {
                this.shouldDisplay = true;
            })
            .catch(() => {
                // in case something fails still show the page
                this.shouldDisplay = true;
            });
    },

    components: {
        Icon,
    },

    data() {
        return {
            shouldDisplay: false,
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
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400");

.home {
    $text-color: #333;
    $github-color: #5d297e;
    $twitter-color: #6faedc;
    $linkedin-color: #006699;
    $heart-color: #ff505c;

    margin: 0 auto;
    max-width: 50em;

    font-family: "Open Sans", "Helvetica Neue", "Arial", sans-serif;
    color: $text-color;

    line-height: 1.5;
    padding: 4em 1em;

    h1,
    h2 {
        margin: 1em 0;
        text-align: center;
    }

    .links {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        .links-link {
            margin-top: 0.25em;
            color: $text-color;

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
        fill: $github-color;
    }
    .icon-twitter {
        fill: $twitter-color;
    }
    .icon-linkedin {
        fill: $linkedin-color;
    }
    .icon-heart {
        fill: $heart-color;
    }

    .icon {
        text-decoration: none;
        transition-duration: 0.1s;
        transition-property: transform;
    }

    .social-media-icons {
        margin: 0.5em auto;
        text-align: center;
        .social-media-link {
            font-size: 2em;
            margin: 0.5em;
            text-decoration: none;
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
