<template lang="pug">
  .player
    figure.image.is-16by9
      .container-16by9
        .loading(v-if="loading")
          a.button.is-loading Loading
        video.video(ref="video" :style="{opacity: loading ? 0 : 1}" @play="onplay" @pause="onpause")
    .controls
      i.material-icons(v-if="playing" @click="pause") pause
      i.material-icons(v-else @click="play") play_arrow
      i.material-icons(@click="connect") tv
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
      url: '',
      loading: false,
      playing: false,
      peer: new Peer({ key: 'jj13bo4y864aq0k9' }),
      connected: false,
      connection: null
    }
  },
  async mounted() {
    this.loading = true
    switch (this.type) {
      case 'recording':
        this.url = (await axios.get('ib/auth/stream/npvr/' + this.id)).data.url
        break
      case 'live':
        const time = moment().subtract(5, 'second').format('X')
        this.url = (await axios.get('ib/auth/stream/tv/' + this.id + '?startTime=' + time)).data.url
        break
      case 'catchup':
        this.url = (await axios.get('ib/auth/stream/catchup/' + this.id)).data.url
        break
    }

    const video = this.$refs.video
    const hls = new Hls()
    hls.loadSource(this.url)
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this.loading = false
      video.play()
    })
  },
  methods: {
    connect() {
      this.connection = this.peer.connect('server')
      this.connection.on('open', () => {
        console.log(this.connection)
        this.connected = true
        this.connection.send(this.url)
      })
    },
    onplay() {
      this.playing = true
    },
    play() {
      if (this.connected) {
        this.connection.send('play')
        this.onplay()
      }
      else {
        this.$refs.video.play()
      }
    },
    onpause() {
      this.playing = false
    },
    pause() {
      if (this.connected) {
        this.connection.send('pause')
        this.onpause()
      }
      else {
        this.$refs.video.pause()
      }
    }
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
  display: flex
  flex-direction: column

.controls
  display: flex
  flex-direction: row
  justify-content: space-between
  width: 100%
  height: 2em
  border-top: 1px solid lightgrey
  align-items: center

</style>
