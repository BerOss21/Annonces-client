import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/js/dist/carousel";

import Echo from "laravel-echo"

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: "local",
  cluster: "mt1",
  forceTLS: false,
  wsHost: window.location.hostname,
  wsPort: 6001,
  wssHost: window.location.hostname,
  wssPort: 6001,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  auth: {
      headers: {
          Authorization: `Bearer ${store.getters.user.token}`,
          Accept: 'application/json',
          'X-CSRF-Token': "CSRF_TOKEN"
      },
  },
});





createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
