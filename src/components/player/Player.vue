<template lang="pug">
  figure.player.image.is-16by9
    .container-16by9
      .loading(v-if="loading")
        a.button.is-loading Loading
      video.video(ref="video" controls="" :style="{opacity: loading ? 0 : 1}")
</template>

<script>
import Hls from 'hls.js'
import moment from 'moment'
import Axios from '../../util/axios'
const axios = Axios()

export default {
  name: 'player',
  props: ['id', 'type'],
  data() {
    return {
      loading: false,
    }
  },
  async mounted() {
    this.loading = true
    let url
    switch (this.type) {
      case 'recording':
        url = (await axios.get('ib/auth/stream/npvr/' + this.id)).data.url
        break
      case 'live':
        const time = moment().subtract(5, 'second').format('X')
        url = (await axios.get('ib/auth/stream/tv/' + this.id + '?startTime=' + time)).data.url
        break
      case 'catchup':
        url = (await axios.get('ib/auth/stream/catchup/' + this.id)).data.url
        break
    }

    const video = this.$refs.video
    const hls = new Hls()
    hls.loadSource(url)
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this.loading = false
      video.play()
    })
  }
}
</script>

<style lang="sass">
.player
  width: 100%
  height: 100%

.container-16by9
  height: 100%
  width: 100%
  position: absolute
  bottom: 0
  left: 0
  right: 0
  top: 0

.video
  height: 100%
  width: 100%
</style>
