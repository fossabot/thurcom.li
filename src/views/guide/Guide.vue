<template>
  <div id="guide">
    <ul id="titles">
      <li v-for="(channel, key) in Object.values(channels)" :key="key">
        {{channel.name}}
      </li>
    </ul>
    <ul id="programms">
      <li class="programm" v-for="(channel, key) in Object.values(channels)" :key="key" :style="computeOffset(channel.programms[0].startTime)">
        <div class="test" v-for="(programm, key) in channel.programms" :key="key" :style="computeWidth(programm.endTime, programm.startTime)">
          {{programm.title}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Axios from '../../util/axios'
import moment from 'moment'
const axios = Axios()

export default {
  name: 'guide',
  data() {
    return {
      channels: [],
      from: moment().subtract(1, 'week').format('x'),
      to: moment().add(1, 'week').format('x')
    }
  },
  async created() {
    const { data } = await axios.get('ib/auth/tv/channels')

    this.channels = data.reduce((acc, channel) => {
      channel.programms = []
      acc[channel.channelId] = channel
      return acc
    }, {})

    const channels = data.map(channel => channel.channelId).join()

    const epg = (await axios.get('ib/auth/epg', {
      params: {
        from: this.from,
        to: this.to,
        channels,
        limit: 0,
        runningInBounds: true,
        offset: 0,
        full: false
      }
    })).data

    this.channels = epg.reduce((acc, program) => {
      acc[program.channelId].programms.push(program)
      return acc
    }, this.channels)

    console.log(this.channels)
  },
  methods: {
    computeWidth(end, start) {
      return {
        width: (end - start) / 10000 + 'px',
      }
    },
    computeOffset(start) {
      return {
        'margin-left': (start - this.from) / 10000 + 'px'
      }
    }
  }
}
</script>

<style lang="sass">
#guide
  width: 100%
  display: flex
  flex-direction: row

#titles
  width: 150px

#programms
  width: 100%
  overflow-x: scroll
  overflow-y: visible

.programm
  display: inline-flex
  flex-direction: row


.test
  text-overflow: ellipsis
  white-space: nowrap
  overflow: hidden
  height: 20px
  border: 1px solid black
</style>
