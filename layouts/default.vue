<template>
  <v-app dark>
    <v-app-bar app height="63" absolute>
      <v-app-bar-title>App</v-app-bar-title>
      <v-spacer></v-spacer>
      <search-bar />
      <v-spacer></v-spacer>
      <v-divider vertical class="mx-2"/>
      <div>
        <notification-bar />
        <v-btn
          icon
          color="grey"
          @click="logout"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <side-bar />
    <v-main app>
      <v-container class="fill-height" v-if="isDataFetched">
        <Nuxt />
      </v-container>
    </v-main>
    <notification-banner />
  </v-app>
</template>

<script>
export default {
  name: "default",
  middleware: ['isAuthenticated'],
  data: () => ({
    isDataFetched: false
  }),
  components: {
    sideBar: () => import('@/components/common/side-bar'),
    searchBar: () => import('@/components/common/search-bar'),
    notificationBar: () => import('@/components/common/notification-bar'),
    notificationBanner: () => import('@/components/common/notification-banner')
  },
  async created(){
    this.isDataFetched = !!await this.$store.dispatch('user/fetchUser')
    if(this.isDataFetched) {
      const {id} = this.$store.getters['user/getUser']
      this.$socket.emit('user entered App', id)
    }
  },
  mounted() {
    const token = localStorage.getItem('token') || ''
    if(token){
      this.$axios.setHeader('Authorization', `Bearer ${token}`)
    }
  },

  methods: {
    async logout(){
      const {id} = this.$store.getters['user/getUser']
      await this.$store.dispatch('auth/logOut', id)
      .then((resp)=>{
        if(resp){
          localStorage.clear()
          this.$router.push('/auth')
        }
      })
    }
  }
}
</script>
