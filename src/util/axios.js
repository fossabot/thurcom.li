import axios from 'axios'

export default () =>
  axios.create({
    baseURL: 'https://80.238.248.35/',
    timeout: 100000,
    headers: {
      'X-Pairing-Token': localStorage.pairingToken,
      'X-Auth-Token': localStorage.authToken,
      tenantid: 5
    }
  })
