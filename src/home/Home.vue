<template>
  <div class="home">
    <h1>{{ name }}</h1>

    <h2>I <i class="fa fa-heart" aria-hidden="true"></i> <span class="typed">{{ captionText }}</span><span class="cursor">|</span></h2>

    <div class="icons">
      <a href="https://github.com/vkolmakov"><i class="fa fa-github fa-2x" aria-hidden="true"></i></a>
      <a href="http://twitter.com/vklmkv"><i class="fa fa-twitter fa-2x" aria-hidden="true"></i></a>
      <a href=""><i class="fa fa-linkedin fa-2x" aria-hidden="true"></i></a>
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
        captionText: 'programming',
        initialChoices: ['functional programming', 'web', 'scala', 'machine learning', 'javascript', 'big data', 'react', 'node'],
        finalChoice: 'building stuff.'
      }
    },
    created () {
      this.updateCaption([...this.initialChoices])
    },

    methods: {
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

      changeCaptionOverTime(timeToCaption) {
        return Promise.all(timeToCaption.map(({ time, currentCaption }) => this.delay(() => {
          this.$set(this.$data, 'captionText', currentCaption)
          return currentCaption
        }, time)))
      },

      typeCaption({ caption, time }) {
        const timePerChar = time / caption.length
        const timeToCaption = caption.split('').map((currentCaption, idx) => ({ time: timePerChar * (idx + 1), currentCaption: caption.substring(0, idx + 1) }))

        return this.changeCaptionOverTime(timeToCaption)
      },

      eraseCaption({ caption, time }) {
        const timePerChar = time / caption.length
        const timeToCaption = caption.split('').map((char, idx) => ({ time: timePerChar * (idx + 1), currentCaption: caption.substring(0, caption.length - idx - 1) }))

        return this.changeCaptionOverTime(timeToCaption)
      },

      async processCaption({ caption, timeConfig }) {
        const waitFor = (time) => this.delay(() => {}, time)

        await this.typeCaption({ caption, time: timeConfig.timeTypingCaption })
        await waitFor(timeConfig.timeBeforeErasingCaption)

        if (caption == this.finalChoice) {
          return Promise.resolve()
        }

        await this.eraseCaption({ caption, time: timeConfig.timeErasingCaption })
        await waitFor(timeConfig.timeBeforeTypingCaption)

        return Promise.resolve()
      },

      async updateCaption(remainingCaptions) {
        let choices
        let caption

        if (remainingCaptions.length < 1) {
          return Promise.resolve()
        } else if (remainingCaptions.length < 2) {
          choices = [this.finalChoice]
          caption = remainingCaptions[0]
        } else {
          choices = remainingCaptions
          caption = choices[Math.floor(Math.random() * choices.length)]
        }


        this.$set(this.$data, 'captionText', '')

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

        const nextRemainingCaptions = choices.filter(c => c != caption)

        this.updateCaption(nextRemainingCaptions)
      },
    },
  }
</script>

<style lang="sass" scoped>
  .home {
    margin: 0 auto;
    max-width: 50em;

    font-family: "Raleway", sans-serif;
    color: #333;

    line-height: 1.5;
    padding: 4em 1em;

    h1, h2 {
      margin: 1em 0;
      text-align: center;
    }

    .links {
      text-align: center;
      a {
        color: #333;
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
      color: #5d297e;
    }
    .fa-twitter {
      color: #6faedc;
    }
    .fa-linkedin {
      color: #006699;
    }
    .fa-heart {
      color: #ff505c;
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
