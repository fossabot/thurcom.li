<template>
  <div id="live">
    <div class="loading" v-if="loading">
      <a class="button is-loading">Loading</a>
    </div>
    <router-link v-for="(programm, key) in programms" :key="key" :to="'/player/tv/' + programm.channelId">
      <div class="card">
        <div class="card-image">
          <figure class="image is-16by9">
            <img src="http://bulma.io/images/placeholders/1280x960.png" alt="Image">
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            {{programm.title}}
            <small>{{programm.channelId}}</small>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import moment from 'moment'
import Axios from '../../util/axios'
const axios = Axios()

export default {
  name: 'live',
  data() {
    return {
      time: moment().format('x'),
      programms: [],
      loading: false
    }
  },
  async created() {
    this.loading = true
    const channels = (await axios.get('ib/auth/tv/channels')).data.map(channel => channel.channelId).join()

    this.programms = (await axios.get('ib/auth/epg', {
      params: {
        from: this.time,
        to: this.time,
        channels,
        limit: 0,
        runningInBounds: true,
        offset: 0,
        full: false
      }
    })).data
    this.loading = false
  }
}
</script>

<style lang="sass">
</style>