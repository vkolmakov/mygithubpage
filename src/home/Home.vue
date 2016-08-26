<template>
  <div class="home">
    <h1>{{ name }}</h1>
    <h2>I <i class="fa fa-heart" aria-hidden="true"></i> <span class="typed">{{ captionText }}</span></h2>
    resume -> linkedin -> twitter -> github
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'Vladimir Kolmakov',
        currentCaption: '',
        captionText: 'programming',
        initialChoices: ['functional programming', 'web', 'scala', 'machine learning', 'javascript', 'big data', 'react'],
        finalChoice: 'building stuff.'
      }
    },
    created () {
      this.updateCaption([...this.initialChoices])
    },

    methods: {
      delay: function(fn, time) {
        const self = this
        return new Promise((resolve, reject) => {
          try {
            setTimeout(() => {
              const result = fn.call(self)
              resolve(result)
            }, time)
          } catch (err) {
            reject(err)
          }
        })
      },

      typeCaption: function ({ caption, typingTime }) {
        const timePerChar = typingTime / caption.length
        const timeToCaption = caption.split('').map((currentCaption, idx) => ({ time: timePerChar * (idx + 1), currentCaption: caption.substring(0, idx + 1) }))

        const result = timeToCaption.map(({ time, currentCaption }) => this.delay(() => {
            this.$set(this.$data, 'captionText', currentCaption)
            return currentCaption
          }, time)
        )

        return Promise.all(result)
      },

      eraseCaption: function({ caption, time }) {
        const timePerChar = time / caption.length
        const timeToCaption = caption.split('').map((char, idx) => ({ time: timePerChar * (idx + 1), currentCaption: caption.substring(0, caption.length - idx - 1) }))

        const result = timeToCaption.map(({ time, currentCaption }) => this.delay(() => {
            this.$set(this.$data, 'captionText', currentCaption)
            return currentCaption
          }, time)
        )

        return Promise.all(result)
      },

      processCaption: function({ caption, timeConfig }) {
        return this.typeCaption({ caption, typingTime: timeConfig.timeTypingCaption }).then(() => {
          return this.delay(() => {}, timeConfig.timeBeforeErasingCaption)
        }).then(() => {
          if (caption == this.finalChoice) {
            return Promise.resolve()
          }
          return this.eraseCaption({ caption, time: timeConfig.timeErasingCaption })
        }).then(() => {
          return this.delay(() => {}, timeConfig.timeBeforeTypingCaption)
        }).then(() => {
          this.$set(this.$data, 'currentCaption', caption)
        })
      },

      updateCaption: function (remainingCaptions) {
        let choices
        let nextCaption

        if (remainingCaptions.length < 1) {
          return Promise.resolve()
        } else if (remainingCaptions.length < 2) {
          choices = [this.finalChoice]
          nextCaption = remainingCaptions[0]
        } else {
          choices = remainingCaptions
          nextCaption = choices[Math.floor(Math.random() * choices.length)]
        }

        this.$set(this.$data, 'captionText', '')

        const timePerChar = nextCaption.length > 8 ? 80 : Math.floor(Math.random() * 50) + 100
        const timeTypingCaption = timePerChar * nextCaption.length
        const timeErasingCaption = timeTypingCaption / 3

        const timeConfig = {
          timeTypingCaption,
          timeBeforeErasingCaption: 1400,
          timeErasingCaption,
          timeBeforeTypingCaption: Math.floor(Math.random() * 150) + 300,
        }

        this.processCaption({ caption: nextCaption, timeConfig }).then(() => {
          const nextRemainingCaptions = choices.filter(caption => caption != nextCaption)
          this.updateCaption(nextRemainingCaptions)
        })
      },
    },
  }
</script>

<style>

</style>
