<template lang="pug">
  #recordings-details
    .content(v-if="recording")
      player(type="recording" :id="id")
      h1.title {{recording.title}}
</template>

<script>
import moment from 'moment'
import Axios from '../../util/axios'
const axios = Axios()
import vanilla from 'axios'

import Player from '@/components/player/Player.vue'

export default {
  name: 'recordings-details',
  props: ['id'],
  data() {
    return {
      recording: null,
      loading: false,
    }
  },
  components: {
    Player
  },
  async created() {
    this.loading = true

    this.recording = (await axios.get('ib/auth/pvr/recordings?getEPG=true'))
      .data
      .filter(recording => recording.recordingId == this.id)[0]

    this.loading = false
  },
  methods: {
    date(startTime) {
      return moment(startTime).format('DD.MM.YYYY')
    }
  }
}
</script>

<style lang="sass">
</style>
