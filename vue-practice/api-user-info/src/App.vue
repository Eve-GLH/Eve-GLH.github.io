<script>
  import axios from "axios"
  export default {
    data() {
      return {
        userId: 1,
        userInfo: null,
        error: null,
        username: '',
        noUsername: 'Please enter your username',
        newUserName: '',
        newUserEmail: '',
        createdUser: null,
        updatedEmail: '',
        deletedMessage: ''
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
      },
      createUser() {
        axios.post('https://jsonplaceholder.typicode.com/users', {
          name: this.newUserName,
          email: this.newUserEmail
        })
        .then((response) => {
          console.log(response.data)
          this.createdUser = response.data
        })
        .catch((err) => {
          this.error = err.message
        })
      },
      updateEmail() {
        axios.patch(`https://jsonplaceholder.typicode.com/users/${this.userId}`, {
          email: this.updatedEmail
        })
        .then((response) => {
          console.log(response.data.email)
          this.userInfo = response.data
        })
        .catch((err) => {
          this.error = err.message
        })
      },
      deleteUser() {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${this.userId}`)
        .then((response) => {
          this.userInfo = response.data
          if (this.userInfo) {
            this.deletedMessage = `User no longer found`
            console.log(this.deletedMessage)
          } else {
            this.deletedMessage = `Deletion not successful. User ${this.username} still exists`
          }
          console.log(userInfo)
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
      <div class="layout-helper">
        <h1>GET Requests</h1>
        <div class="user-change section-inner">
          <h2>Finding users by their ID</h2>
          <label>
            User ID:
            <input v-model="userId" type="number">
          </label>
          <button @click="getUser" class="btn btn-success">Enter User ID</button>
        </div>
        <div class="section-inner search-user">
          <h2>Finding users by their username</h2>
          <label>
            Search Username:
            <input type="text" v-model="username">
          </label>
          <button @click="searchUsername" class="btn btn-primary">Search Username</button>
        </div>
        <div class="user-section">
          <div v-if="userInfo" class="section-inner">
            <h3>User Info Display</h3>
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
      </div>
    </div>
  </section>
  <hr>
  <section>
    <div class="container">
      <div class="layout-helper">
        <h1>POST Requests</h1>
        <div class="section-inner">
          <h2>Adding a new user</h2>
          <div class="form-section">
            <label>
              Name:
              <input type="text" v-model="newUserName">
            </label>
            <label>
              Email:
              <input type="text" v-model="newUserEmail">
            </label>
            <button @click="createUser" class="btn btn-success">Add User</button>
          </div>
        </div>
        <div class="section-inner">
          <div v-if="createdUser" class="created-user-section">
            <div class="created-name">
              Name: 
              {{ createdUser.name }}
            </div>
            <div class="created-email">
              Email: 
              {{ createdUser.email }}
            </div>
            <div class="created-id">
              User ID: 
              {{ createdUser.id }}
            </div>
          </div>
        </div>
        <div class="section-inner">
          <label>
            Update Email:
            <input type="text" v-model="updatedEmail">
          </label>
          <button @click="updateEmail" class="btn btn-info">Update Email</button>
          <div v-if="userInfo" class="updated-email-section">
            Email address for {{ userInfo.name }} has been updated to {{ userInfo.email }}
          </div>
        </div>
        <div class="section-inner">
          Delete User:
          <button @click="deleteUser" class="btn btn-danger">Delete User</button>
          <div class="user-delete-section">
            <div class="deleted-message">
              {{ deletedMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
h1 {
  text-align: center;
  width: 100%;
  margin: 60px 0 0;
}
.section-inner {
  padding: 60px 0;
}
.layout-helper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items:last baseline;
  justify-content: space-evenly;
}
.user-section {
  width: 100%;
  text-align: center;
}
.form-section {
  display: flex;
  flex-direction: column;
}
.form-section input {
  margin: 10px 0;
}
.user-delete-section {
  display: flex;
  flex-direction: column;
}
</style>
