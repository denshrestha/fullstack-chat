<template>
  <v-responsive v-if="user">
    <v-row>
      <v-col cols="12" md="6">
       <user-info-card :user="user"/>
      </v-col>
      <v-col cols="12" md="6">
        <user-friends-card :id="user.id"/>
      </v-col>
    </v-row>
  </v-responsive>
</template>

<script>
export default {
  name: "Dashboard",
  layout: 'default',
  components: {
    userInfoCard: () => import('@/components/user/user-info-card'),
    userFriendsCard: () => import('@/components/user/user-friends-card')
  },
  data: () => ({
    user: ''
  }),
  sockets: {
    connect: function () {
      console.log('socket connected')
    }
  },
  async mounted() {
    const user = this.$store.getters['user/getUser']
    if(user) {
      this.user = user
    }
    const fetchedUser = await this.$store.dispatch('user/fetchUser')
    if(fetchedUser){
      this.user = this.$store.getters['user/getUser']
    } else {
      await this.$router.push('/auth')
    }
  },
  methods: {
    sendMessage(){
      this.$socket.emit('createMessage', {
        text: 'Hello From Client'
      })
    }
  }
}
</script>

<style scoped>

</style>
