<template>
  <v-row class="fill-height">
    <v-col cols="12">
      <v-list>
        <v-subheader>Friends</v-subheader>
        <v-divider class="mb-4" />
        <v-list-item-group>
          <v-list-item
            v-for="friend in friends"
            :key="friend.id"
            class="d-block"
            @click="openChatPage(friend.id)"
          >
            <user-simple-block :user="friend"/>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: "chat",
  layout: 'default',
  components: {
    userSimpleBlock: () => import('@/components/user/user-simple-block'),
  },
  data: () => ({
    tab: null,
    friends: [],
  }),
  async created() {
    await this.$store.dispatch('user/fetchUser')
    .then(async (resp)=> {
      if(resp){
        const {id} = this.$store.getters['user/getUser']
        this.friends = await this.$store.dispatch('user/getFriendsDate', id)
        this.$socket.emit('user entered chat room', {id: this.chatId})
      }
    })
  },
  methods:{
    async openChatPage(friendId){
      const {id} = this.$store.getters['user/getUser']
      const chatID = await this.$store.dispatch('messages/getChatID', { userID: id, friendID: friendId })
      if(chatID){
        await this.$router.push(`/messages/${chatID}`)
      }
    }
  }
}
</script>

<style scoped>

</style>
