<template lang="pug">
  video.video(ref="video" controls="")
</template>

<script>
import Hls from 'hls.js'
import axios from 'axios'

export default {
  name: 'peer',
  data() {
    return {
      peer: new Peer('server', { key: 'jj13bo4y864aq0k9' })
    }
  },
  mounted() {
    this.peer.on('connection', conn => {
      console.log('holla')
      conn.on('data', data => {
        switch (data) {
          case 'play':
            break
          case 'pause':
            break
          default:
            this.setup(data)
        }
      })
    })
  },
  methods: {
    setup(url) {
      const video = this.$refs.video
      const hls = new Hls()
      hls.loadSource(url)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play()
      })
    }
  }
}
</script>

<style lang="sass">
</style>
