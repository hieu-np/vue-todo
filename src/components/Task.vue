<template>
  <div 
  :class="[task.reminder ? 'reminder' : '', 'task']"
  @dblclick="$emit('toggle-reminder', task.id)"
  >
    <h3>
      {{ task.text }} 
      <i 
      class="fas fa-times"
      @click="$emit('delete-task', task.id)"
      ></i>
    </h3>
    <p>{{task.day}}</p>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: Object,
  },
  
};
</script>

<style scoped>
.fas {
  color: rgba(255, 0, 0, 0.6);
}
.task {
  background: rgb(255, 255, 255, 0.4);
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  border-left: 5px solid rgb(255, 255, 255);
}
.task.reminder {
  border-left: 5px solid green;
  background-color: rgba(102, 205, 171, 0.4);
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>