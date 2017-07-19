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
      peer: null
    }
  },
  async mounted() {
    this.peer = new Peer('server', { key: 'jj13bo4y864aq0k9' })
    const video = this.$refs.video
    this.peer.on('connection', conn => {
      conn.on('data', data => {
        const hls = new Hls()
        hls.loadSource(data)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play()
          video.webkitRequestFullscreen()
        })
      })
    })
  }
}
</script>

<style lang="sass">
</style>
