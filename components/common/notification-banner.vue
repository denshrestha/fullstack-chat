<template>
  <v-snackbar
    v-model="show"
    :color="color"
    transition="scale-transition"
    bottom
    right
    :timeout="4000"
    outlined
  >
    {{message}}
    <v-btn icon :color="color" @click="show = false">
      <v-icon>
        mdi-close
      </v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "notification-banner",
  data: () => ({
    message: '',
    color: '',
    show: ''
  }),
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'notifications/setNotification') {
        this.message = state.notifications.message
        this.color = state.notifications.color
        this.show = true
      }
    })
  }
}
</script>

<style scoped>

</style>
