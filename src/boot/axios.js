// import axios from 'axios'

// // "async" is optional;
// // more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
// export default ({ app, router, Vue }) => {
//   Vue.prototype.$axios = axios
//   Vue.prototype.$axios.defaults.baseURL = 'http://localhost:3000'
// }

import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.prototype.$axios.defaults.baseURL = 'http://localhost:3000'
