<template>
  <v-badge
    color="primary"
    :content="notifications.length"
    :value="notifications.length"
    overlap
  >
    <v-menu bottom left>
      <template v-slot:activator="{on, attrs}">
        <v-icon
          v-on="on"
          v-bind="attrs"
          color="grey"
        >
          mdi-bell
        </v-icon>
      </template>
      <v-card>
        <v-list>
          <v-list-item v-for="notification in notifications" :key="notification.id">
            <v-list-item-avatar>
              <v-avatar>
                <v-img :src="`../${notification.avatar}`"></v-img>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="notification.fullName" />
              <v-list-item-subtitle>
                Wants to add you to friends
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon color="primary" @click="handleNotification(notification.id, 'accept')">
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn icon color="red" @click="handleNotification(notification.id, 'decline')">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-badge>
</template>

<script>
export default {
  name: "notification-bar",
  computed: {
    notifications(){
      if(this.$store.getters['user/getUserRequests'].length){
       return this.$store.getters['user/getUserRequests']
      }
      return []
    }
  },
  methods: {
    async handleNotification(notificationID, endPoint){
      const {id} = this.$store.getters['user/getUser']
      const result = await this.$store.dispatch(
        'user/handleRequest',
        {
          endpoint: endPoint,
          idData:{
            CurrentUserId: id,
            requestId: notificationID
          }
        })
      console.log('result', result)
      if(result) {
        this.$socket.emit('notify other user', result)
        await this.$store.dispatch('user/fetchUser')
        // this.$socket.emit
      }
    },
  }
}
</script>

<style scoped>

</style>
