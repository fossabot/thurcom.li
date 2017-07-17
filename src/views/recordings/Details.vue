<template>
  <div id="recordings-details">
    <div class="content" v-if="recording">
      <router-link :to="'/player/recording/' + id">
        <figure class="image is-16by9">
          <img src="http://bulma.io/images/placeholders/1280x960.png" alt="Image">
        </figure>
      </router-link>
      <h1 class="title">
        {{recording.title}}
      </h1>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Axios from '../../util/axios'
const axios = Axios()

export default {
  name: 'recordings',
  props: ['id'],
  data() {
    return {
      recording: null,
      loading: false
    }
  },
  async created() {
    this.loading = true

    this.recording = (await axios.get('ib/auth/pvr/recordings?getEPG=true'))
      .data
      .filter(recording => recording.recordingId == this.id)[0]

    console.log(this.recording)

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
#recordings-details
  height: 100%
</style>
