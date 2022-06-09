<template>
    <header>
        <h1>
            {{title}}
        </h1>
        <Button 
        :text="showAddTask ? 'Close' : 'Add Task'" 
        :color="showAddTask ? 'red' : 'green'"
        @btn-click="$emit('toggle-add-task')"
        
        ></Button>
    </header>
</template>

<script>
import Button from './Button.vue'
import Button1 from './Button.vue'

export default {
    name: 'Header',
    props: {
        title: String,
        showAddTask: Boolean
    },
    components: {
    Button,
    Button1
}
}
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0px 0px 20px 0px;
    }
</style>