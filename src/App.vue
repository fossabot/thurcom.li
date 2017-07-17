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
@import "~bulma/sass/utilities/initial-variables"
@import "~bulma/sass/utilities/variables"
@import "~bulma/sass/base/helpers"
@import "~bulma/sass/utilities/mixins"
@import "~bulma/sass/utilities/controls"


@import "~bulma/sass/elements/content"
@import "~bulma/sass/elements/image"
@import "~bulma/sass/elements/button"

@import "~bulma/sass/components/card"

html, body
  width: 100%
  height: 100%

#app
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
</style>