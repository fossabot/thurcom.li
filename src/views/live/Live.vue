<template lang="pug">
  #live
    #channels
      .select
        select
          option Select dropdown
          option With options
    .loading(v-if="loading")
      a.button.is-loading Loading
    router-link(v-for="(programm, key) in programms" :key="key" :to="'/player/tv/' + programm.channelId")
      .card
        .card-image
          figure.image.is-16by9
            img(v-lazy="'https://appbroker.api.iptv.ch/fb/epg/' + programm.broadcastId + '?tenantId=5'" alt="Image")
        .card-content
          .content {{programm.title}}
            small {{channels[programm.channelId].name}}
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
      channels: {},
      programms: [],
      loading: false
    }
  },
  async created() {
    this.loading = true

    const { data } = await axios.get('ib/auth/tv/channels')

    this.channels = data.reduce((acc, channel) => {
      acc[channel.channelId] = channel
      return acc
    }, {})

    console.log(this.channels)

    const channelsString = data.map(channel => channel.channelId).join()

    this.programms = (await axios.get('ib/auth/epg', {
      params: {
        from: this.time,
        to: this.time,
        channels: channelsString,
        limit: 0,
        runningInBounds: true,
        offset: 0,
        full: false
      }
    })).data.sort((a, b) => a.channelId - b.channelId)
    this.loading = false
  }
}
</script>

<style lang="sass">
#channels
  display: flex
  flex-direction: row
  justify-content: center
  width: 100%
  height: 4em
  border-bottom: 1px solid lightgrey
  align-items: center
</style>