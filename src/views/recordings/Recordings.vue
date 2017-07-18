<template>
  <div id="recordings">
    <div class="loading" v-if="loading">
      <a class="button is-loading">Loading</a>
    </div>
    <router-link v-for="(recording, key) in recordings" :key="key" :to="'/recordings/' + recording.recordingId">
      <div class="card">
        <div class="card-image">
          <figure class="image is-16by9">
            <img v-lazy="'https://appbroker.api.iptv.ch/fb/epg/' + recording.broadcastId + '?tenantId=5'" alt="Image">
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            {{recording.title}}
            <small>{{date(recording.startTime)}}</small>
          </div>
        </div>
      </div>
    </router-link>
  </div>
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
#loading
  display: flex
  align-items: center
  justify-content: center
  height: 100%
</style>
