<template>
  <div class="container">
    <Header
      title="Task Tracker"
      @toggle-add-task="toggleAddTask"
      :showAddTask="showAddTask"
    ></Header>

    <div v-show="showAddTask">
      <AddTask @add-task="addTask"></AddTask>
    </div>

    <Tasks
      :tasks="tasks"
      @delete-task="deleteTask"
      @toggle-reminder="toggleReminder"
    ></Tasks>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Tasks from "./components/Tasks.vue";
import AddTask from "./components/AddTask.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Tasks,
    AddTask,
    Footer,
  },
  data() {
    return {
      tasks: [],
      showAddTask: false,
    };
  },
  methods: {
    async toggleReminder(id) {
      const taskToToggle = await this.fetchTask(id)
      const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

      const res = await fetch(`api/Tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
      })

      const data = await res.json();

      this.tasks = this.tasks.map((task) =>
        task.id === id 
        ? { ...task, reminder: data.reminder } 
        : task
      );
    },
    toggleAddTask() {
      this.showAddTask = !this.showAddTask;
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
        method: 'DELETE'
      });

      res.status === 200 
      ? (this.tasks = this.tasks.filter((task) => task.id !== id))
      : console.log('Error deleting task');
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
  background-image: url("./assets/lake.jpg");
  background-size: cover;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 2px solid rgba(70, 131, 180, 0.2);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 5px 10px 30px #1d1d1d;
  background-color: rgba(110, 166, 219, 0.4);
}
.btn {
  display: inline-block;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
