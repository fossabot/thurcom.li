<template lang="pug">
  #recordings
    .loading(v-if="loading")
      a.button.is-loading Loading
    router-link(v-for="(recording, key) in recordings" :key="key" :to="'/recordings/' + recording.recordingId")
      .card
        .card-image
          figure.image.is-16by9
            img(v-lazy="'https://appbroker.api.iptv.ch/fb/epg/' + recording.broadcastId + '?tenantId=5'" alt="Image")
        .card-content
          .content {{recording.title}}
            small {{date(recording.startTime)}}
</template>

<script>
import moment from 'moment'
import Axios from '@/util/axios'
const axios = Axios()

export default {
  name: 'recordings',
  data() {
    return {
      recordings: [],
      loading: false
    }
  },
  async created() {
    this.loading = true
    this.recordings = (await axios.get('ib/auth/pvr/recordings?getEPG=true')).data
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
#recordings
  display: flex
  flex-direction: column
</style>
