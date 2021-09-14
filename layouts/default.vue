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
      <v-container class="fill-height">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "default",
  data: () => ({
    interval: '',
    date: '',
    time: ''
  }),
  components: {
    sideBar: () => import('@/components/common/side-bar'),
    searchBar: () => import('@/components/common/search-bar'),
    notificationBar: () => import('@/components/common/notification-bar')
  },
  created(){
    this.interval = setInterval(()=>{
      this.date = new Date().toLocaleDateString()
      let dateNow = new Date()
      let hours = dateNow.getHours()
      let minutes = dateNow.getMinutes()
      let seconds = dateNow.getSeconds()
      this.time = `${hours < 10? '0'+hours : hours}.${minutes < 10 ? '0'+minutes : minutes}.${seconds < 10 ? '0'+ seconds : seconds}`
    }, 1000)
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
