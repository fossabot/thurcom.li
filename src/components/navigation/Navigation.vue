<template>
  <div id="navigation">
    <router-link to="/recordings">
      <i class="material-icons">videocam</i>
    </router-link>
    <router-link to="/guide">
      <i class="material-icons">event</i>
    </router-link>
    <router-link to="/live">
      <i class="material-icons">tv</i>
    </router-link>
    <router-link to="/favorites">
      <i class="material-icons">star</i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'navigation'
}
</script>

<style lang="sass">
#navigation
  display: flex
  flex-direction: row
  justify-content: space-around
  width: 100%
  height: 4em
  border-top: 1px solid lightgrey
  align-items: center
</style>
