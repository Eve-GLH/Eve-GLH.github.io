<script>
import axios from "axios"

export default {
  data() {
    return {
      info: null,
      error: null,
      versionInfo: null
    }
  },
  mounted() {
    axios.get('https://apit.web1.bookingonline.co.uk/api/imagemanager/info/version')
    .then((response) => {
      console.log(response.data.Success)
      this.info = response.data
      this.versionInfo = response.data.Data
    })
    .catch((err) => {
      this.error = err.message
    })
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
        </h2>
        <p v-if="info">{{ versionInfo.appName }} is on version {{ versionInfo.version }}</p>
        <p v-else-if="error">Request failed: {{ error }}</p>
        <p v-else>Loading...</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.header, section {
  padding: 30px 0;
}
</style>
