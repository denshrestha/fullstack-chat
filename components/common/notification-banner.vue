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
    this.$store.subscribe(async (mutation, state) => {
      if (mutation.type === 'notifications/setNotification') {
        this.message = state.notifications.message
        this.color = state.notifications.color
        this.show = true
      }
      if (mutation.type === 'notifications/SOCKET_newFriendNotification') {
        this.message = state.notifications.message
        this.color = state.notifications.color
        this.show = true
        await this.$store.dispatch('user/fetchUser')
      }
      if (mutation.type === 'notifications/SOCKET_friendshipRequestAccepted') {
        this.message = 'User accepted your request!'
        this.color = 'success'
        this.show = true
        await this.$store.dispatch('user/fetchUser')
      }
    })
  }
}
</script>

<style scoped>

</style>
