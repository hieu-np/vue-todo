<template>
  <button
    :class="[color === 'green' ? 'btn greenButton' : 'btn redButton']"
    @click="onClick()"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
  },
  methods: {
    onClick() {
      this.$emit('btn-click')
    },
  },
};
</script>

<style>
.greenButton {
  background-color: rgba(0, 200, 0, 0.5);
}
.redButton {
  background-color: rgba(200, 0, 0, 0.5);
}
</style>