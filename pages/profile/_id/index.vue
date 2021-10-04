<template>
  <v-responsive v-if="userInfoToDisplay">
    <v-row>
      <v-col cols="12" md="6">
       <user-info-card :user="userInfoToDisplay"/>
      </v-col>
      <v-col cols="12" md="6">
        <user-friends-card :id="userInfoToDisplay.id"/>
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
    userInfoToDisplay: ''
  }),
  sockets: {
    connect: function () {
      console.log('socket connected')
    }
  },
  async created() {
    const user = await this.$store.getters['user/getUser']
    if(user.id === this.$route.params.id) {
      this.userInfoToDisplay = {...user}
      return
    }
    this.userInfoToDisplay = await this.$store.dispatch(
      'user/openUserProfile',
      this.$route.params.id
    )
  },
}
</script>

<style scoped>

</style>
