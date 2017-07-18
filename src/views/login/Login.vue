<template>
  <div id="login" class="content">
    <form>
      <div class="field">
        <label class="label">Email</label>
        <p class="control">
          <input class="input" type="text" v-model="email">
        </p>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <p class="control">
          <input class="input" type="password" v-model="password">
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-primary" @click="login">Login</button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import Axios from '../../util/axios'
const axios = Axios()

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  created() {
    this.redirect()
  },
  methods: {
    login() {
      axios.post('ib/public/accounts/login', null, {
        auth: {
          username: this.email,
          password: this.password
        }
      }).then(({ data }) => {
        localStorage.pairingToken = data.pairingToken
        localStorage.authToken = data.authToken
        this.redirect()
      })
    },
    redirect() {
      if (localStorage.authToken) {
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
      }
    }
  }
}
</script>

<style lang="sass">
</style>
