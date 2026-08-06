<script>
import axios from "axios"

export default {
  data() {
    return {
      info: null,
      error: null,
      versionInfo: null,
      lastChecked: null
    }
  },
  methods: {
    checkApi() {
      axios.get('https://apit.web1.bookingonline.co.uk/api/imagemanager/info/version')
        .then((response) => {
          this.info = response.data
          this.versionInfo = response.data.Data
        })
        .catch((err) => {
          this.error = err.message
        });
      this.lastChecked = Date(Date.now())
    }
  },
  mounted() {
    this.checkApi()
    setInterval(() => {
      this.checkApi()
    }, 30000)
  }
}
</script>

<template>
  <header class="header">
    <div class="container">
      <h1>API Health Check</h1>
    </div>
  </header>
  <section class="body">
    <div class="container">
      <div class="body-inner">
        <h2 v-if="info">
          {{ versionInfo.appName }} is active:
          {{ info.Success }}
          <div class="indicator"
            :class="{
              online: info.Success === true,
              offline: info.Success === false
            }"
            >
          </div>
        </h2>
        <p v-if="info">{{ versionInfo.appName }} is on version {{ versionInfo.version }}</p>
        <p v-if="info">Last Checked At: {{ this.lastChecked }}</p>
        <p v-else-if="error">Request failed: {{ error }}</p>
        <div v-else>Loading...</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.header, section {
  padding: 30px 0;
}
.indicator {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: orange;
}
.online {
  background-color: green;
}
.offline {
  background-color: red;
}
</style>
