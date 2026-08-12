<script>
  import axios from "axios"
  export default {
    data() {
      return {
        username: '',
        password: '',
        accessToken: null,
        loginError: null,
        userInfo: null
      }
    },
    methods: {
      login() {
        axios.post('https://dummyjson.com/auth/login', {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          console.log(response.data)
          this.accessToken = response.data.accessToken
        })
        .catch((err) => {
          this.loginError = err.message
        })
      },
      getDetails() {
        axios.get('https://dummyjson.com/auth/me', {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        })
        .then((response) => {
          console.log(response.data)
          this.userInfo = response.data
        })
        .catch((err) => {
          this.loginError = err.message
        })
      }
    }
  }
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-inner">
        <h1>Authentication</h1>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="section-inner">
        <div class="logins-border">
          <label>
            Username:
            <input type="text" class="username" v-model="username">
          </label>
          <label>
            Password:
            <input type="password" class="password" v-model="password">
          </label>
          <button type="button" @click="login" class="btn btn-success">Login</button>
          <div class="alert alert-success" v-if="accessToken">
              <p>Login successful!</p>
          </div>
          <div class="alert alert-danger" v-if="loginError">
              <p>{{ loginError }}</p>
          </div>
          <button type="button" @click="getDetails" class="btn btn-info">Get My Details</button>
          <div v-if="userInfo" class="info-cont">
            Hi {{ username }}! Here is your data:
            {{ userInfo }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .section {
    padding: 30px 0;
  }
  h1 {
    text-align: center;
  }
  .logins-border {
    border: 1px solid #FFF;
    border-radius: 5px;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 30px auto;
    width: fit-content;
  }
  .logins-border input {
    margin: 10px 0;
  }
  .logins-border button {
    margin: 10px auto;
  }
</style>
