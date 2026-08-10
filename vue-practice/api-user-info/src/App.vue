<script>
  import axios from "axios"
  export default {
    data() {
      return {
        userId: 1,
        userInfo: null,
        error: null,
        username: ''
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
        console.log(this.response[this.userId].name)
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
          <input v-model="this.userId" type="number">
        </label>
        <button @click="getUser" class="btn btn-success">Enter User ID</button>
      </div>

      <div class="section-inner search-user">
        <label>
          Search Username:
          <input type="text" v-model="this.username">
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
    </div>
  </section>
</template>

<style scoped>
.section-inner {
  padding: 60px 0;
}
</style>
