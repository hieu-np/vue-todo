<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Task</label>
      <input type="text" v-model="text" name="text" placeholder="Add Task" />
      <p v-if="errorTask" class="error-message">*Please add a task</p>
    </div>
    <div class="form-control">
      <label>Day & Time</label>
      <input
        type="text"
        v-model="day"
        name="day"
        placeholder="Add Day & Time"
      />
      <p v-if="errorDay" class="error-message">*Please add a day & time</p>
    </div>
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" v-model="reminder" name="reminder" />
    </div>

    <input type="submit" value="Save Task" class="btn btn-block primaryButton" />
  </form>
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      text: '',
      day: '',
      reminder: false,
      errorTask: false,
      errorDay: false
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if(!this.text || !this.day){
        if(!this.text){
          this.errorTask = true
        }else{
          this.errorTask = false
        }
        if(!this.day) {
          this.errorDay = true
        }else{
          this.errorDay = false
        }
        return
      }else{
        this.errorTask = false
        this.errorDay = false
      }

      const newTask = {
        text: this.text,
        day: this.day,
        reminder: this.reminder
      }

      this.$emit('add-task', newTask)

      this.text = ''
      this.day = ''
      this.reminder = false
    }
  }
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
  font-weight: bold;
}
.form-control input {
  width: 99%;
  height: 40px;
  margin-top: 5px;
  padding: 3px 7px;
  font-size: 17px;
  background-color: rgba(255, 255, 255, 0.404);
  border: 0px;
  border-radius: 10px;
  outline: none;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: center;

}
.form-control-check label {
  flex: 1;
  font-weight: bold;
  
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
.primaryButton {
  /* background-color: rgba(0, 128, 0, 0.5); */
  background-color: #0d6dfdad;
  width: 97%;
}
.error-message{
  color: red;
}
</style>