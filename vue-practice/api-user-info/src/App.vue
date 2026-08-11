<script>
  import axios from "axios"
  export default {
    data() {
      return {
        userId: 1,
        userInfo: null,
        error: null,
        username: '',
        noUsername: 'Please enter your username'
      }
    },
    methods: {
      getUser() {
        axios.get(`https://jsonplaceholder.typicode.com/users/${this.userId}`)
        .then((response) => {
          this.userInfo = response.data
        })
        .catch((err) => {
          this.error = err.message
        });
      },

      searchUsername() {
        axios.get('https://jsonplaceholder.typicode.com/users', {
          params: {
            username: this.username
          }
        })
        .then((response) => {
          if (response.data.length > 0) {
            console.log(response.data[0].id)
            this.userId = response.data[0].id
            this.userInfo = response.data[0]
            this.noUsername = ''
          } else {
            console.log('No user found by that username')
            this.noUsername = 'No User Found'
            this.userInfo = null
          }
        })
        .catch((err) => {
          this.error = err.message
        })
      }
    },
    mounted() {
    }
  }
</script>

<template>
  <section>
    <div class="container">
      <div class="user-change section-inner">
        <label>
          User ID:
          <input v-model="userId" type="number">
        </label>
        <button @click="getUser" class="btn btn-success">Enter User ID</button>
      </div>

      <div class="section-inner search-user">
        <label>
          Search Username:
          <input type="text" v-model="username">
        </label>
        <button @click="searchUsername" class="btn btn-primary">Search Username</button>
      </div>

      <div v-if="userInfo" class="section-inner">
        <div class="user-name">
          Name: 
          {{ userInfo.name }}
        </div>
        <div class="user-email">
          Email:
          {{ userInfo.email }}
        </div>
      </div>
      
      <div class="no-user" v-if="noUsername">
        {{ this.noUsername }}
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-inner {
  padding: 60px 0;
}
</style>
