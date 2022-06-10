<template>
  <div v-show="showAddTask">
    <AddTask @add-task="addTask"></AddTask>
  </div>

  <Tasks
    :tasks="tasks"
    @delete-task="deleteTask"
    @toggle-reminder="toggleReminder"
  ></Tasks>
</template>

<script>
import Tasks from "./../components/Tasks.vue";
import AddTask from "./../components/AddTask.vue";

export default {
  name: "Home",
  props: {
    showAddTask: Boolean
  },
  components: {
    Tasks,
    AddTask,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async toggleReminder(id) {
      const taskToToggle = await this.fetchTask(id);
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

      const res = await fetch(`api/Tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      });

      const data = await res.json();

      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      );
    },
    async fetchTasks() {
      const res = await fetch("api/Tasks");

      const data = await res.json();
      return data;
    },
    async fetchTask(id) {
      const res = await fetch(`api/Tasks/${id}`);

      const data = await res.json();
      return data;
    },
    async addTask(task) {
      console.log(task);
      const res = await fetch("api/Tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();
      this.tasks = [...this.tasks, data];
    },
    async deleteTask(id) {
      const res = await fetch(`api/Tasks/${id}`, {
        method: "DELETE",
      });

      res.status === 200
        ? (this.tasks = this.tasks.filter((task) => task.id !== id))
        : console.log("Error deleting task");
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>

<style>
</style>