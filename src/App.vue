<template lang="pug">
  #app
    router-view
    navigation(v-if="navigationShown")
</template>

<script>
import Navigation from '@/components/navigation/Navigation.vue'

export default {
  name: 'app',
  components: {
    Navigation
  },
  computed: {
    navigationShown() {
      return localStorage.authToken
    }
  }
}
</script>

<style lang="sass">
@import "~bulma/bulma"

html, body
  width: 100%
  height: 100%

#app
  width: 100%
  height: 100%
  display: flex
  flex-direction: column


.loading
  display: flex
  align-items: center
  justify-content: center
  height: 100%
</style>