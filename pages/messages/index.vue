<template>
  <v-row class="fill-height">
    <v-col cols="12" md="4" lg="2">
      <v-list>
        <v-subheader>Friends</v-subheader>
        <v-list-item-group>
          <v-list-item
            v-for="friend in friends"
            :key="friend.id"
            class="d-block"
            @click="selectUser(friend)"
          >
            <user-simple-block :user="friend"/>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
    <v-col cols="12" md="8" lg="10">
      <v-card class="fill-height d-flex flex-column" :loading="isLoading">
        <template v-if="currentFriendInfo">
          <v-card-title class="d-block flex-grow-0 accent">
            <user-simple-block :user="currentFriendInfo"/>
          </v-card-title>
          <v-card-text class="flex-grow-1">
            <chat-box :friendAvatar="currentFriendInfo.avatar"/>
          </v-card-text>
          <v-card-actions class="flex-grow-0 accent">
            <v-text-field
              v-model="message"
              append-icon="mdi-send"
              hide-details
              outlined
              rounded
              @click:append="sendMessage(currentFriendInfo.id)"
              @keypress.enter="sendMessage(currentFriendInfo.id)"
            ></v-text-field>
          </v-card-actions>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "index",
  layout: 'default',
  components: {
    userSimpleBlock: () => import('@/components/user/user-simple-block'),
    chatBox: () => import('@/components/chat/chat-box')
  },
  data: () => ({
    tab: null,
    friends: [],
    isLoading: false,
    currentFriendInfo: {},
    message: '',
  }),
  async created() {
    this.isLoading = true
    await this.$store.dispatch('user/fetchUser')
    .then(async (resp)=> {
      if(resp){
        const {id} = this.$store.getters['user/getUser']
        this.friends = await this.$store.dispatch('user/getFriendsDate', id)
        this.currentFriendInfo = this.friends[0]
        await this.$store.dispatch('messages/getMessageHistory', this.friends[0].id)
        this.$socket.emit('userEnter', {id: this.chatId})
        this.isLoading = false
      }
    })
  },
  computed: {
    messages(){
      return this.$store.getters['messages/getMessageHistory'] || []
    },
    chatId(){
      return this.$store.getters['messages/getChatId'] || ''
    },
    peers(){
      return this.$store.getters['messages/getPeers'] || []
    }
  },
  methods: {
    async selectUser(user){
      this.currentFriendInfo = {...user}
      await this.$store.dispatch('messages/getMessageHistory', user.id)
    },
    sendMessage(id){
      if(this.message){
        this.isLoading = true
        this.$socket.emit('createMessage', {
          text: this.message,
          time: new Date().getTime(),
          from: this.$store.getters['user/getUser'].id,
          to: id,
          chatId: this.chatId
        })
        this.$nextTick(()=>{
          this.message = ''
          this.isLoading = false
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
