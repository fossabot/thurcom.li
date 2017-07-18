import axios from 'axios'

export default () =>
  axios.create({
    baseURL: 'http://192.168.1.194:1337/80.238.248.35/',
    timeout: 100000,
    headers: {
      'X-Pairing-Token': localStorage.pairingToken,
      'X-Auth-Token': localStorage.authToken,
      tenantid: 5
    }
  })
