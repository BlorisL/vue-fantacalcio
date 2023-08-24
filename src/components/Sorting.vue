<script setup>
import { ref } from 'vue'

const props = defineProps({
  value: {
    type: [Boolean, null],
    default: false
  }
})

let sort = ref(props.value), classes = ref([]);
toggleSort();

function toggleSort() {
  switch(sort.value) {
    case true: 
      sort.value = false; 
      classes.value = ['fa-solid', 'fa-sort-down'];
      break;
    case false: 
      sort.value = null; 
      classes.value = ['fa-solid', 'fa-sort'];
      break;
    case null: 
      sort.value = true; 
      classes.value = ['fa-solid', 'fa-sort-up'];
      break;
  }
}

</script>

<template>
  <i :class="classes" style="cursor: pointer;" @click="toggleSort()"></i>
</template>

<style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css');
</style>
