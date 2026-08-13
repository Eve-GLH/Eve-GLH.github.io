<script>
  import axios from "axios"
  export default {
    data() {
      return {
        zipCode: '',
        zipInfo: null,
        error: '',
        state: '',
        timezone: '',
        apiKey: 'M7xll9Ox4xPYwHdLvi7dtutHkR0XpGPjyq4ylnls'
      }
    },
    methods: {
      getState() {
        axios.get(`https://api.api-ninjas.com/v1/zipcode?zip=${this.zipCode}`, {
          headers: {
            'X-Api-Key': 'M7xll9Ox4xPYwHdLvi7dtutHkR0XpGPjyq4ylnls'
          }
        })
        .then((response) => {
          console.log(response.data)
          this.zipInfo = response.data[0]
          this.state = response.data[0].state
          this.timezone = response.data[0].timezone
        })
        .catch((err) => {
          this.error = err.message
        })
      }
    }
  }
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-header">
        <h1>State Checker</h1>
      </div>
      <div class="section-body">
        <div class="form-section">
          <label>
            Enter Your Zip Code:
            <input type="text" v-model="this.zipCode">
          </label>
          <button type="button" class="btn btn-primary" @click="getState">Find State</button>
        </div>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="section-body">
        <div v-if="this.zipInfo" class="state-output">
          State: {{ state }}
        </div>
        <div v-if="this.zipInfo" class="timezone-output">
          Timezone: {{ timezone }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 30px 0;
}
.section-header {
  padding: 15px 0;
  text-align: center;
}
.section-body {
  padding: 15px 0;
}
.form-section {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
}
.form-section input {
  margin: 10px 0;
}
.form-section button {
  margin: 10px 0;
}
</style>