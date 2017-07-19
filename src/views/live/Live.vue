<template lang="pug">
  #live
    #time
      i.material-icons(@click="subtract") skip_previous
      p(@click="now") {{clock}}
      i.material-icons(@click="add") skip_next
    .loading(v-if="loading")
      a.button.is-loading Loading
    .scroll(v-else)
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

    this.get()
  },
  methods: {
    async get() {
      this.loading = true

      const channelsString = Object.values(this.channels).map(channel => channel.channelId).join()

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
    },
    subtract() {
      this.time = moment(this.time, 'x').subtract(30, 'minute').format('x')
      this.get()
    },
    add() {
      this.time = moment(this.time, 'x').add(30, 'minute').format('x')
      this.get()
    },
    now() {
      this.time = moment().format('x')
      this.get()
    }
  },
  computed: {
    clock() {
      return moment(this.time, 'x').format('HH:mm')
    }
  }
}
</script>

<style lang="sass">
#live
  overflow-y: initial
  display: flex
  flex-direction: column

.scroll
  overflow-y: scroll
  height: 100%

#time
  display: flex
  flex-direction: row
  justify-content: space-around
  width: 100%
  height: 4em
  border-bottom: 1px solid lightgrey
  align-items: center
</style>