<template>
  <div id="player">
    <video ref="video" controls=""></video>
  </div>
</template>

<script>
import Hls from 'hls.js'
import moment from 'moment'
import Axios from '../../util/axios'
const axios = Axios()

export default {
  name: 'player',
  props: ['id', 'type'],
  async mounted() {
    let url
    if (this.type === 'recording') {
      url = (await axios.get('ib/auth/stream/npvr/' + this.id)).data.url
    }
    else {
      const time = moment().format('X')
      url = (await axios.get('ib/auth/stream/tv/' + this.id + '?startTime=' + time)).data.url
    }

    const video = this.$refs.video
    const hls = new Hls()
    hls.loadSource(url)
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play()
    })
  }
}
</script>

<style lang="sass">
#player
  height: 100%
</style>
