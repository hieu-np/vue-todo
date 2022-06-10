<template>
  <footer>
    <p>
      Copyright &copy; 2021
    </p>
    <router-link 
    v-show="homePage" 
    class="link-black" 
    to="/about">About</router-link>
    <router-link 
    v-show="!homePage" 
    class="link-black" 
    to="/">Home Page</router-link>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    homePage() {
      if (this.$route.path === "/about") {
        return false;
      } else {
        return true;
      }
    },
  },
}
</script>

<style scoped>
  .link-black{
    color: #ff6652;
    text-decoration: none
  }
  footer{
    margin-top: 30px;
    text-align: center;
  }
</style>