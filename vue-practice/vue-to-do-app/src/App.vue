<script setup>
import { ref, computed } from 'vue'
const title = ref('To Do List')
const editing = ref(false)
const items = ref([
    {id: 1, label: "go to the shop", done: false, priority: "low"},
    {id: 2, label: "do the laundry", done: false, priority: "medium"},
    {id: 3, label: "do the dishes", done: false, priority: "high"}
])
const reversedItems = computed(()=>{
  return [...items.value].reverse()
})
const newItem = ref("")
const newItemPriority = ref("low")
const newItemDone = ref(false)
const saveItem = ()=>{
  items.value.push({
    id: items.value.length + 1,
    label: newItem.value,
    priority: newItemPriority.value
    })
  newItem.value = ""
  newItemPriority.value = "low"
}
const doEdit= (e)=> {
  editing.value = e
  newItem.value = ""
  newItemPriority.value = "low"
}
const toggleDone = (item) => {
  item.done = !item.done
}
</script>
<template>
  <header class="header">
    <h1>{{ title.toLocaleUpperCase() }}</h1>
    <button v-if="editing" class="btn" @click="doEdit(false)">
      Cancel
    </button>
    <button v-else class="btn btn-primary" @click="doEdit(true)">
      Add Item
    </button>
  </header>
  <form
    class="add-item-form"
    v-if="editing"
    @submit.prevent="saveItem"
  >
    <div class="container">
      <input v-model.trim="newItem" type="text" placeholder="Add an item">
      <br />
      <br />
      Priority:
      <select v-model="newItemPriority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label>
        <input type="checkbox" v-model="newItemDone">
        Done?
      </label>
      
      <button :disabled="newItem.length < 3" class="btn btn-primary">
        Save Item
      </button>
    </div>
  </form>

  <div class="output-section">
    <div class="container">
      <ul>
        <li
        v-for="(item, index) in reversedItems"
        @click="toggleDone(item)"
        :key="item.id"
        class="list-item"
        :class="{
          strikeout: item.done,
          priorityH: item.priority === 'high',
          priorityM: item.priority === 'medium'
        }"
        >
          {{ item.label }}
        </li>
      </ul>
      <p v-if="!items.length">
        Nothing to see here...
      </p>
    </div>
  </div>
    
</template>

<style scoped>
  .header {
    text-align: center;
    padding: 30px 0;
  }
  .strikeout {
    text-decoration: line-through;
  }
  .priorityM {
    color: orange;
  }
  .priorityH {
    color: red;
  }
</style>