<template>
  <div class="home">
    <h1>{{ name }}</h1>

    <h2>I <i class="fa fa-heart" aria-hidden="true"></i> <span class="typed">{{ captionText }}</span><span class="cursor">|</span></h2>

    <div class="icons">
      <a v-for="sm in socialMedia" :href="sm.link">
        <i :class="sm.iconClass" aria-hidden="true"></i>
      </a>
    </div>
    <div class="links">
      <router-link to="/resume">resume</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'Vladimir Kolmakov',
        captionText: '',
        initialChoices: ['functional programming', 'web', 'scala', 'machine learning', 'javascript', 'big data', 'react', 'vue', 'node', 'coding', 'building stuff'],
        finalChoice: 'solving problems.',
        socialMedia: [
          { link: 'https://github.com/vkolmakov', iconClass: 'fa fa-github fa-2x' },
          { link: 'https://www.linkedin.com/in/vkolmakov', iconClass: 'fa fa-linkedin fa-2x' },
        ],
      }
    },
    created () {
      this.updateCaption([...this.initialChoices])
    },

    methods: {
      head(list) {
        return list[0]
      },

      getRandomFrom(list) {
        return list[Math.floor(Math.random() * list.length)]
      },

      delay(fn, time) {
        return new Promise((resolve, reject) => {
          try {
            setTimeout(() => {
              const result = fn.call(this)
              resolve(result)
            }, time)
          } catch (err) {
            reject(err)
          }
        })
      },

      clearCaption() {
        this.$set(this.$data, 'captionText', '')
      },

      changeCaptionOverTime(timeToCaption) {
        return Promise.all(timeToCaption.map(({ time, currentCaption }) => this.delay(() => {
          this.$set(this.$data, 'captionText', currentCaption)
          return currentCaption
        }, time)))
      },

      typeCaption({ caption, time }) {
        const timePerChar = time / caption.length
        const timeToCaption = caption.split('').map((_, idx) => ({ time: timePerChar * (idx + 1), currentCaption: caption.substring(0, idx + 1) }))

        return this.changeCaptionOverTime(timeToCaption)
      },

      eraseCaption({ caption, time }) {
        const timePerChar = time / caption.length
        const timeToCaption = caption.split('').map((_, idx) => ({ time: timePerChar * (idx + 1), currentCaption: caption.substring(0, caption.length - idx - 1) }))

        return this.changeCaptionOverTime(timeToCaption)
      },

      async processCaption({ caption, timeConfig }) {
        const waitFor = (time) => this.delay(() => {}, time)

        await this.typeCaption({ caption, time: timeConfig.timeTypingCaption })
        await waitFor(timeConfig.timeBeforeErasingCaption)

        if (caption === this.finalChoice) {
          return Promise.resolve()
        }

        await this.eraseCaption({ caption, time: timeConfig.timeErasingCaption })
        await waitFor(timeConfig.timeBeforeTypingCaption)

        return Promise.resolve()
      },

      async updateCaption(remainingCaptions) {
        const [caption, currentCaptionChoices] = do {
          const remaining = remainingCaptions.length
          if (remaining < 1) [null, null]
          else if (remaining < 2) [this.head(remainingCaptions), [this.finalChoice]]
          else [this.getRandomFrom(remainingCaptions), remainingCaptions]
        }

        if ([caption, currentCaptionChoices].some(elem => elem === null)) {
          return Promise.resolve()
        }

        this.clearCaption()

        const timePerChar = caption.length > 8 ? 80 : Math.floor(Math.random() * 50) + 100
        const timeTypingCaption = timePerChar * caption.length
        const timeErasingCaption = timeTypingCaption / 3
        const timeConfig = {
          timeTypingCaption,
          timeBeforeErasingCaption: 1400,
          timeErasingCaption,
          timeBeforeTypingCaption: Math.floor(Math.random() * 150) + 300,
        }

        await this.processCaption({ caption, timeConfig })

        const nextRemainingCaptions = currentCaptionChoices.filter(c => c !== caption)

        return this.updateCaption(nextRemainingCaptions)
      },
    },
  }
</script>

<style lang="sass" scoped>
  .home {
    $text-color: #333;
    $github-color: #5d297e;
    $twitter-color: #6faedc;
    $linkedin-color: #006699;
    $heart-color: #ff505c;

    margin: 0 auto;
    max-width: 50em;

    font-family: "Raleway", sans-serif;
    color: $text-color;

    line-height: 1.5;
    padding: 4em 1em;

    h1, h2 {
      margin: 1em 0;
      text-align: center;
    }

    .links {
      text-align: center;
      a {
        color: $text-color;
        text-decoration: none;
      }
  }

    .cursor {
      opacity: 1;
      font-size: 0.9em;
      $animation-duration: 0.65s;
      animation: blink $animation-duration infinite;
      -webkit-animation: blink $animation-duration infinite;
      -moz-animation: blink $animation-duration infinite;

      @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
      }
    }

    .fa-github {
      color: $github-color;
    }
    .fa-twitter {
      color: $twitter-color;
    }
    .fa-linkedin {
      color: $linkedin-color;
    }
    .fa-heart {
      color: $heart-color;
    }

    .icons {
      margin: 0 auto;
      text-align: center;
      i.fa {
        margin: 0.5em;
      }
    }


  }
</style>
